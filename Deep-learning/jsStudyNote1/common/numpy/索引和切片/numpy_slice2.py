import numpy as np


a = np.arange(10).reshape(2, 5)
# print(a)
# # [[0 1 2 3 4]
# #  [5 6 7 8 9]]


# print(a[(1),(1,2,3)])
# # [6 7 8]

# print(a[((1),(1,2,3))])
# # [6 7 8]

# print(a[([1],[1,2,3])])
# # [6 7 8]


#--------------------------------------


index_row = np.arange(1)
# print(index_row)
# # [0]
index_column = np.arange(3)
# print(index_column)
# # [0 1 2]

# print(a[(index_row)])
# # [[0 1 2 3 4]]
# print(a[(index_row,)])
# # [[0 1 2 3 4]]

# print(a[(index_row,index_column)])
# # [0 1 2]


#--------------------------------------


# print(a[((0))])
# # [0 1 2 3 4]

# print(a[(0)])
# # [0 1 2 3 4]

# print(a[([0])])
# # [[0 1 2 3 4]]

# print(a[((0),)])
# # [0 1 2 3 4]

# print(a[((0,),)])
# # [[0 1 2 3 4]]

# print(a[([0],)])
# # [[0 1 2 3 4]]



# def fun():
#     random = __import__('random')  # 以函数方式动态引入模块
#     return random.random()
