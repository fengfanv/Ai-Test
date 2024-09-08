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