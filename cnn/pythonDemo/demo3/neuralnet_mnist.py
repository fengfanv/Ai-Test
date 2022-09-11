#以下代码除了sigmoid函数和softmax函数是我写的，其它都不是我写的
# coding: utf-8
import sys, os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定
import numpy as np
import pickle
from dataset.mnist import load_mnist
# from common.functions import sigmoid, softmax #kang注释的

def sigmoid(x):
    return 1/(1+np.exp(-x))

def softmax(a):
    c = np.max(a)
    exp_a = np.exp(a - c) #解决溢出问题
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y

def get_data():
    (x_train, t_train), (x_test, t_test) = load_mnist(normalize=True, flatten=True, one_hot_label=False)
    return x_test, t_test


def init_network():
    with open("sample_weight.pkl", 'rb') as f:
        network = pickle.load(f)
    return network


def predict(network, x):
    W1, W2, W3 = network['W1'], network['W2'], network['W3']
    b1, b2, b3 = network['b1'], network['b2'], network['b3']

    a1 = np.dot(x, W1) + b1
    z1 = sigmoid(a1)
    a2 = np.dot(z1, W2) + b2
    z2 = sigmoid(a2)
    a3 = np.dot(z2, W3) + b3
    y = softmax(a3)

    return y


x, t = get_data()
print(x.shape)#(10000, 784)  有一万个图像，每个图像由784个值组成
print(x[0].shape)#(784,)
network = init_network()
W1,W2,W3 = network['W1'],network['W2'],network['W3']
print(W1.shape)#(784, 50) 784行50列，行乘列，会产生50个神经元（或神经元的值），然后每一个神经元都会接收784个参数，各个神经元所接收的参数，在和神经元权重进行计算。这里已经思考清楚了，如果以后不懂，重读，别就读一块，整章整章的重读，那样效果更好
print(W2.shape)#(50, 100)
print(W3.shape)#(100, 10)

accuracy_cnt = 0
for i in range(len(x)):
    y = predict(network, x[i])
    p= np.argmax(y) # 获取概率最高的元素的索引
    if p == t[i]:
        accuracy_cnt += 1

print("Accuracy（精确度）:" + str(float(accuracy_cnt) / len(x)))

#运行 python neuralnet_mnist.py


#使用批处理进行优化
batch_size = 100 #批处理数量
accuracy_cnt_2 = 0
for i in range(0,len(x),batch_size):
    #range函数，普通使用方法range(start,end)会生成一个start到end-1之间构成的整数数组
    #range函数，高级用法range(start,end,step)，会生成一个start到end-1之间构成的整数数组，但每个数据项之间间隔step
    #如 print(list(range(0,10,3)))#[0, 3, 6, 9]
    x_batch = x[i:i+batch_size]#取i到i+batch_size之间的数据
    y_batch = predict(network,x_batch)
    p = np.argmax(y_batch,axis=1)#获取数据最大索引值，为什么axis=1，还是看书吧，看书就会明白
    accuracy_cnt_2 += np.sum(p == t[i:i+batch_size])

print("精度：",float(accuracy_cnt_2)/len(x))

#0维是列方向，1维是行方向

