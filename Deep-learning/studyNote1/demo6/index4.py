# 正则化
# 在机器学习的世界里，过拟合是一个很常见的问题。
# 过拟合 指的是 只能拟合训练数据，但不能很好地拟合 除了训练数据以外的其它数据 的状态。（过拟合。训练的结果，只能拟合(匹配)训练数据，不能拟合(匹配)其它数据）
# 机器学习的目标是提高泛化能力，即便是没有包含在训练数据里的未观测数据，也希望模型可以进行正确的识别。
# 发生过拟合的原因，主要有以下两个：
# 1、模型拥有大量参数、表现力强。
# 2、训练数据少。
#-----------------------------------------------------------------
# 这里，我们故意满足这两个条件，制造过拟合现象，为此，要从MNIST数据集原本的60000个训练数据中只选定300个，并且，为了增加网络的复杂度，使用7层网络（每层有100个神经元，激活函数为ReLU）。
# 制造过拟合，详细代码请看make_overfit.py
#
# 实验结果，从最后结果图中可知，过了100左右个epoch后，用训练数据测量到的识别精度几乎都为100%。
# 但是，对于测试数据，离100%的识别精度还有较大的差距。如此大的识别精度差距，
# 是只拟合了训练数据的结果。这里训练出的模型对训练时没有使用的一般数据（测试数据）拟合得不是很好。
#-----------------------------------------------------------------
# 抑制过拟合的方法1，权值衰减
# 权值衰减是一个经常被使用的一种抑制过拟合的方法
# 这个方法通过在学习的过程中对大的权重进行惩罚，来抑制过拟合（很多过拟合原本就是因为权重参数取值过大才发生的）
# 权值衰减，就是给损失函数加上一个，权重的平方范数，来抑制权重变大（来抑制过拟合）
# 权重的平方范数，是什么，不必细究，知道它可以抑制过拟合就行，因为细究，暂时也不太好懂，所以就先不浪费时间了，以后数学好了，在研究
# 这块详细内容，请先看书吧（6.4.2　权值衰减）
# 权值衰减，实验代码，请看overfit_weight_decay.py
# 实验结果，虽然训练数据的识别精度和测试数据的识别精度之间还有差距，但是与上面（make_overfit.py）没有使用权值衰减的结果图来看，差距变小了。这说明过拟合受到了抑制。此外，还要注意，训练数据的识别精度没有达到100%
#-----------------------------------------------------------------
# 抑制过拟合的方法2，Dropout(删除法，或丢弃法)
# 上面我们介绍了为损失函数加上权重的L2范数的权值衰减方法。这个方法可以简单地实现，在某种程度上能够抑制过拟合。但是，如果网络的模型变得很复杂，只用权值衰减就难以应对了。在这种情况下，我们经常会使用Dropout方法。
# Dropout是一种在学习的过程中随机删除神经元的方法。训练时，随机选出隐藏层的神经元，然后将其删除。被删除的神经元不再进行信号的传递。
# 训练时，每传递一次数据，就会随机选择要删除的神经元。然后，测试时，虽然会传递所有的神经元信号，但是对于各个神经元的输出，要乘上训练时的删除比例后再输出。
#
# 下面我们来实现Dropout
class Dropout:
    def __init__(self,dropout_ratio=0.5):
        #dropout_ratio删除神经元的概率
        #假如dropout_ratio=0.6。神经网络的某一层会输出10个元素，然后这个10个元素，每个元素，被删除的概率为0.6
        self.dropout_ratio = dropout_ratio
        self.mask = None
    
    def forward(self,x,train_flg=True):
        #train_flg的意思是，当前是否，训练阶段
        if train_flg:
            #训练模型，使用训练数据(x_train, t_train)，训练神经网络的时候
            self.mask = np.random.rand(*x.shape) > self.dropout_ratio
            return x*self.mask
        else:
            #测试模型，使用测试数据(x_test, t_test)测试模型精度的时候
            return x*(1.0-self.dropout_ratio)
        '''
        为什么会有train_flg？
        因为 Dropout 在每次训练时，都会随机删除某些神经元。每次删除的神经元不一样，造成的结果也不一样。
        每次删除某些神经元后，就相当于，从原版本的神经网络模型结构上，又改造出一个新的模型结构，所以每次训练时，相当于 在使用不同的神经网络结构在学习。
        因为“每次训练学习时，删除不同的神经元，就像是使用不同模型进行学习一样”，所以在测试时，为测试神经网络模型的精度，要汇总这些不同模型的结果，然后取一个平均结果。
        所以，这也就是为什么要分 训练 和 测试 两种情况。

        上文字面里的 “又改造出一个新的模型结构” 是什么意思？
        机器学习中经常使用集成学习。所谓集成学习，就是让多个模型单独进行学习，推理时再取多个模型的输出的平均值。
        用神经网络的语境来说，比如，准备5个结构相同（或者类似）的网络，分别进行学习，测试时，以这 5 个网络的输出的平均值作为答案。
        实验告诉们，通过进行集成学习，神经网络的识别精度可以提高好几个百分点，这个集成学习与Dropout 有密切的关系。
        这是因为可以将Dropout理解为，通过在学习过程中随机删除神经元，从而每一次都让不同的模型进行学习。
        并且，推理(测试)时，通过对神经元的输出乘以删除比例（比如，0.5 等），可以取得模型的平均值。

        如果有什么疑问，可以看一下这个文章，https://blog.csdn.net/qq_37555071/article/details/107801384
        但说实话，我感觉他文章写的也有问题。
        咱这里所写的，都是精华
        '''
    def backward(self,dout):
        return dout*self.mask
'''
这里的要点是，每次正向传播时，
self.mask中都会以False的形式保存要删除的神经元。
self.mask会随机生成和x形状相同的数组，
并将值比dropout_ratio大的元素设为True。
反向传播时的行为和ReLU相同。
也就是说，正向传播时传递了信号的神经元，
反向传播时按原样传递信号；
正向传播时没有传递信号的神经元，反向传播时信号将停在那里。
'''
# Dropout，实验代码，请看overfit_dropout.py
# 实验结果，通过使用Dropout，训练数据和测试数据的识别精度的差距变小了。并且，训练数据也没有到达100%的识别精度。像这样，通过使用Dropout，即便是表现力强的网络，也可以抑制过拟合。

