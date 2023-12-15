import numpy as np

b = np.arange(1*2*3*4*5*6*7).reshape(1,2,3,4,5,6,7)
# array([[[[[[[   0,    1,    2, ...,    4,    5,    6],
#             [   7,    8,    9, ...,   11,   12,   13],
#             [  14,   15,   16, ...,   18,   19,   20],
#             [  21,   22,   23, ...,   25,   26,   27],
#             [  28,   29,   30, ...,   32,   33,   34],
#             [  35,   36,   37, ...,   39,   40,   41]],
#             ...
#             ...
#             ...
#             [[4998, 4999, 5000, ..., 5002, 5003, 5004],
#             [5005, 5006, 5007, ..., 5009, 5010, 5011],
#             [5012, 5013, 5014, ..., 5016, 5017, 5018],
#             [5019, 5020, 5021, ..., 5023, 5024, 5025],
#             [5026, 5027, 5028, ..., 5030, 5031, 5032],
#             [5033, 5034, 5035, ..., 5037, 5038, 5039]]]]]]])

print(b[...,[1,2],...])
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# IndexError: an index can only have a single ellipsis ('...')

print(b[...,...,[1,2]])
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# IndexError: an index can only have a single ellipsis ('...')