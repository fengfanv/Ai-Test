
import sys
import os
sys.path.append(os.pardir)  # 为了导入父目录的文件而进行的设定

import matplotlib.pyplot as plt
import numpy as np

from simple_convnet import SimpleConvNet
from dataset.mnist import load_mnist
from common.optimizer import *

#---------------------------------------------------------------------------------------------------

#mini-batch学习

# 读入mnist数据
(x_train, t_train), (x_test, t_test) = load_mnist(flatten=False)

# 减少学习数据
x_train = x_train[:1000]
t_train = t_train[:1000]

# print(x_train[0])

network = SimpleConvNet(input_dim=(1,28,28),
                        conv_param = {'filter_num': 30, 'filter_size': 5, 'pad': 0, 'stride': 1},
                        hidden_size=100,
                        output_size=10,
                        weight_init_std=0.01)
optimizer = Adam() # SGD方法无法正常更新参数，AdaGrad可以，Adam效果最屌

max_epochs = 20
train_size = x_train.shape[0]
batch_size = 100

train_loss_list = []
train_acc_list = []
test_acc_list = []

iter_per_epoch = max(train_size / batch_size, 1)
epoch_cnt = 0

for i in range(1000000000):
    batch_mask = np.random.choice(train_size, batch_size)
    
    x_batch = x_train[batch_mask]
    t_batch = t_train[batch_mask]

    # print(x_batch.shape) # (100, 1, 28, 28)

    grads = network.gradient(x_batch, t_batch)
    optimizer.update(network.params, grads)

    if i % iter_per_epoch == 0:
        train_acc = network.accuracy(x_train, t_train)
        test_acc = network.accuracy(x_test, t_test)
        train_acc_list.append(train_acc)
        test_acc_list.append(test_acc)

        print("epoch:" + str(epoch_cnt) + ", train acc:" + str(train_acc) + ", test acc:" + str(test_acc))

        epoch_cnt += 1
        if epoch_cnt >= max_epochs:
            break


# 绘制图形==========
markers = {'train': 'o', 'test': 's'}
x = np.arange(max_epochs)
plt.plot(x, train_acc_list, marker='o', label='train', markevery=10)
plt.plot(x, test_acc_list, marker='s', label='test', markevery=10)
plt.xlabel("epochs")
plt.ylabel("accuracy")
plt.ylim(0, 1.0)
plt.legend(loc='lower right')
plt.show()

# ------------------------------------------------------------------------------------------

# 询问是否保存训练成果
sys.stdout.write("是否保存训练结果？【y/n】")
choice = input().lower()
if choice in 'y':
    network.save_params()
else:
    exit()
