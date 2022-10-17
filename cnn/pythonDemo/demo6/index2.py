import numpy as np
import matplotlib.pyplot as plt

def sigmoid(x):
    return 1/(1+np.exp(-x))

def relu(x):
    return np.maximum(0,x)

x = np.random.randn(1000,100) #1000个数据
node_num = 100          #各隐藏层的节点（神经元）数
hidden_layer_size = 5   #隐藏层有5层
activations = {}        #激活值的结果保存在这里

#print(x.shape)#(1000, 100)

'''
# 激活函数为sigmoid函数时，权重的初始值
for i in range(hidden_layer_size):
    if i != 0:
        x = activations[i-1]
    
    # w = np.random.randn(node_num,node_num) * 1        #问题，容易造成“梯度消失”。各层的激活值呈偏向0和1的分布，并且这里使用的sigmoid函数是S型函数，随着输出不断地靠近0（或者靠近1），它的导数的值逐渐接近0。因此，偏向0和1的数据分布会造成反向传播中梯度的值不断变小，最后甚至是消失。
    # w = np.random.randn(node_num,node_num) * 0.01     #问题，容易造成“表现力受限”。各层的激活值呈集中在0.5附近的分布，不像上面那样偏向0和1，所以不会发生梯度消失的问题。但是，激活值的分布有所偏向，说明在表现力上会有很大问题。为什么这么说呢？因为如果有多个神经元都输出几乎相同的值，那它们就没有存在的意义了。比如，如果100个神经元都输出几乎相同的值，那么也可以由1个神经元来表达基本相同的事情。
    # 各层的激活值的分布都要求有适当的广度。为什么呢？因为通过在各层间传递多样性的数据，神经网络可以进行高效的学习。反过来，如果传递的是有所偏向的数据，就会出现梯度消失或者“表现力受限”的问题，导致学习可能无法顺利进行。
    # Xavier初始值，可以有效的解决，激活值分布有所偏向的问题（激活值呈偏向0和1的分布，会造成“梯度消失”问题。激活值呈集中在0.5附近的分布，会造成“表现力受限”问题）
    
    before_node_num = node_num #本层的前一层节点数量
    w = np.random.randn(node_num, node_num) / np.sqrt(before_node_num) #各层的激活值呈现了比之前更有广度的分布，因为各层间传递的数据有适当的广度，所以sigmoid函数的表现力不受限制，有望进行高效的学习。

    z = np.dot(x,w)
    #print(z.shape)#(1000, 100)
    a = sigmoid(z) #sigmoid函数
    #print(a.shape)#(1000, 100)
    activations[i] = a
'''

# 激活函数为relu函数时，权重的初始值
for i in range(hidden_layer_size):
    if i != 0:
        x = activations[i-1]
    
    # w = np.random.randn(node_num,node_num) * 0.01                         #权重初始值为标准差是0.01的高斯分布，特点，各层的激活值非常小。神经网络上传递的是非常小的值，说明逆向传播时权重的梯度也同样很小。这是很严重的问题，实际上学习基本上没有进展。
    before_node_num = node_num #本层的前一层节点数量
    # w = np.random.randn(node_num, node_num) / np.sqrt(before_node_num)    #权重初始值为Xavier初始值，特点，随着层的加深，偏向一点点变大。实际上，层加深后，激活值的偏向变大，学习时会出现梯度消失的问题
    w = np.random.randn(node_num, node_num) * np.sqrt(2.0 / before_node_num)#权重初始值为He初始值，特点，可以有效解决上面两种初始值的问题，各层中分布的广度相同。即便层加深，数据的广度也能保持不变，因此逆向传播时，也会传递合适的值。

    z = np.dot(x,w)
    a = relu(z) #relu函数
    activations[i] = a


#绘制直方图
for i,a in activations.items():
    plt.subplot(1,len(activations),i+1)
    plt.title(str(i+1)+"-layer")
    if i != 0: plt.yticks([], [])#只有第一个图显示y轴坐标
    plt.hist(a.flatten(),30,range=(0,1))
plt.show()

# 总结1：当激活函数使用ReLU时，权重初始值使用He初始值，当激活函数为sigmoid或tanh等S型曲线函数时，初始值使用Xavier初始值。

# 总结2：我们从6.2.4基于MNIST数据集的权重初始值的比较里看到，std = 0.01时完全无法进行学习，因为正向传播中传递的值很小（集中在0附近的数据）。因此，逆向传播时求到的梯度也很小，权重几乎不进行更新。但当权重初始值为Xavier初始值和He初始值时，学习进行得很顺利。并且，我们发现He初始值时的学习进度更快一些。

# 总结3：综上，在神经网络的学习中，权重初始值非常重要。很多时候权重初始值的设定关系到神经网络的学习能否成功。权重初始值的重要性容易被忽视，而任何事情的开始（初始值）总是关键的，因此在结束本节之际，再次强调一下权重初始值的重要性。