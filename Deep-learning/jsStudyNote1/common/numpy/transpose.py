import numpy as np

a = np.array([
    [1,2,3],
    [4,5,6]
])

print(a.transpose(0,1))
'''
[[1 2 3]
 [4 5 6]]
'''
print(a.transpose(1,0))
'''
[[1 4]
 [2 5]
 [3 6]]
'''