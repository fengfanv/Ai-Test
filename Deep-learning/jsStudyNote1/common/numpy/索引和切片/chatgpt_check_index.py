import numpy as np

# # 基本索引示例
# arr1 = np.array([1, 2, 3, 4])
# indices1 = [0, 2]
# print(arr1[indices1])  # 不会触发高级索引

# # 高级索引示例
# arr2 = np.array([[1, 2], [3, 4]])
# indices2 = ([0, 1], [1, 0])
# print(arr2[indices2])  # 触发高级索引

# # 判断基本索引和高级索引
# indices3 = (np.array([0, 1]), slice(None))
# indices4 = (0, [0, 1])
# if isinstance(indices3, (tuple, list)):
#     if any(isinstance(idx, (np.ndarray, list)) for idx in indices3):
#         print("触发高级索引")
#     else:
#         print("触发基本索引")
# else:
#     print("触发基本索引")

# if isinstance(indices4, (tuple, list)):
#     if any(isinstance(idx, (np.ndarray, list)) for idx in indices4):
#         print("触发高级索引")
#     else:
#         print("触发基本索引")
# else:
#     print("触发基本索引")


# testArray = np.arange(10).reshape(2,5)
testIndices = (slice(None),slice(None,None,2))

if isinstance(testIndices, (tuple, list)):
    if any(isinstance(idx, (np.ndarray, list)) for idx in testIndices):
        print("触发高级索引")
    else:
        print("触发基本索引")
else:
    print("触发基本索引")