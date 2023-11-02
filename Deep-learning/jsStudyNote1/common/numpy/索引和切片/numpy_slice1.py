import numpy as np


x = np.arange(5)
print(x)
# array([0, 1, 2, 3, 4])


print(x[None,:])
# array([[0, 1, 2, 3, 4]])
print(x[None,:].shape)
# (1, 5)


print(x[:,None])
# array([[0],
#        [1],
#        [2],
#        [3],
#        [4]])
print(x[:,None].shape)
# (5, 1)
