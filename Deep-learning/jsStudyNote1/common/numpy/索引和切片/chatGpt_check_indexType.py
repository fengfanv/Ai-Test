import numpy as np


# 检查索引类型
# 使用 NumPy 的 np.may_share_memory() 函数来判断索引操作是否触发了高级索引。
# 该函数的作用是判断两个数组是否共享内存。如果在索引操作后，结果数组与原始数组共享内存，则说明触发了基本索引；如果不共享内存，则说明触发了高级索引。
# 请注意，这种方法仍然有一定的局限性，特别是在处理大型数组时。为了准确判断索引操作的类型，最好结合对索引操作的具体规则和目的进行分析和判断。
def check_index_type(arr, indices):
    result = arr[indices]
    if np.isscalar(result):
        # np.isscalar 判断指定对象是否为标量值（标量值的含义：标量值是指不具有维度的单个数值，如整数、浮点数、布尔值和字符串等）
        print("触发了基本索引")
    elif  np.may_share_memory(result, arr):
        print("触发了基本索引")
    else:
        print("触发了高级索引")



# arr1 = np.array([1, 2, 3, 4])
# indices1 = [0, 2]
# check_index_type(arr1,indices1) # 触发了高级索引

# arr2 = np.array([[1, 2], [3, 4]])
# indices2 = ([0, 1], [1, 0])
# check_index_type(arr2,indices2) # 触发了高级索引

# arr3 = np.arange(10).reshape(2,5)
# indices3 = (slice(None),slice(None,None,2)) # arr3[:,::2]
# check_index_type(arr3,indices3) # 触发了基本索引

# arr4 = np.arange(10).reshape(2,5)
# indices4 = (slice(None,None,2),[2,1,3,0]) # arr4[::2,[2,1,3,0]]
# print(arr4[::2,[2,1,3,0]]) # [[2 1 3 0]]
# print(arr4[indices4]) # [[2 1 3 0]]
# check_index_type(arr4,indices4) # 触发了高级索引

# -------------------------------------------------------

# arr5 = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# indices5_basic = (0, 1) # arr5[0,5]
# print(arr5[indices5_basic]) # 2 返回一个标量值
# print(arr5[0,1]) # 2 返回一个标量值
# check_index_type(arr5, indices5_basic) # 触发了基本索引



# indices5_advanced = np.array([0, 2]) # arr5[[0,2]]
# print(arr5[indices5_advanced])
# # [[1 2 3]
# #  [7 8 9]]
# print(arr5[[0,2]])
# # [[1 2 3]
# #  [7 8 9]]
# check_index_type(arr5, indices5_advanced)  # 触发了高级索引



# indices5_advanced2 = ([0],[1]) # arr5[[0],[1]]
# indices5_advanced3 = [[0],[1]] # arr5[[[0],[1]]]

# print(arr5[indices5_advanced2]) # [2] 返回一个只包含一个标量值的一维数组
# print(arr5[[0],[1]]) # [2] 返回一个只包含一个标量值的一维数组
# check_index_type(arr5,indices5_advanced2) # 触发了高级索引



# print(arr5[indices5_advanced3])
# # [[[1 2 3]]

# #  [[4 5 6]]]
# print(arr5[[[0],[1]]])
# # [[[1 2 3]]

# #  [[4 5 6]]]
# print(arr5[indices5_advanced3].shape) # (2, 1, 3)



# print(arr5[[[0]]])
# # [[[1 2 3]]]
# print(arr5[[[0]]].shape) # (1, 1, 3)


# print(arr5[[0]])
# # [[1 2 3]]
# print(arr5[[0]].shape) # (1, 3)


# print(arr5[[[[0]]]])
# # [[[[1 2 3]]]]
# print(arr5[[[[0]]]].shape) # (1, 1, 1, 3)


# print(arr5[[[[0]]]])
# # [[[[1 2 3]]]]
# print(arr5[[[[0]]]].shape) # (1, 1, 1, 3)


# print(arr5[[[[0]]],[[[0]]]])
# # [[[1]]]
# print(arr5[[[[0]]],[[[0]]]].shape) # (1, 1, 1)


# print(arr5[[[[0],[0]]]])
# # [[[[1 2 3]]

# #   [[1 2 3]]]]
# print(arr5[[[[0],[0]]]].shape) # (1, 2, 1, 3)


# print(arr5)
# # [[1 2 3]
# #  [4 5 6]
# #  [7 8 9]]
# print(arr5.shape) # (3, 3)




# chatGpt给的其它方法，通过索引对象的类型进行检测
# 反馈：不好用，不准
# testIndices = (slice(None,None,2),[2,1,3,0])
# if isinstance(testIndices, (tuple, list)):
#     if any(isinstance(idx, (np.ndarray, list)) for idx in testIndices):
#         print("触发高级索引")
#     else:
#         print("触发基本索引")
# else:
#     print("触发基本索引")