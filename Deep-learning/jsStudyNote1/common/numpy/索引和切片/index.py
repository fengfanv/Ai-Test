# numpy索引官网 https://numpy.org/doc/stable/user/basics.indexing.html

# ndarrays 可以使用标准 Python x[obj] 语法进行索引，其中x是数组，obj是选择。 根据obj的不同，有不同类型的索引可以使用： 基本索引、高级索引和字段访问。

# 基本索引：当选择对象obj是slice对象(由括号内的 start:stop:step符号构造)、一个整数，或由切片对象和整数组成的元组时，会发生基本切片。Ellipsis和newaxis也可以与这些对象混合使用。

# 高级索引：当选择对象obj是一个非元组序列对象、是一个ndarray(数据类型为整数或布尔)、或者是一个至少包含一个序列对象或ndarray(数据类型为整数或布尔)的元组时，会触发高级索引。有两种类型的高级索引：整数索引和布尔索引。

# 在程序中处理可变数量的索引：索引语法功能非常强大，但在处理可变数量的索引时却有限制。例如，如果您想编写一个函数，该函数可以处理具有不同维数的参数，而又不想为每个可能维度编写特殊情况代码，如何做到这一点？如果向索引提供了一个元组，该元组将被解释为索引列表。

# 注意，在Python中，x[(exp1, exp2, ..., expN)] 等价于 x[exp1, exp2, ..., expN] 对于前者 后者只是前者的语法糖。

## 由上面numpy官网介绍可知，基本索引或高级索引都可以通过使用元组来进行索引，
## 如，基本索引，可以是由切片对象和整数组成的元组
## 如，高级索引，可以是一个至少包含一个序列对象或ndarray(数据类型为整数或布尔)的元组
## 其中"高级索引和基本索引相结合"的索引放到高级索引里去处理
## 


### 可变索引元祖列表 与 索引简写(语法糖)模式 的对比
'''
a=(1)   识别成括号
a=(1,)  识别成元祖

a=np.arange(10,30)

(3) ==> a[3] 

(slice(3,15)) ==> a[3:15]

(slice(None,None,3)) ==> a[::3]

a = np.arange(16).reshape(4,4)

(2,2) ==> a[2,2]

注意 slice(1) 会转换成 slice(None, 1, None)
(slice(None,2),slice(1,None)) ==> a[:2,1:]

a = np.arange(12).reshape(3,4)

i = [True,False,True]
j = [True,False,True,False]
(i,slice(None)) ==> a[i,:]
(slice(None),j) ==> a[:,j]
'''

'''
a=np.array([1,2,3,4])

(slice(None,3)) ==> a[:3]

(slice(3,None)) ==> a[3:]

(slice(None,None,2)) ==> a[::2]

(slice(None,-1)) ==> a[:-1]

a=np.arange(10).reshape(2,5)

(slice(None),1) ==> a[:,1]

a=np.arange(36).reshape(6,6)

(0,slice(3,5)) ==> a[0,3:5]

(slice(4,None),slice(4,None)) ==> a[4:,4:]

(slice(None),2) ==> a[:,2]

(slice(2,None,2),slice(None,None,2)) ==> a[2::2,::2]

a=np.arange(0,100,10)

index=[1,2,-3]
(index) ==> a[index]

a=np.arange(36).reshape(6,6)

([0,1,2,3,4],[1,2,3,4,5]) ==> a[[0,1,2,3,4],[1,2,3,4,5]]
((0,1,2,3,4),(1,2,3,4,5)) ==> a[(0,1,2,3,4),(1,2,3,4,5)]

(slice(3,None),[0,2,4]) ==> a[3:,[0,2,4]]

([False,True,True,False,True,False]) ==> a[[False,True,True,False,True,False]]
'''

'''
a=np.arange(10)

(slice(1,10,2)) ==> a[1:10:2]

(slice(2,None)) ==> a[2:]

(slice(None,5)) ==> a[:5]

a=np.arange(1,10).reshape(3,3)

(slice(1,None)) ==> a[1:]

(Ellipsis,0) ==> a[...,0]

(1,Ellipsis) ==> a[1,...]

(Ellipsis,slice(1,None)) ==> a[...,1:]

(slice(1,None),Ellipsis) ==> a[1:,...]

([0,1,2],[0,1,2]) ==> a[[0,1,2],[0,1,2]]

([[0,0],[2,2]],[[0,2],[0,2]]) ==> a[[[0,0],[2,2]],[[0,2],[0,2]]]

(slice(0,2),slice(0,2)) ==> a[0:2,0:2]

(Ellipsis,slice(0,2)) ==> a[...,0:2]

a=np.arange(25).reshape(5,5)

([1,2,3]) ==> a[[1,2,3]]

([-1,-2,-3]) ==> a[[-1,-2,-3]]

([[2],[1],[3]],[2,3,1,4,0]) ==> a[[[2],[1],[3]],[2,3,1,4,0]]
'''

'''
a=np.arange(12).reshape(3,4)

(Ellipsis,1) ==> a[...,1]

(slice(None),1) ==> a[:,1]

(Ellipsis,slice(1,None)) ==> a[...,1:]

(slice(None),slice(1,None)) ==> a[:,1:]

a=np.arange(10)

(-1) ==> a[-1]

(slice(None,-3)) ==> a[:-3]

(slice(None,None,-1)) ==> a[::-1]

(slice(2,None,-1)) ==> a[2::-1]

(slice(5,None,2)) ==> a[5::2]

(slice(5,None,-3)) ==> a[5::-3]

a=np.arange(12).reshape(4,3)

([0,1,3,2],[2,1,2,2]) ==> a[[0,1,3,2],[2,1,2,2]]

rows=[[0,0],[3,3]]
cols=[[0,2],[0,2]]
(rows,cols) ==> a[rows,cols]

(slice(None),[1,2]) ==> a[:,[1,2]]
'''

'''
a=np.arange(20)

(slice(5,16,1)) ==> a[5:16:1]

a=np.arange(1,10).reshape(3,3)

(Ellipsis,1) ==> a[...,1]

(1,Ellipsis) ==> a[1,...]

(Ellipsis,slice(1,None)) ==> a[...,1:]

a=np.arange(32).reshape(8,4)

([0,3,5],Ellipsis) ==> a[[0,3,5],...]

([0,-3,-5],Ellipsis) ==> a[[0,-3,-5],...]
'''

'''
a=np.arange(11,36).reshape(5,5)

(2,1) ==> a[2,1]

a=np.arange(5*4*3*6*4).reshape(5,4,3,6,4)

(1,2,Ellipsis) ==> a[1,2,...]

(1,2,slice(None),slice(None),slice(None)) ==> a[1,2,:,:,:]


(Ellipsis,3) ==> a[...,3]

(slice(None),slice(None),slice(None),slice(None),3) ==> a[:,:,:,:,3]


(4,Ellipsis,5,slice(None)) ==> a[4,...,5,:]

(4,slice(None),slice(None),5,slice(None)) ==> a[4,:,:,5,:]

'''

'''
(1,3) ==> a[1,3]

(1,-1) ==> a[1,-1]

a=np.arange(5*5).reshape(5,5)

(slice(None),slice(None)) ==> a[:,:]
(slice(None),slice(None)) ==> a[::,::]

'''