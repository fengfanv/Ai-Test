# 输出层激活函数
# 输出层的激活函数与其它层的有所不同
# 输出层所用的激活函数，要根据求解问题的性质决定。一般地，回归问题可以使用恒等函数，二元分类问题可以使用 sigmoid函数，多元分类问题可以使用 softmax函数。
# 神经网络可以用在分类问题和回归问题上，不过需要根据情况改变输出层的激活函数。一般而言，回归问题用恒等函数，分类问题用softmax函数。
# 机器学习的问题大致可以分为分类问题和回归问题。分类问题是数据属于哪一个类别的问题。比如，区分图像中的人是男性还是女性的问题就是分类问题。而回归问题是根据某个输入预测一个（连续的）数值的问题。比如，根据一个人的图像预测这个人的体重的问题就是回归问题（类似“57.4kg”这样的预测）。



# 恒等函数
# 特点：恒等函数会将输入按原样输出，对于输入的信息，不加以任何改动地直接输出。因此，在输出层使用恒等函数时，输入信号会原封不动地被输出。
def identity_function(x):
    return x

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

# softmax函数
# 特点：softmax函数的输出是0.0到1.0之间的实数。并且，softmax函数的输出值的总和是1。输出总和为1是softmax函数的一个重要性质。正因为有了这个性质，我们才可以把softmax函数的输出解释为“概率”。
# 特点2：softmax函数，输出的各个元素之间的大小关系不会改变。这是因为指数函数（y = exp(x)）是单调递增函数。
# 求解机器学习问题的步骤可以分为“学习”和“推理”两个阶段。首先，在学习阶段进行模型的学习，然后，在推理阶段，用学到的模型对未知的数据进行推理（分类）。如前所述，推理阶段一般会省略输出层的 softmax函数。在输出层使用 softmax函数是因为它和神经网络的学习有关系
def softmax(a):
    c = np.max(a)
    exp_a = np.exp(a - c) #解决溢出问题
    sum_exp_a = np.sum(exp_a)
    y = exp_a / sum_exp_a
    return y

print(softmax(a))#[9.99954600e-01 4.53978686e-05 2.06106005e-09]
print(np.sum(softmax(a)))#1.0    softmax函数有一个特点，输出的数值总和为1 



