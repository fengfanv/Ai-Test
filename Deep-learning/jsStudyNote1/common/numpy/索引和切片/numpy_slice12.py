import numpy as np

x = np.arange(1, 7).reshape(2, 3)
print(x)
# [[1 2 3]
#  [4 5 6]]

print(x.flat[3]) # 4

x.flat[3] = 10
print(x)
# [[ 1  2  3]
#  [10  5  6]]

x.flat[[1,4]] = 1
print(x)
# [[ 1  1  3]
#  [10  1  6]]

print(x.flat[slice(2,4)]) # [ 3 10]

print(list(x.flat)) # [1, 1, 3, 10, 1, 6]

for item in x.flat:
    print(item)

# 1
# 1
# 3
# 10
# 1
# 6