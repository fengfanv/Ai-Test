# 激活函数
# 上一章。感知机里 当(w1*x1+w2*x2+b)>0时，输出1。当(w1*x1+w2*x2+b)<=0时，输出0。
# 把上面的算式和判断拆成两部分 算式(w1*x1+w2*x2+b) 和 判断(算式结果>0 输出1、算式结果<=0 输出0)，
# 然后引入一个新的函数“h”，将 判断(算式结果>0 输出1、算式结果<=0 输出0) 这个功能放到函数h里。
# 然后当 算式结果大于0时，h就输出1，这时候h有一个新的名字，叫“激活函数”
# 这里函数h，会将 算式的运算结果 转换为输出信号
# 激活函数的作用在于决定如何来激活输入信号的加权总和(输入信号就是x1,x2 | w1*x1+w2*x2+b的结果 叫 加权总和)(加权总和 全称 计算加权输入信号和偏置的总和)
# 感知机 与神经网络 的主要区别，就是，激活函数用的不同
def h(a):
    if a>0:
        return 1
    else:
        return 0
# and(与门) x1=1，x2=1。w1=1，w2=1。b=-1
result = 1*1+1*1+(-1)
print(result)#1
print(h(result))#1





# 阶跃函数（下面这个方法不支持numpy数组）
# 阶跃函数特点：以阈值为界，一旦输入超过阈值，就切换输出。比如上面那个(w1*x1+w2*x2+b)大于0时就输出1，小于等于0时就输出0
def step_function_0(x):
    if x>0:
        return 1
    else:
        return 0

import numpy as np

# 阶跃函数（下面这个方法，支持numpy数组）
def step_function(x):
    y = x>0
    return y.astype(np.int)

#解析上面这个支持numpy数组的方法
'''
x=np.array([-1.0,1.0,2.0])
print(x) #[-1.  1.  2.]
y=x>0
print(y) #[False  True  True] 解析numpy数组进行不等号运算后，数组的各个元素都会进行不等号运算，然后生成一个布尔类型的新numpy数组
y=y.astype(np.int32) #将numpy数组的每个布尔元素，转换成数值类型
print(y) #[0 1 1]
print(np.array([1.0,False])) #[1. 0.]
'''

#用图表示阶跃函数
import matplotlib.pylab as plt
'''
x=np.arange(-5.0,5.0,0.1) #生成一个numpy数组，已0.1为单位，从-5.0开始，到5.0结束。
print(x) #[-5.0,-4.9,-4.8.....4.9]
y=step_function(x)
plt.plot(x,y)#将x，y数据传给plt.plot方法，绘制图形
plt.ylim(-0.1,1.1)#指定y轴的范围
plt.show()
'''


# sigmoid函数（这方法支持numpy数组）
# 特点：输出随着输入发生连续性的变化
def sigmoid(x):
    return 1/(1+np.exp(-x))
'''
x=np.array([-1.0,1.0,2.0])
print(sigmoid(x))#[0.26894142 0.73105858 0.88079708]
'''

#用图表示sigmoid函数
'''
x=np.arange(-5.0,5.0,0.1)
print(x)
y=sigmoid(x)
plt.plot(x,y)
plt.ylim(-0.1,1.1)
plt.show()
'''

# 阶跃函数 和 sigmoid区别1：sigmoid函数的输出是一条平滑的曲线，输出随着输入发生连续性的变化。而阶跃函数以阈值为界，输出发生急剧性的变化。sigmoid函数的平滑性对神经网络的学习具有重要意义。
# 区别2：阶跃函数只能返回0或1，sigmoid函数可以返回0.731 ...、0.880 ...等实数
# 相似处：它们的输出具有相似的形状。两者的结构均是“输入小时，输出接近0（为0）；随着输入增大，输出向1靠近（变成1）”

#ReLU函数（这个方法已经支持numpy数组）
# 特点：ReLU函数在输入大于0时，直接输出该值；在输入小于等于0时，输出0
def relu(x):
    return np.maximum(0,x)

#用图表示ReLU函数
'''
x=np.arange(-5.0,5.0,0.1)
print(x)
y=relu(x)
plt.plot(x,y)
plt.show()
'''




