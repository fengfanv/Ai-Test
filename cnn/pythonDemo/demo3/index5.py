# 实现softmax函数
import numpy as np

a = np.array([0.3,2.9,4.0])

exp_a = np.exp(a) #指数函数，看书你就明白了
print(exp_a)#[ 1.34985881 18.17414537 54.59815003]

sum_exp_a = np.sum(exp_a)#指数函数的和
print(sum_exp_a)#74.1221542101633

y = exp_a / sum_exp_a
print(y)#[0.01821127 0.24519181 0.73659691]

#下面这个softmax函数，计算时存在溢出问题
def softmax_before(a):
    exp_a = np.exp(a)
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y

#print(softmax_before(np.array([1010,1000,990])))#[nan nan nan] 数值太大，没有被正确的运算

#优化softmax函数，解决溢出问题
a = np.array([1010,1000,990])
c = np.max(a)
print(c)#1010
print(a-c)#[  0 -10 -20]
print(np.exp(a-c)/np.sum(np.exp(a-c)))#[9.99954600e-01 4.53978686e-05 2.06106005e-09]  优化后，数值被正确计算

#真正的softmax函数
def softmax(a):
    c = np.max(a)
    exp_a = np.exp(a - c) #解决溢出问题
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y

print(softmax(a))#[9.99954600e-01 4.53978686e-05 2.06106005e-09]
print(np.sum(softmax(a)))#1.0    softmax函数有一个特点，输出的数值总和为1 



