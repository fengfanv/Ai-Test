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

#画 2次函数function_1在x=5、x=10时的导数的切线图像
#1、导数===斜率。2、切线用来在图上表示斜率（或导数）

#绘制切线
def tangent_line(f, x0):
    #求函数f，在点x0处的斜率
    k = numerical_diff(f, x0)
    print('斜率：',k)

    #切线方程
    def tangent_equation(x):
        #根据 传入的x轴的坐标 和 斜率 ，求与 传入的x轴坐标 和 斜率 ，所对应的y轴坐标。假如求了好几个坐标，将这些坐标在坐标系上画上点，然后相连，连接后出现的直线。这个直线就是用来表达，关于函数f的曲线图像上，曲线上的某个点斜率 的切线
        #y - f(x0) = k(x-x0) 切线方程（点斜式方程）。切线方程，是干啥的？就是用来在坐标系上画斜率的切线的
        #新y - x0处的y = 斜率 * (新x - x0) 
        return k*(x-x0)+f(x0) 

    return tangent_equation


x = np.arange(0.0, 20.0, 0.1)
y = function_1(x)
plt.xlabel("x")
plt.ylabel("f(x)")

tf_5 = tangent_line(function_1, 5)
y_5 = tf_5(x)#切线的y轴的坐标
tf_10 = tangent_line(function_1, 10)
y_10 = tf_10(x)#切线的y轴的坐标

plt.plot(x, y)
plt.plot(x, y_5)#x=5时的，切线
plt.plot(x, y_10)#x=10时的，切线
plt.show()