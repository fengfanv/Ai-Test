# NumPy by JavaScript

### numpy.shape(arr)
```javascript
const numpy = require('./index.js')

let arr = numpy.arange(1*2*3*4)
arr = numpy.reshape(arr,[1,2,3,4])
let arr_shape = numpy.shape(arr)
console.log(arr_shape) //[1,2,3,4]
```
```python
import numpy

arr = numpy.arange(1*2*3*4)
arr = numpy.reshape(arr,[1,2,3,4])
arr_shape = numpy.shape(arr)
print(arr_shape) #(1, 2, 3, 4)
```

### numpy.ndim(arr)
```javascript
const numpy = require('./index.js')

let arr = numpy.arange(1*2*3*4)
arr = numpy.reshape(arr,[1,2,3,4])
let arr_ndim = numpy.ndim(arr)
console.log(arr_ndim) //4
```
```python
import numpy

arr = numpy.arange(1*2*3*4)
arr = numpy.reshape(arr,[1,2,3,4])
arr_ndim = numpy.ndim(arr)
print(arr_ndim) #4
```

### numpy.size(arr)
```javascript
const numpy = require('./index.js')

let arr = numpy.arange(1*2*3*4)
arr = numpy.reshape(arr,[1,2,3,4])
let arr_size = numpy.size(arr)
console.log(arr_size) //24
```
```python
import numpy

arr = numpy.arange(1*2*3*4)
arr = numpy.reshape(arr,[1,2,3,4])
arr_size = numpy.size(arr)
print(arr_size) #24
```

### numpy.arange(start,stop,step)
```javascript
const numpy = require('./index.js')

let arr1 = numpy.arange(10)
console.log(arr1) //[0,1,2,3,4,5,6,7,8,9]

let arr2 = numpy.arange(0,10)
console.log(arr2) //[0,1,2,3,4,5,6,7,8,9]

let arr3 = numpy.arange(0,10,2)
console.log(arr3) //[0,2,4,6,8]
```
```python
import numpy

arr1 = numpy.arange(10)
print(arr1) #[0 1 2 3 4 5 6 7 8 9]

arr2 = numpy.arange(0,10)
print(arr2) #[0 1 2 3 4 5 6 7 8 9]

arr3 = numpy.arange(0,10,2)
print(arr3) #[0 2 4 6 8]
```

### numpy.reshape(arr,newShape,order)
```javascript
const numpy = require('./index.js')

let arr = numpy.arange(1*2*3*4)
console.log(numpy.toStr(arr))
//[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
arr = numpy.reshape(arr,[1,2,3,4])
console.log(numpy.toStr(arr))
// [
//     [
//       [
//         [0,1,2,3],
//         [4,5,6,7],
//         [8,9,10,11]
//       ],
//       [
//         [12,13,14,15],
//         [16,17,18,19],
//         [20,21,22,23]
//       ]
//     ]
// ]
```
```python
import numpy

arr = numpy.arange(1*2*3*4)
print(arr)
# [ 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23]
arr = numpy.reshape(arr,[1,2,3,4])
print(arr)
# [[[[ 0  1  2  3]
#    [ 4  5  6  7]
#    [ 8  9 10 11]]

#   [[12 13 14 15]
#    [16 17 18 19]
#    [20 21 22 23]]]]
```

### numpy.transpose(arr,axes)
```javascript
const numpy = require('./index.js')

let arr = numpy.arange(2*3)
arr = numpy.reshape(arr,[2,3])
console.log(numpy.toStr(arr))
// [
//     [0,1,2],
//     [3,4,5]
// ]
arr = numpy.transpose(arr,[1,0])
console.log(numpy.toStr(arr))
// [
//     [0,3],
//     [1,4],
//     [2,5]
// ]
```
```python
import numpy

arr = numpy.arange(2*3)
arr = numpy.reshape(arr,[2,3])
print(arr)
# [[0 1 2]
#  [3 4 5]]
arr = numpy.transpose(arr,[1,0])
print(arr)
# [[0 3]
#  [1 4]
#  [2 5]]
```

### numpy.dot(a,b)
```javascript
const numpy = require('./index.js')

let a = numpy.reshape(numpy.arange(3*4),[3,4])
console.log(numpy.toStr(a))
// [
//     [0,1,2,3],
//     [4,5,6,7],
//     [8,9,10,11]
// ]
let b = numpy.reshape(numpy.arange(4*5),[4,5])
console.log(numpy.toStr(b))
// [
//     [0,1,2,3,4],
//     [5,6,7,8,9],
//     [10,11,12,13,14],
//     [15,16,17,18,19]
// ]
console.log(numpy.toStr(numpy.dot(a,b)))
// [
//     [70,76,82,88,94],
//     [190,212,234,256,278],
//     [310,348,386,424,462]
// ]
```
```python
import numpy

a = numpy.reshape(numpy.arange(3*4),[3,4])
print(a)
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]
b = numpy.reshape(numpy.arange(4*5),[4,5])
print(b)
# [[ 0  1  2  3  4]
#  [ 5  6  7  8  9]
#  [10 11 12 13 14]
#  [15 16 17 18 19]]
print(numpy.dot(a,b))
# [[ 70  76  82  88  94]
#  [190 212 234 256 278]
#  [310 348 386 424 462]]
```

### numpy.sin(x)
### numpy.cos(x)
### numpy.tan(x)
### numpy.exp(x)
### numpy.log(x)
### numpy.sqrt(x)
### numpy.ceil(x)
```javascript
const numpy = require('./index.js')

let x = numpy.arange(3)
console.log(numpy.sin(x)) //[ 0, 0.8414709848078965, 0.9092974268256817 ]
console.log(numpy.cos(x)) //[ 1, 0.5403023058681398, -0.4161468365471424 ]
console.log(numpy.tan(x)) //[ 0, 1.5574077246549023, -2.185039863261519 ]
console.log(numpy.exp(x)) //[ 1, 2.718281828459045, 7.38905609893065 ]
console.log(numpy.log(x)) //[ -Infinity, 0, 0.6931471805599453 ]
console.log(numpy.sqrt(x)) //[ 0, 1, 1.4142135623730951 ]
console.log(numpy.ceil(x)) //[ 0, 1, 2 ]
```
```python
import numpy

x = numpy.arange(3)
print(numpy.sin(x)) #[0.     0.84147098 0.90929743]
print(numpy.cos(x)) #[1.     0.54030231 -0.41614684]
print(numpy.tan(x)) #[0.     1.55740772 -2.18503986]
print(numpy.exp(x)) #[1.     2.71828183 7.3890561 ]
print(numpy.log(x)) #[-inf   0.         0.69314718]
print(numpy.sqrt(x)) #[0.    1.         1.41421356]
print(numpy.ceil(x)) #[0.    1.         2.]
```

### numpy.sum(a,axis)
### numpy.mean(a,axis)
```javascript
const numpy = require('./index.js')

let a = numpy.reshape(numpy.arange(3*4),[3,4])
console.log(numpy.sum(a)) //66
console.log(numpy.toStr(numpy.sum(a,1))) //[6,22,38]

console.log(numpy.mean(a)) //5.5
console.log(numpy.toStr(numpy.mean(a,1))) //[1.5,5.5,9.5]
```
```python
import numpy

a = numpy.reshape(numpy.arange(3*4),[3,4])
print(numpy.sum(a)) #66
print(numpy.sum(a,axis=1)) #[ 6 22 38]

print(numpy.mean(a)) #5.5
print(numpy.mean(a,axis=1)) #[1.5 5.5 9.5]
```

### numpy.zeros(shape)
### numpy.ones(shape)
```javascript
const numpy = require("./index.js");

let a = numpy.zeros(5);
let b = numpy.zeros([1, 2, 3]);
console.log(numpy.toStr(a));
// [0,0,0,0,0]
console.log(numpy.toStr(b));
// [
//     [
//       [0,0,0],
//       [0,0,0]
//     ]
// ]

let c = numpy.ones(5);
let d = numpy.ones([1, 2, 3]);
console.log(numpy.toStr(c));
// [1,1,1,1,1]
console.log(numpy.toStr(d));
// [
//     [
//       [1,1,1],
//       [1,1,1]
//     ]
// ]
```
```python
import numpy

a = numpy.zeros(5)
b = numpy.zeros([1, 2, 3])
print(a)
# [0. 0. 0. 0. 0.]
print(b)
# [[[0. 0. 0.]
#   [0. 0. 0.]]

c = numpy.ones(5)
d = numpy.ones([1, 2, 3])
print(c)
# [1. 1. 1. 1. 1.]
print(d)
# [[[1. 1. 1.]
#   [1. 1. 1.]]]
```

### numpy.flatten(arr,order)
```javascript
const numpy = require("./index.js");

let a = numpy.reshape(numpy.arange(3 * 4), [3, 4]);
console.log(numpy.toStr(a));
// [
//     [0,1,2,3],
//     [4,5,6,7],
//     [8,9,10,11]
// ]
console.log(numpy.toStr(numpy.flatten(a)));
// [0,1,2,3,4,5,6,7,8,9,10,11]
console.log(numpy.toStr(numpy.flatten(a,'F')));
// [0,4,8,1,5,9,2,6,10,3,7,11]
```
```python
import numpy

a = numpy.reshape(numpy.arange(3 * 4), [3, 4])
print(a)
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]
print(a.flatten())
# [ 0  1  2  3  4  5  6  7  8  9 10 11]
print(a.flatten('F'))
# [ 0  4  8  1  5  9  2  6 10  3  7 11]
```

### numpy.zeros_like(arr)
```javascript
const numpy = require("./index.js");

let a = numpy.reshape(numpy.arange(3 * 4), [3, 4]);
console.log(numpy.toStr(a));
// [
//     [0,1,2,3],
//     [4,5,6,7],
//     [8,9,10,11]
// ]

let b = numpy.zeros_like(a);
console.log(numpy.toStr(b));
// [
//     [0,0,0,0],
//     [0,0,0,0],
//     [0,0,0,0]
// ]
```
```python
import numpy

a = numpy.reshape(numpy.arange(3 * 4), [3, 4])
print(a)
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]

b = numpy.zeros_like(a)
print(b)
# [[0 0 0 0]
#  [0 0 0 0]
#  [0 0 0 0]]
```

### numpy.max(arr,axis)
### numpy.min(arr,axis)
```javascript
const numpy = require("./index.js");

let a = [
  [1, 2, 3],
  [5, 4, 3],
  [10, 9, 1],
];

console.log(numpy.toStr(numpy.max(a)));
// 10
console.log(numpy.toStr(numpy.max(a,1)));
// [3,5,10]
```
```python
import numpy

a = numpy.array([
    [1, 2, 3],
    [5, 4, 3],
    [10, 9, 1],
])

print(numpy.max(a))
# 10
print(numpy.max(a, 1))
# [ 3  5 10]
```

### numpy.argmax(arr,axis)
### numpy.argmin(arr,axis)
```javascript
const numpy = require("./index.js");

let a = [
  [1, 2, 3],
  [5, 4, 3],
  [10, 9, 1],
];

console.log(numpy.toStr(numpy.argmax(a)));
// 6
console.log(numpy.toStr(numpy.argmax(a,1)));
// [2,0,0]
```
```python
import numpy

a = numpy.array([
    [1, 2, 3],
    [5, 4, 3],
    [10, 9, 1],
])

print(numpy.argmax(a))
# 6
print(numpy.argmax(a, 1))
# [2,0,0]
```

### numpy.maximum(a,b)
```javascript
const numpy = require("./index.js");

console.log(numpy.toStr(numpy.maximum(2, 1)))
// 2
console.log(numpy.toStr(numpy.maximum([1,2,11,4], 10)))
// [10,10,11,10]
console.log(numpy.toStr(numpy.maximum([1,2,11,4], [10])))
// [10,10,11,10]
```
```python
import numpy

print(numpy.maximum(2, 1))
# 2
print(numpy.maximum([1, 2, 11, 4], 10))
# [10 10 11 10]
print(numpy.maximum([1, 2, 11, 4], [10]))
# [10 10 11 10]
```

### numpy.random.randn(d0, d1, ..., dn)
```javascript
const numpy = require("./index.js");

console.log(numpy.toStr(numpy.random.randn()))
// 0.36214563073814754
console.log(numpy.toStr(numpy.random.randn(1,2,3)))
// [
//     [
//       [-1.1782313726062799,0.7071542344087857,-0.5778126375190688],
//       [1.1659309631766612,-1.2866387739582035,0.327526900061]
//     ]
// ]
```
```python
import numpy

print(numpy.random.randn())
# 1.6641143483011311
print((numpy.random.randn(1,2,3)))
# [[[ 0.19958591  0.97007204  1.88118758]
#   [ 0.29513353 -1.22128281  1.34142687]]]
```

### numpy.random.choice(a, size)
```javascript
const numpy = require("./index.js");

console.log(numpy.toStr(numpy.random.choice(10)));
// 1
console.log(numpy.toStr(numpy.random.choice(10, 5)));
// [5,7,7,5,7]
console.log(numpy.toStr(numpy.random.choice(10, [1, 2, 3])));
// [
//     [
//       [0,1,9],
//       [7,3,9]
//     ]
// ]
console.log(numpy.toStr(numpy.random.choice([1, 2, 3, 4, 5])));
// 3
console.log(numpy.toStr(numpy.random.choice([1, 2, 3, 4, 5], 5)));
// [5,3,5,4,3]
console.log(numpy.toStr(numpy.random.choice([1, 2, 3, 4, 5], [1, 2, 3])));
// [
//     [
//       [3,3,2],
//       [4,4,2]
//     ]
// ]
```
```python
import numpy

print(numpy.random.choice(10))
# 1
print(numpy.random.choice(10, 5))
# [7 4 9 7 2]
print(numpy.random.choice(10, [1, 2, 3]))
# [[[7 3 7]
#   [4 6 7]]]
print(numpy.random.choice([1, 2, 3, 4, 5]))
# 5
print(numpy.random.choice([1, 2, 3, 4, 5], 5))
# [1 3 1 3 4]
print(numpy.random.choice([1, 2, 3, 4, 5], [1, 2, 3]))
# [[[4 4 2]
#   [4 2 3]]]
```

### numpy.random.permutation(x)
```javascript
const numpy = require("./index.js");

console.log(numpy.toStr(numpy.random.permutation(5)));
// [4,0,3,1,2]
console.log(numpy.toStr(numpy.random.permutation([1, 2, 3, 4, 5])));
// [4,3,2,1,5]
```
```python
import numpy

print(numpy.random.permutation(5))
# [2 0 3 4 1]
print(numpy.random.permutation([1, 2, 3, 4, 5]))
# [5 1 2 4 3]
```

### numpy.random.uniform(low,high,size)
```javascript
const numpy = require("./index.js");

console.log(numpy.toStr(numpy.random.uniform()));
// 0.8654126748143676
console.log(numpy.toStr(numpy.random.uniform(100, 101)));
// 100.70562566513964
console.log(numpy.toStr(numpy.random.uniform(100, 101, 3)));
// [100.46896323365479,100.54503683886551,100.58726744626824]
console.log(numpy.toStr(numpy.random.uniform(100, 101, [1, 2, 3])));
// [
//     [
//       [100.09329369216205,100.89637791603212,100.30915292992678],
//       [100.98348978981092,100.19238001381531,100.26201433404839]
//     ]
// ]
console.log(numpy.toStr(numpy.random.uniform([1, 100, 200], [2, 110, 210])));
// [1.8864104491137972,109.33540945238532,200.01754289678044]
console.log(numpy.toStr(numpy.random.uniform([1, 100, 200], [2, 110, 210],3)));
// [1.4707759608108086,101.97247564621236,209.54265683279922]
console.log(numpy.toStr(numpy.random.uniform([1, 100, 200], [2, 110, 210], [1, 2, 3])));
// [
//     [
//       [1.698363875942229,104.9417361219943,209.67646626730178],
//       [1.07242066960308,108.74254850180944,209.13078325325654]
//     ]
// ]
```
```python
import numpy

print(numpy.random.uniform())
# 0.4532641501555551
print(numpy.random.uniform(100, 101))
# 100.62627735455004
print(numpy.random.uniform(100, 101, 3))
# [100.7774758  100.28386821 100.90222922]
print(numpy.random.uniform(100, 101, [1, 2, 3]))
# [[[100.71109263 100.87286024 100.14629362]
#   [100.00338807 100.9829967  100.68245521]]]
print(numpy.random.uniform([1, 100, 200], [2, 110, 210]))
# [  1.94865603 109.76323567 207.46485462]
print(numpy.random.uniform([1, 100, 200], [2, 110, 210],3))
# [  1.14407352 102.37301141 209.13729522]
print(numpy.random.uniform([1, 100, 200], [2, 110, 210], [1, 2, 3]))
# [[[  1.13732892 109.32778065 202.02413302]
#   [  1.38331407 104.79863322 203.7024118 ]]]
```

### numpy.random.rand(d0, d1, ..., dn)
```javascript
const numpy = require("./index.js");

console.log(numpy.toStr(numpy.random.rand()))
// 0.881269956483558
console.log(numpy.toStr(numpy.random.rand(1,2,3)))
// [
//     [
//       [0.23584731370259315,0.11933431190535004,0.2602533551165278],
//       [0.9062710646867926,0.8096882579147295,0.9007646748183027]
//     ]
// ]
```
```python
import numpy

print(numpy.random.rand())
# 0.14222642615903713
print(numpy.random.rand(1,2,3))
# [[[0.94147089 0.09446314 0.08295031]
#   [0.25178034 0.86243991 0.45641261]]]
```

### numpy.pad(arr, pad_width, mode='constant', constant_values)
```javascript
const numpy = require("./index.js");

console.log(numpy.toStr(numpy.pad([1],1)))
// [0,1,0]
console.log(numpy.toStr(numpy.pad([1],[2,1])))
// [0,0,1,0]
console.log(numpy.toStr(numpy.pad([1],[2,1],'constant',3)))
// [3,3,1,3]
console.log(numpy.toStr(numpy.pad([1],[2,1],'constant',[3,4])))
// [3,3,1,4]
console.log(numpy.toStr(numpy.pad([[1]],[[1,2],[3,1]],'constant',[[2, 3],[5,6]])))
// [
//     [5,5,5,2,6],
//     [5,5,5,1,6],
//     [5,5,5,3,6],
//     [5,5,5,3,6]
// ]
```
```python
import numpy

print(numpy.pad([1],1))
# [0 1 0]
print(numpy.pad([1],[2,1]))
# [0 0 1 0]
print(numpy.pad([1],[2,1],mode='constant',constant_values=3))
# [3 3 1 3]
print(numpy.pad([1],[2,1],mode='constant',constant_values=[3,4]))
# [3 3 1 4]
print(numpy.pad([[1]],[[1,2],[3,1]],mode='constant',constant_values=[[2, 3],[5,6]]))
# [[5 5 5 2 6]
#  [5 5 5 1 6]
#  [5 5 5 3 6]
#  [5 5 5 3 6]]
```

### numpy.nditer(arr,callback)
```javascript
const numpy = require("./index.js");

let a = numpy.reshape(numpy.arange(3 * 4), [3, 4]);
console.log(numpy.toStr(a));
// [
//     [0,1,2,3],
//     [4,5,6,7],
//     [8,9,10,11]
// ]

numpy.nditer(a, (res) => {
  //打印矩阵里的每一个元素
  console.log(res.index, res.value);
  //重新赋值
  res.childArr[res.childIndex] = 100 + res.value;
});

console.log(numpy.toStr(a));
// [
//     [100,101,102,103],
//     [104,105,106,107],
//     [108,109,110,111]
// ]
```
```python
import numpy

a = numpy.reshape(numpy.arange(3 * 4), [3, 4])
print(a)
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]]

for item in numpy.nditer(a, flags=['multi_index'], op_flags=['readwrite']):
    print(item)
    item += 100

print(a)
# [[100 101 102 103]
#  [104 105 106 107]
#  [108 109 110 111]]
```

### numpy.meshgrid(x1, x2, …, xn)
```javascript
const numpy = require("./index.js");

console.log(numpy.toStr(numpy.meshgrid([1,2,3],[3,2,1])));
// [
//     [
//       [1,2,3],
//       [1,2,3],
//       [1,2,3]
//     ],
//     [
//       [3,3,3],
//       [2,2,2],
//       [1,1,1]
//     ]
// ]
```
```python
import numpy

print(numpy.meshgrid([1,2,3],[3,2,1]))
# (
#     array([[1, 2, 3],
#        [1, 2, 3],
#        [1, 2, 3]]), 
#     array([[3, 3, 3],
#        [2, 2, 2],
#        [1, 1, 1]]))
```

### numpy.logspace(start, stop, num, base)
```javascript
const numpy = require("./index.js");

console.log(numpy.toStr(numpy.logspace(2, 3, 4)));
// [100,215.44346900318845,464.15888336127773,1000]
console.log(numpy.toStr(numpy.logspace(2, 3, 4, 2)));
// [4,5.039684199579494,6.3496042078727974,8]
console.log(numpy.toStr(numpy.logspace(0, 9, 10, 2)));
// [1,2,4,8,16,32,64,128,256,512]
```
```python
import numpy

print(numpy.logspace(2, 3,  num=4))
# [ 100.          215.443469    464.15888336 1000.        ]
print(numpy.logspace(2, 3, num=4, base=2))
# [4.         5.0396842  6.34960421 8.        ]
print(numpy.logspace(0, 9, num=10, base=2))
# [  1.   2.   4.   8.  16.  32.  64. 128. 256. 512.]
```

### numpy.indexing(arr, indexingTuple, value)
```javascript
const { slice, Ellipsis, None, newaxis, True, False, indexing } = require('./index.js');
const numpy = require('./index.js');

let ar = numpy.reshape(numpy.arange(4*4),[4,4])
console.log(numpy.toStr(ar))
// [
//     [0,1,2,3],
//     [4,5,6,7],
//     [8,9,10,11],
//     [12,13,14,15]
// ]

console.log(numpy.toStr(indexing(ar,[2])))
// [8,9,10,11]
console.log(numpy.toStr(indexing(ar,[-1])))
// [12,13,14,15]
console.log(numpy.toStr(indexing(ar,[slice(1,3)])))
// [
//     [4,5,6,7],
//     [8,9,10,11]
// ]
console.log(numpy.toStr(indexing(ar,[slice(None,None,2)])))
// [
//     [0,1,2,3],
//     [8,9,10,11]
// ]
console.log(numpy.toStr(indexing(ar,[slice(None,None,None),None])))
// [
//     [
//       [0,1,2,3]
//     ],
//     [
//       [4,5,6,7]
//     ],
//     [
//       [8,9,10,11]
//     ],
//     [
//       [12,13,14,15]
//     ]
// ]
console.log(numpy.toStr(indexing(ar,[2,2])))
// 10
console.log(numpy.toStr(indexing(ar,[Ellipsis,0])))
// [0,4,8,12]
console.log(numpy.toStr(indexing(ar,[Ellipsis,slice(0,2)])))
// [
//     [0,1],
//     [4,5],
//     [8,9],
//     [12,13]
// ]
//-------------------------------------
console.log(numpy.toStr(indexing(ar,[[0,1,2],[0,1,2]])))
// [0,5,10]
console.log(numpy.toStr(indexing(ar,[[False,False,False,True]])))
// [
//     [12,13,14,15]
// ]
console.log(numpy.toStr(indexing(ar,[[1,0],[True,False,True,False]])))
// [4,2]
//-------------------------------------
console.log(numpy.toStr(indexing(ar,[[1,1],slice(1,2),Ellipsis])))
// [
//     [5],
//     [5]
// ]
//-------------------------------------
indexing(ar,[[0,1,2],[0,1,2]],1000)
console.log(numpy.toStr(ar))
// [
//     [1000,1,2,3],
//     [4,1000,6,7],
//     [8,9,1000,11],
//     [12,13,14,15]
// ]
indexing(ar,[[0,1,2],[0,3,1]],[100])
console.log(numpy.toStr(ar))
// [
//     [100,1,2,3],
//     [4,1000,6,100],
//     [8,100,1000,11],
//     [12,13,14,15]
// ]
```
```python
import numpy

ar = numpy.reshape(numpy.arange(4*4),[4,4])
print(ar)
# [[ 0  1  2  3]
#  [ 4  5  6  7]
#  [ 8  9 10 11]
#  [12 13 14 15]]

print(ar[2])
# [ 8  9 10 11]
print(ar[-1])
# [12 13 14 15]
print(ar[slice(1,3)])
# [[ 4  5  6  7]
#  [ 8  9 10 11]]
print(ar[slice(None,None,2)])
# [[ 0  1  2  3]
#  [ 8  9 10 11]]
print(ar[slice(None,None,None),None])
# [[[ 0  1  2  3]]

#  [[ 4  5  6  7]]

#  [[ 8  9 10 11]]

#  [[12 13 14 15]]]
print(ar[2,2])
# 10
print(ar[Ellipsis,0])
# [ 0  4  8 12]
print(ar[Ellipsis,slice(0,2)])
# [[ 0  1]
#  [ 4  5]
#  [ 8  9]
#  [12 13]]
#-------------------------------------
print(ar[[0,1,2],[0,1,2]])
# [ 0  5 10]
print(ar[[False,False,False,True]])
# [[12 13 14 15]]
print(ar[[1,0],[True,False,True,False]])
# [4 2]
#-------------------------------------
print(ar[[1,1],slice(1,2),Ellipsis])
# [[5]
#  [5]]
#-------------------------------------
ar[[0,1,2],[0,1,2]] = 1000
print(ar)
# [[1000    1    2    3]
#  [   4 1000    6    7]
#  [   8    9 1000   11]
#  [  12   13   14   15]]
ar[[0,1,2],[0,3,1]] = [100]
print(ar)
# [[ 100    1    2    3]
#  [   4 1000    6  100]
#  [   8  100 1000   11]
#  [  12   13   14   15]]
```

### numpy.expr(a, operator, b)
```javascript
const numpy = require("./index.js");

console.log(numpy.expr(1, ">", 11));
// { name: 'False', toString: [Function: toString] }
console.log(numpy.toStr(numpy.expr([1, 12, 4], "<", 10)));
// [true,false,true]
console.log(numpy.toStr(numpy.expr([1, 12, 4], ">", [11, 20, 3])));
// [false,false,true]
//---------------------------------------------------
console.log(numpy.toStr(numpy.expr(11, "-", 10)));
// 1
console.log(numpy.toStr(numpy.expr([1.2222, 2, 3], "+", 10.1111)));
// [11.333300000000001,12.1111,13.1111]
console.log(numpy.toStr(numpy.expr([1, 12, 4], "+", [11, 20, 3])));
// [12,32,7]
```
```python
import numpy

print(1 > 11)
# False
print(numpy.array([1, 12, 4]) < 10)
# [ True False  True]
print(numpy.array([1, 12, 4]) > numpy.array([11, 20, 3]))
# [False False  True]
#---------------------------------------------------
print(11 - 10)
# 1
print(numpy.array([1.2222, 2, 3]) + 10.1111)
# [11.3333 12.1111 13.1111]
print(numpy.array([1, 12, 4]) + numpy.array([11, 20, 3]))
# [12 32  7]
```