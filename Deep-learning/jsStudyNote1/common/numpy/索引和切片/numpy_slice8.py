import numpy as np

x = np.arange(2*3*4).reshape(2,3,4)
print(x)
# [[[ 0  1  2  3]
#   [ 4  5  6  7]
#   [ 8  9 10 11]]

#  [[12 13 14 15]
#   [16 17 18 19]
#   [20 21 22 23]]]

ind_1 = np.array([0,1])
boolean_array = np.array([True,False,True])
ind_2 = np.array([0,2])

boolean_array2 = np.array([True,True,True])
boolean_array3 = np.array([False,False,True])

print(x[ind_1,boolean_array,ind_2])
# [ 0 22]

print(x[(ind_1,)+boolean_array.nonzero()+(ind_2,)])
# [ 0 22]

print(boolean_array.nonzero())
# (array([0, 2], dtype=int64),)

print((ind_1,)+boolean_array.nonzero()+(ind_2,))
# (array([0, 1]), array([0, 2], dtype=int64), array([0, 2]))

print(x[[0,1],[0,2],[0,2]])
# [ 0 22]

print(x[ind_1,boolean_array2,ind_2])
# IndexError: shape mismatch: indexing arrays could not be broadcast together with shapes (2,) (3,) (2,)

print(x[ind_1,boolean_array3,ind_2])
# [ 8 22]


# ----------------------------------------


x = np.arange(2*3*4).reshape(2,3,4)
print(x)
# [[[ 0  1  2  3]
#   [ 4  5  6  7]
#   [ 8  9 10 11]]

#  [[12 13 14 15]
#   [16 17 18 19]
#   [20 21 22 23]]]

index_1 = np.array([True,False])
index_2 = np.array([True,False,True])
index_3 = np.array([True,False,True,False])

index_1_1 = np.array([True,True])
index_2_1 = np.array([True,True,True])

print(x[index_1])
# [[[ 0  1  2  3]
#   [ 4  5  6  7]
#   [ 8  9 10 11]]]
print(x[index_1].shape)
# (1, 3, 4)

print(x[index_1,index_2_1])
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]
print(x[index_1,index_2_1].shape)
# (3, 4)

print(x[index_1_1,index_2_1])
# IndexError: shape mismatch: indexing arrays could not be broadcast together with shapes (2,) (3,)

print(x[index_1,index_2])
# [[ 0  1  2  3]
#  [ 8  9 10 11]]
print(x[index_1,index_2].shape)
# (2, 4)



print(x[:,index_2])
# [[[ 0  1  2  3]
#   [ 8  9 10 11]]

#  [[12 13 14 15]
#   [20 21 22 23]]]
print(x[:,index_2].shape)
# (2, 2, 4)

print(x[...,index_3])
# [[[ 0  2]
#   [ 4  6]
#   [ 8 10]]

#  [[12 14]
#   [16 18]
#   [20 22]]]
print(x[...,index_3].shape)
# (2, 3, 2)


# ----------------------------------------


x = np.arange(30).reshape(2, 3, 5)
print(x)
# [[[ 0  1  2  3  4]
#   [ 5  6  7  8  9]
#   [10 11 12 13 14]]

#  [[15 16 17 18 19]
#   [20 21 22 23 24]
#   [25 26 27 28 29]]]

index = np.array([[True,False,True],[True,False,True]])
print(index.shape) # (2, 3)

print(x[index])
# [[ 0  1  2  3  4]
#  [10 11 12 13 14]
#  [15 16 17 18 19]
#  [25 26 27 28 29]]
print(x[index].shape) # (4, 5)