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

# print(a[((0))])
# # [0 1 2 3 4]

# print(a[(0)])
# # [0 1 2 3 4]

# print(a[([0])])
# # [[0 1 2 3 4]]

# print(a[((0),)])
# # [0 1 2 3 4]

# print(a[([0],)])
# # [[0 1 2 3 4]]


# 检测索引是 基本索引 还是 高级索引
# a[:, 1::] = 1232574561
# print(len(a[a == 1232574561]))
# print(len(a[a == 1232574561]) != 0)

# if len(a[a == 1232574561]) != 0:
#     print('基本索引')
# else:
#     print('高级索引')



print(a[np.array([1]),np.array([1,0,2])])
a[np.array([1]),np.array([1,0])] = 1232574561
print(a) # 这里有问题，这很明显是高级索引，但高级索引返回的结果被赋值后，原始数据也会被影响，这里和numpy官网所解析的不一样
# 未完成 ... 
print(len(a[a == 1232574561]))
print(len(a[a == 1232574561]) != 0)
if len(a[a == 1232574561]) != 0:
    print('基本索引')
else:
    print('高级索引')






# def fun():
#     random = __import__('random')  # 以函数方式动态引入模块
#     return random.random()
