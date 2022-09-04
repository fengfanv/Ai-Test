#矩阵乘积运算
import numpy as np
A = np.array([[1,2],[3,4]])
print(A)
'''
[[1 2]
 [3 4]]
'''
print(A.shape)#(2, 2)
B = np.array([[5,6],[7,8]])
print(B)
'''
[[5 6]
 [7 8]]
'''
print(B.shape)#(2, 2)
print(np.dot(A,B))#乘积运算要求，第一个数组列的数量要与，第二个数组的行数相等，不懂看书，就明白了，因为第一个数组行里面的元素要和第二个数组列的元素进行运算，所以第一个数组的列的数量要和第二个数组里的行的数量对应
'''
[[19 22]
 [43 50]]
'''
'''
np.dot(A,B)矩阵乘积运算
这里numpy数组A有几行，运算后，输出的numpy数组就有几行
这里numpy数组B有几列，运算后，输出的numpy数组就有几列
如下：
'''
A1=np.array([1,2,3])#一行三列
B1=np.array([[7,8],[9,10],[11,12]])#三行两列
print(np.dot(A1,B1))#输出的结果，一行两列

A2=np.array([[7,8],[9,10],[11,12]])#三行两列
B2=np.array([1,2])#一行二列
print(np.dot(A2,B2))#输出的结果，一行三列
'''
这里又有一点，不一样，当第二个数组是一维数组时，要竖着看，把这个一维数组的行，看成列。第二个数组不应该是，一行两列吗，不能这么看，要理解成一列两行
一列两行了，那输出的结果，是不是也是一列内有多行。其实是的，但因为是一维数组，展示不方便，就给转成行了
上面是我自己的个人理解，其实应该有点不对，
如果以后忘了，重新一下，这个书，最好，重新在动一次脑，多动动脑挺好，会有意外收获
'''