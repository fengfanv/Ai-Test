import numpy as np

# 偏导数，有多个变量的函数，的导数，称为偏导数（偏导数特点：偏导数需要将多个变量中的某一个变量定位目标变量，然后其它变量固定为某个值，然后然后再去求目标变量的偏导数）

#求只有一个变量函数，的导数，的方法
def numerical_diff(f,x):
    h=1e-4 #0.0001
    return (f(x+h)-f(x-h))/(2*h)

#函数f(x0,x1)=x0*x0+x1*x1 求当x0=3,x1=4时,x0的偏导数，和x1的偏导数
#当x1=4，求x0的偏导数
def function_tmp1(x0):
    return x0*x0 + 4.0**2.0
print(numerical_diff(function_tmp1,3.0))#6.00000000000378    关于x0的偏导数

#当x0=3，求x1的偏导数
def function_tmp2(x1):
    return 3.0**2.0 + x1*x1
print(numerical_diff(function_tmp2,4.0))#7.999999999999119    关于x1的偏导数



#梯度，由全部变量的偏导数汇总而成的向量，称为梯度
#梯度，[x0的偏导数,x1的偏导数]，或[6.00000000000378,7.999999999999119]，这就叫梯度


#求梯度（求有多个变量函数，的导数，的方法。这里函数全部变量的各个偏导数，汇总成的数组，就叫梯度，就是个名字）
def numerical_gradient(f,x):
    h = 1e-4 #0.0001
    grad = np.zeros_like(x) #生成和x形状相同的数组

    for idx in range(x.size):
        tmp_val = x[idx]
        # f(x+h) 的计算
        x[idx] = tmp_val+h
        fxh1 = f(x)

        # f(x-h) 的计算
        x[idx] = tmp_val-h
        fxh2 = f(x)

        grad[idx] = (fxh1-fxh2)/(2*h)
        x[idx]=tmp_val #还原值

    return grad

#函数f(x0,x1)=x0*x0+x1*x1
def function_2(x):
    return x[0]**2+x[1]**2

#求函数x0=3,x1=4时的梯度
print(numerical_gradient(function_2,np.array([3.0,4.0])))#[6. 8.]，这个6和8其实和上面这个[6.00000000000378,7.999999999999119]一样，但是被python处理了


#梯度法，函数的取值从当前位置，沿着梯度方向前进一定距离，然后在新的地方重新求梯度，再沿着新梯度方向前进，如此反复，不断地沿着梯度方向前进。
#像这样，通过不断地沿着梯度方向前进，逐渐减小函数值的过程就是 梯度法

#梯度法
def gradient_descent(f,init_x,lr=0.01,step_num=100):
    x=init_x

    for i in range(step_num):
        grad = numerical_gradient(f,x)
        x = x - lr*grad

    return x

#使用梯度法求function_2的最小值

init_x = np.array([-3.0,4.0])
print(gradient_descent(function_2,init_x=init_x,lr=0.1,step_num=100))#[-6.11110793e-10  8.14814391e-10]

