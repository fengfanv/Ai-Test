import numpy as np


# a=[False,True,False,True]
# shape (4)

# a=a[:,None]
# [
# 	[False],
# 	[True],
# 	[False],
# 	[True]
# ]
# shape (4,1)

#--------------------------------------
# 广播演示
#--------------------------------------

# a=[
# 	[False],
# 	[True],
# 	[False],
# 	[True]
# ]
# shape (4,1)

# b=[0,2]
# shape (2)

#--------------------------------------

# a=[
# 	[False,False],
# 	[True,True],
# 	[False,False],
# 	[True,True]
# ]
# shape (4,2)

# b=[0,2]
# shape (2)

#--------------------------------------

# a=[
# 	[False,False],
# 	[True,True],
# 	[False,False],
# 	[True,True]
# ]
# shape (4,2)

# b=[[0,2]]
# shape (1,2)

#--------------------------------------

# a=[
# 	[False,False],
# 	[True,True],
# 	[False,False],
# 	[True,True]
# ]
# shape (4,2)

# b=[
# 	[0,2],
# 	[0,2],
# 	[0,2],
# 	[0,2]
# ]
# shape (4,2)

#--------------------------------------

# a+b
# [
# 	[0,2],
# 	[1,3],
# 	[0,2],
# 	[1,3]
# ]