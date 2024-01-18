import numpy as np

# 关于基础索引的案例

a = np.arange(4*3*2).reshape(4,3,2)
print(a)
# [[[ 0  1]
#   [ 2  3]
#   [ 4  5]]

#  [[ 6  7]
#   [ 8  9]
#   [10 11]]

#  [[12 13]
#   [14 15]
#   [16 17]]

#  [[18 19]
#   [20 21]
#   [22 23]]]

'''
a[1]

1、补全索引；被索引数组是3维数组，这里被索引数组的第1个维度有索引参数，需要为第2,3个维度补充 :/::/slice(None)
a.shape  [4,3,2]
index    [1,:,:]
result   []

2、预测索引结果形状；被索引数组是3维数组，所以索引在不使用 np.newaxis/None 的情况下，索引结果最多也是一个3维数组
a.shape  [4,3,2]
index    [1,:,:]
result   []

被索引数组从左数第1个维度长度是4，对应的索引参数是 整数1，不是切片，所以索引结果形状第1位，去除
a.shape  [4,3,2]
index    [1,:,:]
result   [-,]

被索引数组从左数第2,3个维度，对应的索引参数是 :/::/slice(None)，所以索引结果形状第2,3位，忽略保持不变
a.shape  [4,3,2]
index    [1,:,:]
result   [-,3,2]

结果形状 [3,2]

--------------------

a[:,1]

1、补全索引；被索引数组是3维数组，这里被索引数组的第1,2个维度有索引参数，需要为第3个维度补充 :/::/slice(None)
a.shape  [4,3,2]
index    [:,1,:]
result   []

2、预测索引结果形状
a.shape  [4,3,2]
index    [:,1,:]
result   []

被索引数组从左数第1个维度的长度是4，对应的索引参数是 :/::/slice(None) ，所以索引结果形状第1位，忽略保持不变
a.shape  [4,3,2]
index    [:,1,:]
result   [4]
被索引数组从左数第2个维度的长度是3，对应的索引参数是 整数1，所以索引结果形状第2位，去除
a.shape  [4,3,2]
index    [:,1,:]
result   [4,-]
被索引数组从左数第3个维度的长度是2，对应的索引参数是 :/::/slice(None) ，所以索引结果形状第3位，忽略保持不变
a.shape  [4,3,2]
index    [:,1,:]
result   [4,-,2]

结果形状 [4,2]

--------------------

a[...,1]

1、补全索引；被索引数组是3维数组，索引里有 ... ,被索引数组最后一维有索引参数，根据 被索引数组有3个维度 和 ... 和 最后一维有索引参数 来判断，应将 ... 去除，然后为被索引数组第1,2个维度补充 :/::/slice(None)
a.shape  [4,3,2]
index    [:,:,1]
result   []

2、预测索引结果形状
a.shape  [4,3,2]
index    [:,:,1]
result   []

被索引数组从左数第1,2个维度，对应的索引参数是 :/::/slice(None) ，所以索引结果形状第1,2位，忽略保持不变
a.shape  [4,3,2]
index    [:,:,1]
result   [4,3]

被索引数组从左数第3个维度的长度是2，对应的索引参数是 整数1，所以索引结果形状第3位，去除
a.shape  [4,3,2]
index    [:,:,1]
result   [4,3,-]

结果形状 [4,3]

--------------------

a[1:,:,1]

1、补全索引；根据被索引数组第一个维度的信息，为切片补充参数
a.shape  [4,3,2]
index    [1:4:1,:,1]
result   []

2、预测索引结果形状
a.shape  [4,3,2]
index    [1:4:1,:,1]
result   []

被索引数组从左数第1个维度长度是4，对应的索引参数是 切片slice(1,4,1)，符合条件的下标是[1,2,3]，所以索引结果形状第1位是，3
a.shape  [4,3,2]
index    [1:4:1,:,1]
result   [3]

被索引数组从左数第2个维度长度是3，对应的索引参数是 :/::/slice(None) ，所以索引结果形状第2位，忽略保持不变
a.shape  [4,3,2]
index    [1:4:1,:,1]
result   [3,3]

被索引数组从左数第3个维度长度是2，对应的索引参数是 整数1，所以索引结果形状第3位，去除
a.shape  [4,3,2]
index    [1:4:1,:,1]
result   [3,3,-]

结果形状 [3,3]

--------------------

a[1:,:1,1]

1、补全索引；根据被索引数组第1,2个维度的信息，为切片补充参数
a.shape  [4,3,2]
index    [1:4:1,0:1:1,1]
result   []

2、预测索引结果形状
a.shape  [4,3,2]
index    [1:4:1,0:1:1,1]
result   []

被索引数组从左数第1个维度的长度是4，对应的索引参数是 切片slice(1,4,1)，符合条件的下标是[1,2,3]，所以索引结果形状第1位是，3
a.shape  [4,3,2]
index    [1:4:1,0:1:1,1]
result   [3]

被索引数组从左数第2个维度的长度是3，对应的索引参数是 切片slice(0,1,1)，符合条件的下标是[0]，所以索引结果形状第2位是，1
a.shape  [4,3,2]
index    [1:4:1,0:1:1,1]
result   [3,1]

被索引数组从左数第3个维度的长度是2，对应的索引参数是 整数1，所以索引结果形状第3位，去除
a.shape  [4,3,2]
index    [1:4:1,0:1:1,1]
result   [3,1,-]

结果形状 [3,1]
'''

'''
关于索引元祖里的 None/np.newaxis
官方文档：选择元组中的每个np.newaxis对象 用于将结果选择的维度扩展一个单位长度维度。添加的维度是np.newaxis对象在选择元祖中的位置。np.newaxis是 None 的别名，可以用None代替它，来获取相同的结果。 
个人理解：索引元祖里的None在索引时，是 不对应 被索引数组里的某个维度(或被索引数组形状数组里某个位置)的，它的作用仅是 根据它在索引元祖里相关位置 ，然后在索引结果里对应位置增加一个维度。它不会影响索引结果的数据的变化，只会影响索引结果的形状的变化。
'''

a=np.arange(2*3*4).reshape(2,3,4)
print(a)
# [[[ 0  1  2  3]
#   [ 4  5  6  7]
#   [ 8  9 10 11]]

#  [[12 13 14 15]
#   [16 17 18 19]
#   [20 21 22 23]]]

'''
a[1,None,1:3]

1、补全索引；为切片补充参数；为被索引数组里没有索引参数的维度，补 :/::/slice(None)
       a[1,None,1:3:1,:]
a.shape [2,     3,    4]
result  []
索引元祖里第1位 整数1 对应 被索引数组里的第1个维度(形状数组里第1位)，第1个维度的长度是2
索引元祖里第2位 None 不对应 被索引数组里的维度；
索引元祖里第3位 切片slice(1,3,1) 对应 被索引数组里的第2个维度(形状数组里第2位)，第2个维度的长度是3
索引元祖里第4位 :/::/slice(None) 对应 被索引数组里的第3个维度(形状数组里第3位)，第3个维度的长度是4

2、预测索引结果形状
       a[1,None,1:3:1,:]
a.shape [2,     3,    4]
result  []

索引元祖从左数第1位是，整数1，索引结果形状第1位，去除（对应被索引数组里第1个维度）
       a[1,None,1:3:1,:]
a.shape [2,     3,    4]
result  [-,]

索引元祖从左数第2位是，None，索引结果形状第2位，增加一个维度（不对应被索引数组里的维度）
       a[1,None,1:3:1,:]
a.shape [2,     3,    4]
result  [-,1]

索引元祖从左数第3位是，切片slice(1,3,1)符合条件的下标是[1,2]，索引结果形状第3位是，2（对应被索引数组里第2个维度）
       a[1,None,1:3:1,:]
a.shape [2,     3,    4]
result  [-,1,   2]

索引元祖从左数第4位是，:/::/slice(None) ，索引结果形状第4位，忽略保持不变（对应被索引数组里第3个维度）
       a[1,None,1:3:1,:]
a.shape [2,     3,    4]
result  [-,1,   2,    4]

结果形状 [1,2,4]

'''

#以上是对如何获取 索引结果形状 的解释
#以下是对如何获取 索引结果数据 的解释


a=np.arange(2*3*4).reshape(2,3,4)
print(a)
# [[[ 0  1  2  3]
#   [ 4  5  6  7]
#   [ 8  9 10 11]]

#  [[12 13 14 15]
#   [16 17 18 19]
#   [20 21 22 23]]]

'''
a里所有数据的坐标和数据值
[0, 0, 0] 0
[0, 0, 1] 1
[0, 0, 2] 2
[0, 0, 3] 3
[0, 1, 0] 4
[0, 1, 1] 5
[0, 1, 2] 6
[0, 1, 3] 7
[0, 2, 0] 8
[0, 2, 1] 9
[0, 2, 2] 10
[0, 2, 3] 11
[1, 0, 0] 12
[1, 0, 1] 13
[1, 0, 2] 14
[1, 0, 3] 15
[1, 1, 0] 16
[1, 1, 1] 17
[1, 1, 2] 18
[1, 1, 3] 19
[1, 2, 0] 20
[1, 2, 1] 21
[1, 2, 2] 22
[1, 2, 3] 23


基本索引获取 a[1,None,1:3:1,:] 数据
这里索引元祖里有None，在索引获取数据时，不需要None，所以把None从索引元祖里临时删除
a[1,1:3:1,:]

在索引获取数据时，使用js里printArr方法遍历数据，以获取符合索引条件的数据

下面开始遍历数据，选择被索引的数据：

遍历第1条数据
索引元祖与数据坐标进行比较
[1,1:3:1,:]
[0,0    ,0] 0
索引元祖第1位是 整数1 所以复合条件的坐标是[1]，坐标第1位是0，不符合
索引元祖第2位是 切片slice(1,3,1) 所以复合条件的坐标是[1,2]，坐标第2位是0，不符合（切片这里把符合条件的坐标全都列出来，然后用indexOf进行匹配）
索引元祖第3位是 :/::/slice(None) 意思是，忽略保持不变，没有条件，都行，所以复合条件的坐标是[0,1,2,3]，坐标第3位是0，符合
第1条数据，有2条不符合，所以不符合

遍历第2条数据
[1,1:3:1,:]
[0,0    ,1] 1
索引元祖第1位，复合条件的坐标是[1]，坐标第1位是0，不符合
索引元祖第2位，复合条件的坐标是[1,2]，坐标第2位是0，不符合
索引元祖第3位，复合条件的坐标是[0,1,2,3]，坐标第3位是1，符合
第2条数据，有2条不符合，所以不符合

遍历第3条数据
[1,1:3:1,:]
[0,0    ,2] 2
索引元祖第1位，复合条件的坐标是[1]，坐标第1位是0，不符合
索引元祖第2位，复合条件的坐标是[1,2]，坐标第2位是0，不符合
索引元祖第3位，复合条件的坐标是[0,1,2,3]，坐标第3位是2，符合
第3条数据，有2条不符合，所以不符合

...等等

遍历第17条数据
[1,1:3:1,:]
[1,1    ,0] 16
索引元祖第1位，复合条件的坐标是[1]，坐标第1位是1，符合
索引元祖第2位，复合条件的坐标是[1,2]，坐标第2位是1，符合
索引元祖第3位，复合条件的坐标是[0,1,2,3]，坐标第3位是0，符合
第17条数据，符合

...等等

遍历第24条数据
[1,1:3:1,:]
[1,2    ,3] 23
索引元祖第1位，复合条件的坐标是[1]，坐标第1位是1，符合
索引元祖第2位，复合条件的坐标是[1,2]，坐标第2位是2，符合
索引元祖第3位，复合条件的坐标是[0,1,2,3]，坐标第3位是3，符合
第24条数据，符合

'''

# 注意：以上情况没有考虑 切片slice(i,j,k) i和j是负值的情况，如果i和j是负值，i和j应该先从numpy负索引，转成正常索引，然后再进行操作
# 注意：以上情况没有考虑 切片slice(i,j,k) k是负值的情况
# 关于slice问题的解决方法，请看 ‘关于切片slice/numpy_slice.py’ 和 ‘关于切片slice/slice_test.js’

'''
# 当索引切片获取数据时，切片slice(i,j,k) k是负值，获取到的数据顺序不对，解决方法。

第一种方法：（先索引获取数据）（再翻转(再调整数据顺序)）
第一步，先使用上面的方法，以正常顺序去遍历数据，把符合条件的数据都取出来（不考虑数据的顺序是否正确）
第二步，数据都取出来后，根据取出来的数据的原始坐标，对 数据相关维度 的索引参数 是slice(i,j,k) 且k是负值 的维度 进行颠倒翻转

如：
a=np.arange(2*3*4).reshape(2,3,4)
array([[[ 0,  1,  2,  3],
        [ 4,  5,  6,  7],
        [ 8,  9, 10, 11]],

       [[12, 13, 14, 15],
        [16, 17, 18, 19],
        [20, 21, 22, 23]]])


a[1,3:0:-1,4:-11:-1]

被索引数组从左数，第1个维度的长度是2，对应的索引参数是 整数1，所以被索引数组第1个维度符合条件的坐标是[1]。又因为对应的索引参数是 整数1，所以索引结果形状第1位，去除
        a[1,3:0:-1,4:-11:-1]
a.shape  [2,3,     4]
result   [-]

被索引数组从左数，第2个维度的长度是3，对应的索引参数是 切片slice(3,0,-1)，所以被索引数组第2个维度符合条件的坐标是[2,1]。所以索引结果形状第2位是2
        a[1,3:0:-1,4:-11:-1]
a.shape  [2,3,     4]
result   [-,2]

被索引数组从左数，第3个维度的长度是4，对应的索引参数是 切片slice(4,-11,-1)，所以被索引数组第3个维度符合条件的坐标是[3,2,1,0]。所以索引结果形状第3位是4
        a[1,3:0:-1,4:-11:-1]
a.shape  [2,3,     4]
result   [-,2,     4]

结果形状：[2,4]

被索引数组第1个维度符合条件的坐标是，[1]
被索引数组第2个维度符合条件的坐标是，[2,1]
被索引数组第3个维度符合条件的坐标是，[3,2,1,0]

按照上面的介绍，先以'正常顺序'获取数据，从上往下：
[1, 1, 0] 16
[1, 1, 1] 17
[1, 1, 2] 18
[1, 1, 3] 19
[1, 2, 0] 20
[1, 2, 1] 21
[1, 2, 2] 22
[1, 2, 3] 23


第1个维度是[1]，就1个参数，所以不用调整顺序
[1, 1, 0] 16
[1, 1, 1] 17
[1, 1, 2] 18
[1, 1, 3] 19
[1, 2, 0] 20
[1, 2, 1] 21
[1, 2, 2] 22
[1, 2, 3] 23



第2个维度是[2,1]，2个参数，需要把形状第2位，2变成1，1变成2，颠倒顺序
[1, 1, 0] 20     原始坐标[1, 2, 0]
[1, 1, 1] 21     原始坐标[1, 2, 1]
[1, 1, 2] 22     原始坐标[1, 2, 2]
[1, 1, 3] 23     原始坐标[1, 2, 3]
[1, 2, 0] 16     原始坐标[1, 1, 0]
[1, 2, 1] 17     原始坐标[1, 1, 1]
[1, 2, 2] 18     原始坐标[1, 1, 2]
[1, 2, 3] 19     原始坐标[1, 1, 3]


第3个维度是[3,2,1,0]，4个参数，需要把形状第3位，3变成0，0变成3，2变成1，1变成2，颠倒顺序
[1, 1, 0] 23     原始坐标[1, 2, 3]
[1, 1, 1] 22     原始坐标[1, 2, 2]
[1, 1, 2] 21     原始坐标[1, 2, 1]
[1, 1, 3] 20     原始坐标[1, 2, 0]
[1, 2, 0] 19     原始坐标[1, 1, 3]
[1, 2, 1] 18     原始坐标[1, 1, 2]
[1, 2, 2] 17     原始坐标[1, 1, 1]
[1, 2, 3] 16     原始坐标[1, 1, 0]

就这样，数据顺序，就重新根据k是负值，处理完了



第二种方法：（先翻转（先调整数据顺序））（再索引获取数据）
第一步，在索引遍历数据前，根据索引元祖里的切片，对有切片k是负值的维度，进行掉个翻转。
第二步，数据某个维度里顺序根据切片k翻转后，在根据上面的printArr方法进行遍历索引获取数据。

测试后发现：第二种方法应该可行，但有一些细节，需要再详细研究一下。所以虽然第一种方法很麻烦，但100%可行，所以优先使用第一种方法。
如：
a=np.arange(2*3*4).reshape(2,3,4)

a[:,:,::-2] == a[:,:,::-1][:,:,::2]

a[:,:,3:1:-2] == a[:,:,::-1][:,:,1-1:3-1:2]

a[:,:,5:1:-2] != a[:,:,::-1][:,:,1-1:5-1:2]
a[:,:,5:1:-2] == a[:,:,::-1][:,:,1-1:3-1:2]

a[:,:,2:0:-2] == a[:,:,::-1][:,:,3-2:3-0:2]

a[:,:,3:1:-3] == a[:,:,::-1][:,:,3-3:3-1:3]

a[:,:,2:0:-3] == a[:,:,::-1][:,:,3-2:3-0:3]

a[:,:,3:-11:-2] == a[:,:,::-1][:,:,3-3:3--11:2]

a=np.arange(2*4*10).reshape(2,4,10)

a[:,3:-5:-2,9:(0-10):-2] == a[:,::-1,::-1][:,3-3:3--5:2,9-9:9-(0-10):2]

a[:,3:-5:-3,9:(0-10):-3] != a[:,::-1,::-1][:,3-3:3--5:3,9-9:9-(0-10):3]
'''








