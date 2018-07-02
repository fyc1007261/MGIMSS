import tensorflow as tf
import numpy as np
from sklearn.preprocessing import *


train_inputs = "input.csv"
train_outputs = "output.csv"
features = 5


def add_hidden_layer(input_size, input_data, output_size, activate_func=None):
    weights = tf.Variable(tf.random_normal([input_size, output_size]), dtype=tf.float32)
    bias = tf.Variable(tf.zeros([1, output_size])-0)
    result = tf.matmul(tf.cast(input_data, tf.float32), tf.cast(weights, tf.float32)) + bias
    if not activate_func:
        return result
    else:
        return activate_func(result)


def read_data(file_x, file_y=None):
    print("Loading data...")
    x = np.loadtxt(file_x)
    y = np.loadtxt(file_y)
    print("Success")
    return x, y


def main():
    isTrain = int(input("Load/Train new/Load then train?[0/1/2] "))
    # Set x into range [-1,1]
    min_max_scaler = MinMaxScaler()
    x, y = read_data(train_inputs, train_outputs)
    x = min_max_scaler.fit_transform(x)
    x = 2 * x - 1

    y = y[:, np.newaxis]
    # v_x represents the vector of x to be fed.
    v_x = tf.placeholder(tf.float32, [None, 4])
    v_y = tf.placeholder(tf.float32, [None, 1])

    # add layers to the graph
    layer1 = add_hidden_layer(features, v_x, 10, activate_func=tf.nn.relu)
    layer1_1 = add_hidden_layer(10, layer1, 10, activate_func=tf.nn.relu)
    layer2 = add_hidden_layer(10, layer1_1, 1)
    loss = tf.reduce_sum(tf.abs(tf.subtract(layer2, v_y)))
    train = tf.train.AdamOptimizer(0.01).minimize(loss)
    init = tf.global_variables_initializer()
    saver = tf.train.Saver()
    with tf.Session(config=tf.ConfigProto(log_device_placement=True)) as sess:
        with tf.device("/gpu:1"):
            if isTrain == 0 or isTrain == 2:
                # Load
                ckpt = tf.train.get_checkpoint_state('Trained_networks/')
                saver.restore(sess, ckpt.model_checkpoint_path)
            if isTrain == 1 or isTrain == 2:
                # Train
                if isTrain == 1:
                    sess.run(init)
                iters = int(input("Number of iterations? "))
                for i in range(iters):
                    for j in range(14):
                        # Use 70% to be the training setx
                        xx = x[50000*j:50000*(j+1)]
                        yy = y[50000*j:50000*(j+1)]
                        sess.run(train, feed_dict={v_x: xx, v_y: yy})
                        if j == 0:
                            print(i, sess.run(loss, feed_dict={v_x: xx, v_y: yy}))
                            # Save the network
                saver.save(sess, 'Trained_networks/network.ckpt')

            # Test
            test_x = np.array(x)[700000:]
            test_y = np.array(y)[700000:]
            y_out = sess.run(layer2, feed_dict={v_x: test_x})
            print("Loss of training set: ", sess.run(loss, feed_dict={v_x: x[:700000], v_y: y[:700000]})/700000)
            print("Loss of test set: ", sess.run(loss, feed_dict={v_x: x[700000:], v_y: y[700000:]})/300000)

            # Save predictions
            f=open("out.txt",'w')
            print("Saving predictions...")
            length = len(y_out)
            for i in range(length):
                f.write(str(y_out[i])+str(test_y[i])+'\n')
            f.close()

main()
