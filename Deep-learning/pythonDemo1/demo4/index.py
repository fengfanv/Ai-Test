#损失函数

#损失函数干啥用？
#神经网络的学习，通过某个指标表示现在的状态。然后已这个指标为基准，寻找最优权重参数。这个指标就是 损失函数

#均方误差
import numpy as np
def mean_squared_error(y,t):
    return 0.5*np.sum((y-t)**2)

#设数字2，为正解，为正确答案
t = [0,0,1,0,0,0,0,0,0,0]#监督数据，这种将正确值标为1，其它值标为0的形式，叫one-hot模式

#例1，输出的y，数字2概率最高，概率是0.6
y = [0.1,0.05,0.6,0.0,0.05,0.1,0.0,0.1,0.0,0.0]#神经网络输出的y，这个数据值是由softmax函数输出的

print(mean_squared_error(np.array(y),np.array(t)))#0.09750000000000003

#例2，输出的y，数字7概率最高，概率是0.6
y2 = [0.1,0.05,0.1,0.0,0.05,0.1,0.0,0.6,0.0,0.0]
print(mean_squared_error(np.array(y2),np.array(t)))#0.5975

#实验显示，第一个例子y的损失函数数值更小，和监督数据之间的误差更小，也就是说均方误差显示第一个例子y的输出结果与监督数据更加吻合


#交叉熵误差
def cross_entropy_error(y,t):
    delta = 1e-7
    return -np.sum(t*np.log(y+delta))

print(cross_entropy_error(np.array(y),np.array(t)))#0.510825457099338 这个意思和上面那个方法所表达的意思是一样的。给损失函数输入的值越大，损失函数输出的值越小。不懂就重新看书，看一遍不明白，就多看几遍
print(cross_entropy_error(np.array(y2),np.array(t)))#2.302584092994546





