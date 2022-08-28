# and
# w1*x1 + w2*x2 > theta
print(1*1+1*1>1) # 1  1  true
print(1*0+1*1>1) # 0  1  false
print(1*1+1*0>1) # 1  0  false
print(1*0+1*0>1) # 0  0  false

print('-----------------------')
# not and
# w1*x1 + w2*x2 > theta
print(-1*1+-1*1>-2) # 1  1  false
print(-1*0+-1*1>-2) # 0  1  true
print(-1*1+-1*0>-2) # 1  0  true
print(-1*0+-1*0>-2) # 0  0  true

print('-----------------------')
# or
# w1*x1 + w2*x2 > theta
print(1*1+1*1>0) # 1  1  true
print(1*0+1*1>0) # 0  1  true
print(1*1+1*0>0) # 1  0  true
print(1*0+1*0>0) # 0  0  false

print('-----------------------')

import numpy as np

def AND(x1,x2):
    x = np.array([x1,x2]) #输入值
    w = np.array([1,1])   #权重
    b = -1                #阈值，这里为啥和上面那个and的阈值不一样，这里文章说是为了以后，详细看文章
    tmp = np.sum(w*x) + b
    if tmp > 0:
        return 1
    else:
        return 0

print(AND(1,1))
print(AND(0,1))
print(AND(1,0))
print(AND(0,0))

print('-----------------------')

def NOT_AND(x1,x2):
    x = np.array([x1,x2]) #输入值
    w = np.array([-1,-1]) #权重
    b = 2                 #阈值
    tmp = np.sum(w*x) + b
    if tmp > 0:
        return 1
    else:
        return 0

print(NOT_AND(1,1))
print(NOT_AND(0,1))
print(NOT_AND(1,0))
print(NOT_AND(0,0))

print('-----------------------')

def OR(x1,x2):
    x = np.array([x1,x2]) #输入值
    w = np.array([1,1])   #权重
    b = 0                 #阈值
    tmp = np.sum(w*x) + b
    if tmp > 0:
        return 1
    else:
        return 0

print(OR(1,1))
print(OR(0,1))
print(OR(1,0))
print(OR(0,0))

print('-----------------------')

# exclusive or（异或，1和0输出1、0和0输出0、1和1输出0）
def XOR(x1,x2):
    s1 = NOT_AND(x1,x2)
    s2 = OR(x1,x2)
    y = AND(s1,s2)
    return y

print(XOR(1,1))
print(XOR(0,1))
print(XOR(1,0))
print(XOR(0,0))

 










