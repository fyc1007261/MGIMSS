import tensorflow as tf
import numpy as np
from sklearn.preprocessing import *


train_inputs = "input.csv"
train_outputs = "output.csv"
test_inputs = "test.csv"

features = 5
num_batch = 1
batch_size = 40000
learning_rate = 0.05

def add_hidden_layer(input_size, input_data, output_size, activate_func=None):
    weights = tf.Variable(tf.random_normal([input_size, output_size]), dtype=tf.float32)
    bias = tf.Variable(tf.zeros([1, output_size])-1)
    result = tf.matmul(tf.cast(input_data, tf.float32), tf.cast(weights, tf.float32)) + bias
    if not activate_func:
        return result
    else:
        return activate_func(result)


def read_data(file_x, file_y=None):
    print("Loading data...")
    tmp = np.loadtxt(train_inputs, dtype=np.str, delimiter=",")
    x = tmp[1:, :].astype(np.float)
    tmp = np.loadtxt(test_inputs, dtype=np.str, delimiter=",")
    test_x = tmp[1:, :].astype(np.float)
    tmp = np.loadtxt(train_outputs, dtype=np.str, delimiter=",")
    y = tmp[1:].astype(np.float)
    print("Success")
    return x, y, test_x


def main():
    isTrain = int(input("Load/Train new/Load then train?[0/1/2] "))
    # Set x into range [-1,1]
    min_max_scaler = MinMaxScaler()
    x, y, test_x = read_data(train_inputs, train_outputs)
    x = min_max_scaler.fit_transform(x)
    test_x = min_max_scaler.fit_transform(test_x)
    # x = 2 * x - 1
    # print(x)

    y = y[:, np.newaxis]
    # v_x represents the vector of x to be fed.
    v_x = tf.placeholder(tf.float32, [None, features])
    v_y = tf.placeholder(tf.float32, [None, 1])

    # add layers to the graph
    layer1 = add_hidden_layer(features, v_x, 100, activate_func=tf.sigmoid)
    layer1_1 = add_hidden_layer(100, layer1, 100, activate_func=tf.sigmoid)
    layer1_2 = add_hidden_layer(100, layer1_1, 100, activate_func=None)
    layer2 = add_hidden_layer(100, layer1_2, 1)
    # loss = tf.reduce_sum(tf.abs(tf.subtract(layer2, v_y)))
    loss = tf.reduce_sum(tf.square(layer2 - v_y))
    train = tf.train.AdamOptimizer(learning_rate=learning_rate).minimize(loss)
    init = tf.global_variables_initializer()
    saver = tf.train.Saver()
    with tf.Session(config=tf.ConfigProto(log_device_placement=False)) as sess:
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
                for j in range(num_batch):
                    xx = x[batch_size * j: batch_size * (j + 1)]
                    yy = y[batch_size * j: batch_size * (j + 1)]
                    sess.run(train, feed_dict={v_x: xx, v_y: yy})
                    if j == 0:
                        print(i, sess.run(loss/batch_size, feed_dict={v_x: xx, v_y: yy}))
                        # Save the network
            saver.save(sess, 'Trained_networks/network.ckpt')

        # Test
        test_y = sess.run(layer2, feed_dict={v_x: test_x})
        print(test_y)
        # Test
        # test_x = np.array(x)[700000:]
        # test_y = np.array(y)[700000:]
        # y_out = sess.run(layer2, feed_dict={v_x: test_x})
        # print("Loss of training set: ", sess.run(loss, feed_dict={v_x: x[:700000], v_y: y[:700000]})/700000)
        # print("Loss of test set: ", sess.run(loss, feed_dict={v_x: x[700000:], v_y: y[700000:]})/300000)

        # Save predictions
        # f = open("out.txt",'w')
        # print("Saving predictions...")
        # length = len(y_out)
        # for i in range(length):
        #     f.write(str(y_out[i])+str(test_y[i])+'\n')
        # f.close()


main()
