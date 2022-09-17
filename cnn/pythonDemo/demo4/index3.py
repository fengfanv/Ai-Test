#梯度，导数

#梯度，导数，在神经网络的学习中的作用？
#在神经网络的学习中，寻找最优参数（权重和偏置）时，要寻找使损失函数的值尽可能小的参数。为了找到使损失函数的值尽可能小的地方，需要计算参数的导数，然后已这个导数为指引，逐步更新参数的值
#2022年9月17日20:00:41现在虽然知道导数是啥了，但是看书后，还是不太明白，导数在神经网络中的作用，算了，在多看几遍把

def numerical_diff_1(f,x):
    h=10e-50
    return (f(x+h)-f(x))/h

def numerical_diff(f,x):
    h=1e-4 #0.0001
    return (f(x+h)-f(x-h))/(2*h)

def function_1(x):
    return 0.01*x**2+0.1*x

#下面绘制2次函数function_1的函数图像
from tkinter import Y
import numpy as np
import matplotlib.pylab as plt

# x = np.arange(0.0,20.0,0.1) #已0.1为单位，从0到20的数组x
# y = function_1(x)
# plt.xlabel("x")
# plt.ylabel("f(x)")
# plt.plot(x,y)
# plt.show()

#求2次函数function_1在x=5、x=10时的导数
x_5 = numerical_diff(function_1,5)
print(x_5)#0.1999999999990898
x_10 = numerical_diff(function_1,10)
print(x_10)#0.2999999999986347

#画 2次函数function_1在x=5、x=10时的导数（斜率"切线"）图像

#绘制（斜率"切线"）
def tangent_line(f, x):
    d = numerical_diff(f, x)
    # print(d)
    y = f(x) - d*x
    return lambda t: d*t + y

x = np.arange(0.0, 20.0, 0.1)
y = function_1(x)
plt.xlabel("x")
plt.ylabel("f(x)")

tf_5 = tangent_line(function_1, 5)
y_5 = tf_5(x)
tf_10 = tangent_line(function_1, 10)
y_10 = tf_10(x)

plt.plot(x, y)
plt.plot(x, y_5)#x=5时的，斜率
plt.plot(x, y_10)#x=10时的，斜率
plt.show()