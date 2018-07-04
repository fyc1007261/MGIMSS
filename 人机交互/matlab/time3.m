function [] = time3()
%TIME3 此处显示有关此函数的摘要
%   此处显示详细说明
%%
clc,clear,close all
t = -5:.01:5;
%pressure = sin(10*t)';
load water.txt; %把原始数据按照表中的格式存放在纯文本文件 water.txt
water=water';pressure=water(:);

figure
plot( pressure )
%% 训练集与测试集的个数
num_all_data = length( pressure );
% 前75%的数据作为训练数据
num_train = floor( num_all_data * 0.7 );
% 后25%的数据作为测试数据
num_test = num_all_data - num_train;
% 转化为narnet需要的序列数据
y_train_nn = num2cell( pressure(1:num_train) )';
y_test_nn = num2cell( pressure(1+num_train:end))';
%% 延迟，即当前值依赖于过去的多少个值
feedback_delays = 1:2;
% 隐含层节点的个数
num_hd_neuron = 2;
% narnet构建
net = narnet(feedback_delays, num_hd_neuron);
[Xs,Xi,Ai,Ts] = preparets(net,{},{}, y_train_nn);
net = train(net,Xs,Ts,Xi,Ai);
view(net)
Y = net(Xs,Xi);
perf = perform(net,Ts,Y);
fprintf( 'neural network: mse on training set : %.6f\n', perf );
%% 神经网络进行进行预测
yini = y_train_nn(end-max(feedback_delays)+1:end);
[Xs,Xi,Ai] = preparets(net,{},{},[yini y_test_nn]);
y_pred_nn = net(Xs,Xi,Ai)';
y_pred_nn = cell2mat( y_pred_nn );
y_test_nn = cell2mat( y_test_nn )';

%% 画图，计算mse
figure
title('NARNET预测')
hold on
plot( y_test_nn, 'r', 'linewidth', 2 );
plot( y_pred_nn, 'b--', 'linewidth', 2 );
legend({ '真实值', '神经网络预测值'})
nn_per_error = mean(abs(y_pred_nn-y_test_nn) ./ y_test_nn);
nn_mse_error = mean( (y_pred_nn - y_test_nn).^2 );
fprintf('nn model: relative error on test set: %.6f\n', nn_per_error);
fprintf('nn model: mse on test set: %.6f\n', nn_mse_error);
end

