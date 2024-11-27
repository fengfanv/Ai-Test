// let a = [
//   0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
//   22, 23,
// ];
// let aShape = [2, 3, 4];

//根据shape形状，将一维数组变成多维数组
function readArrByShape(arr, shape, shapeIndex = 0) {
  if (shape.length - 1 == shapeIndex) {
    return arr;
  }
  let count = arr.length / shape[shapeIndex];
  let result = [];
  for (let i = 0; i < shape[shapeIndex]; i++) {
    let start = i * count;
    let end = start + count;
    result.push(readArrByShape(arr.slice(start, end), shape, shapeIndex + 1));
  }
  return result;
}

// console.log(readArrByShape(a, aShape).length)
// console.log(readArrByShape(a, aShape))
// console.log(readArrByShape(a, [2, 3, 4, 1]))
// console.log(readArrByShape(a, [1, 2, 3, 4, 1]))
// console.log(readArrByShape(a, []))
// console.log(readArrByShape(a, [24, 1]))
// console.log(readArrByShape(a, [24]))

//------------------------------------------------------------
//------------------------------------------------------------
//------------------------------------------------------------
//------------------------------------------------------------

//原始数组是一维数组，但需要根据多维数组的索引坐标，来获取数据值
function computeMultiArr(arr, multiShape, getIndex = []) {
  let start = 0;
  let arrLen = 0;
  for (let i = 0; i < getIndex.length; i++) {
    arrLen = multiShape.slice(i).reduce(function (prev, item, index, arr) {
      return (prev *= item);
    }, 1);
    start += getIndex[i] * (arrLen / multiShape[i]);
  }

  let end = start + 1;

  return arr.slice(start, end)[0];
}

// console.log(readArrByShape(a, aShape))

// console.log(computeMultiArr(a, [2, 3, 4], [0, 0, 0]))
// console.log(readArrByShape(a, aShape)[0][0][0])

// console.log(computeMultiArr(a, [2, 3, 4], [0, 1, 0]))
// console.log(readArrByShape(a, aShape)[0][1][0])

// console.log(computeMultiArr(a, [2, 3, 4], [1, 1, 1]))
// console.log(readArrByShape(a, aShape)[1][1][1])

// console.log(computeMultiArr(a, [2, 3, 4], [1, 2, 1]))
// console.log(readArrByShape(a, aShape)[1][2][1])

// console.log(computeMultiArr(a, [2, 3, 4], [1, 2, 3]))
// console.log(readArrByShape(a, aShape)[1][2][3])

// console.log(computeMultiArr(a, [2, 3, 4], [2, 3, 4])) //返回undefined
// console.log(readArrByShape(a, aShape)[2][3][4]) //报错

// console.log(computeMultiArr(a, [2, 3, 4], [1, 0, 1]))
// console.log(readArrByShape(a, aShape)[1][0][1])

// console.log(computeMultiArr(a, [2, 3, 4], [1, 0, 0]))
// console.log(readArrByShape(a, aShape)[1][0][0])

// console.log(computeMultiArr(a, [2, 3, 4], [0, 1, 1]))
// console.log(readArrByShape(a, aShape)[0][1][1])

// console.log(computeMultiArr(a, [1, 2, 1, 3, 4, 1], [0, 1, 0, 1, 1, 0]));
// console.log(readArrByShape(a, [1, 2, 1, 3, 4, 1])[0][1][0][1][1][0]);

// console.log(computeMultiArr(a, [1, 1, 2, 1, 3, 4, 1], [0, 0, 1, 0, 1, 1, 0]));
// console.log(readArrByShape(a, [1, 1, 2, 1, 3, 4, 1])[0][0][1][0][1][1][0]);