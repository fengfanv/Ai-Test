# 阶跃函数（下面这个方法不支持numpy数组）
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



#ReLU函数（这个方法已经支持numpy数组）
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




