import numpy as np

x = np.arange(2*3*4).reshape(2,3,4)
print(x)
# [[[ 0  1  2  3]
#   [ 4  5  6  7]
#   [ 8  9 10 11]]

#  [[12 13 14 15]
#   [16 17 18 19]
#   [20 21 22 23]]]

# ind_1 = np.array([0,1])
# boolean_array = np.array([True,False,True])
# ind_2 = np.array([0,2])

# print(x[ind_1,boolean_array,ind_2])
# # [ 0 22]

# print(x[(ind_1,)+boolean_array.nonzero()+(ind_2,)])
# # [ 0 22]

# print(boolean_array.nonzero())
# # (array([0, 2], dtype=int64),)

# print((ind_1,)+boolean_array.nonzero()+(ind_2,))
# (array([0, 1]), array([0, 2], dtype=int64), array([0, 2]))

# ----------------------------------------

index_1 = np.array([True,False])
index_2 = np.array([True,False,True])
index_3 = np.array([True,False,True,False])
# print(x[index_1,index_2])
# # [[ 0  1  2  3]
# #  [ 8  9 10 11]]
# print(x[index_1,index_2].shape)
# # (2, 4)

# print(x[:,index_2])
# # [[[ 0  1  2  3]
# #   [ 8  9 10 11]]

# #  [[12 13 14 15]
# #   [20 21 22 23]]]
# print(x[:,index_2].shape)
# # (2, 2, 4)

# print(x[...,index_3])
# # [[[ 0  2]
# #   [ 4  6]
# #   [ 8 10]]

# #  [[12 14]
# #   [16 18]
# #   [20 22]]]
# print(x[...,index_3].shape)
# # (2, 3, 2)