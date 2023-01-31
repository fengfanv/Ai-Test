# 感知机
# 感知机是一种算法。感知机接收多个输入信号，输出一个信号。感知机是神经网络（深度学习）的起源算法。因此学习感知机的构造有助于更好的理解神经网络和深度学习算法。

# W权重：
# 1、感知机的多个输入信号都有各自固有的权重，这些权重发挥着控制各个信号的重要性的作用。也就是说，权重越大，对应该权重的信号的重要性就越高。
# 2、权重相当于电流里所说的电阻。电阻是决定电流流动难度的参数，电阻越低，通过的电流就越大。而感知机的权重则是值越大，通过的信号就越大。不管是电阻还是权重，在控制信号流动难度（或者流动容易度）这一点上的作用都是一样的。

# θ阈值（或 b偏置）：
# 1、输入信号被送往神经元时，会被分别乘以固定的权重（w1x1、w2x2）。神经元会计算传送过来的信号的总和，只有当这个总和超过了某个界限值时，才会输出1。这也称为“神经元被激活”。这里将这个界限值称为阈值。以阈值为界，一旦输入超过阈值，就切换输出
# 2、阈值（或偏置）是调整神经元被激活容易程度的参数（感知机结果输出1时，就是被激活）




# and（与门）
# w1*x1 + w2*x2 > theta
print(1*1+1*1>1) # 1  1  true
print(1*0+1*1>1) # 0  1  false
print(1*1+1*0>1) # 1  0  false
print(1*0+1*0>1) # 0  0  false

print('-----------------------')
# not and（与非门）
# w1*x1 + w2*x2 > theta
print(-1*1+-1*1>-2) # 1  1  false
print(-1*0+-1*1>-2) # 0  1  true
print(-1*1+-1*0>-2) # 1  0  true
print(-1*0+-1*0>-2) # 0  0  true

print('-----------------------')
# or（或门）
# w1*x1 + w2*x2 > theta
print(1*1+1*1>0) # 1  1  true
print(1*0+1*1>0) # 0  1  true
print(1*1+1*0>0) # 1  0  true
print(1*0+1*0>0) # 0  0  false

print('-----------------------')

import numpy as np

def AND(x1,x2):
    x = np.array([x1,x2]) #输入值
    w = np.array([1,1])   #权重
    b = -1                #阈值，这里为啥和上面那个and的阈值不一样，这里文章说是为了以后，详细看文章
    tmp = np.sum(w*x) + b
    if tmp > 0:
        #为啥要大于0输出1，不是应该大于b时输出1吗，答：看书
        return 1
    else:
        return 0

print(AND(1,1))
print(AND(0,1))
print(AND(1,0))
print(AND(0,0))

print('-----------------------')

def NOT_AND(x1,x2):
    x = np.array([x1,x2]) #输入值
    w = np.array([-1,-1]) #权重
    b = 2                 #阈值
    tmp = np.sum(w*x) + b
    if tmp > 0:
        return 1
    else:
        return 0

print(NOT_AND(1,1))
print(NOT_AND(0,1))
print(NOT_AND(1,0))
print(NOT_AND(0,0))

print('-----------------------')

def OR(x1,x2):
    x = np.array([x1,x2]) #输入值
    w = np.array([1,1])   #权重
    b = 0                 #阈值
    tmp = np.sum(w*x) + b
    if tmp > 0:
        return 1
    else:
        return 0

print(OR(1,1))
print(OR(0,1))
print(OR(1,0))
print(OR(0,0))

print('-----------------------')

# exclusive or（异或，1和0输出1、0和0输出0、1和1输出0）
def XOR(x1,x2):
    s1 = NOT_AND(x1,x2)
    s2 = OR(x1,x2)
    y = AND(s1,s2)
    return y

print(XOR(1,1))
print(XOR(0,1))
print(XOR(1,0))
print(XOR(0,0))

 










