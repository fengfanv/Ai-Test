const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Common = require('./common.js');
var multiply = Common.multiply;

const Main = require('./main.js')
var shape = Main.shape;


function boxMullerTransform(u1, u2) {
    // 将[0,1)均匀分布的随机数转换为(-1,1)  
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    let z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    return [z0, z1]; // 返回两个独立的标准正态分布随机数  
}

function numpyRandomRandn() {
    // 生成两个[0,1)的随机数  
    let u1 = Math.random();
    let u2 = Math.random();
    // 使用Box-Muller变换生成标准正态分布的随机数  
    let [z0] = boxMullerTransform(u1, u2); // 只取第一个值，如果需要多个，可以调用多次或修改boxMullerTransform返回所有值  
    return z0;
}

// // 示例：生成并打印10个标准正态分布的随机数  
// for (let i = 0; i < 10; i++) {
//     console.log(numpyRandomRandn());
// }

function randn() {
    var resultShape = Array.from(arguments)
    if (resultShape.length == 0) {
        return numpyRandomRandn()
    } else {
        for (let i = 0; i < resultShape.length; i++) {
            if (typeof resultShape[i] != 'number' || resultShape[i] != parseInt(resultShape[i]) || resultShape[i] < 0) {
                throw new Error('数据形状必须是由 非负整数 组成')
            }
        }
        let resultLen = multiply(resultShape[0], resultShape, 1)
        let resultData = []
        for (let i = 0; i < resultLen; i++) {
            resultData.push(numpyRandomRandn())
        }
        return resultLen != 0 ? reshape(resultData, resultShape) : []
    }
}
exports.randn = randn;

//获取指定范围内的随机(整)数    注意：返回值包含min,max
function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(a, size) {
    /*
    a必填
    a可以是数字和数组
    a如果是数字，a必须大于0
    a如果是数组，a只能是一维数组，a不能是空数组
    size可不填
    size不填时，返回一个值
    size填时，可以是数字或数组
    size填数字时，必须大于等于0
    size填数字0时，返回空数组
    size填非0数字时，返回长度为size的一维数组
    size填数组时，可以是空数组
    size填空数组时，返回一个值
    size填非空数组时，结果根据(size数组/形状数组)返回一或多维数组
    */
    if (typeof a == 'undefined') {
        throw new Error('a不能为空')
    }
    if (typeof a != 'number' && Array.isArray(a) == false) {
        throw new Error('a只能是 数字 或 数组')
    }
    if (typeof a == 'number' && a <= 0) {
        throw new Error('a是数字，a必须大于0')
    }
    if (Array.isArray(a)) {
        let aShape = shape(a)
        if (aShape.length != 1) {
            throw new Error('a是数组，a必须是一维数组')
        }
        if (aShape.length == 1 && aShape == 0) {
            throw new Error('a是数组，a不能是空数组')
        }
    }
    if (typeof size != 'undefined') {
        if (typeof size != 'number' && Array.isArray(size) == false) {
            throw new Error('size只能是 数字 或 数组')
        }
    }

    if (typeof size == 'undefined') {
        if (Array.isArray(a)) {
            let min = 0;
            let max = a.length - 1;
            return a[getRandomIntInRange(min, max)]
        } else {
            let min = 0;
            let max = a - 1;
            return getRandomIntInRange(min, max)
        }
    } else if (typeof size == 'number') {
        if (size < 0) {
            throw new Error('size不能是负值')
        } else if (size == 0) {
            return []
        } else {
            if (Array.isArray(a)) {
                let min = 0;
                let max = a.length - 1;
                let resultData = [];
                for (let i = 0; i < size; i++) {
                    resultData.push(a[getRandomIntInRange(min, max)])
                }
                return resultData;
            } else {
                let min = 0;
                let max = a - 1;
                let resultData = [];
                for (let i = 0; i < size; i++) {
                    resultData.push(getRandomIntInRange(min, max))
                }
                return resultData;
            }
        }
    } else if (Array.isArray(size)) {
        if (size.length == 0) {
            if (Array.isArray(a)) {
                let min = 0;
                let max = a.length - 1;
                return a[getRandomIntInRange(min, max)]
            } else {
                let min = 0;
                let max = a - 1;
                return getRandomIntInRange(min, max)
            }
        } else {
            if (Array.isArray(a)) {
                let min = 0;
                let max = a.length - 1;
                let resultShape = size;
                let resultData = [];
                let resultLen = multiply(resultShape[0], resultShape, 1)
                for (let i = 0; i < resultLen; i++) {
                    resultData.push(a[getRandomIntInRange(min, max)])
                }
                return resultLen != 0 ? reshape(resultData, resultShape) : [];
            } else {
                let min = 0;
                let max = a - 1;
                let resultShape = size;
                let resultData = [];
                let resultLen = multiply(resultShape[0], resultShape, 1)
                for (let i = 0; i < resultLen; i++) {
                    resultData.push(getRandomIntInRange(min, max))
                }
                return resultLen != 0 ? reshape(resultData, resultShape) : [];
            }
        }
    }
}
exports.choice = choice;

//打乱顺序
function permutation(x) {
    if (typeof x == 'undefined') {
        throw new Error('x不能为空')
    }
    if (typeof x != 'number' && Array.isArray(x) == false) {
        throw new Error('x只能是 数字 或 数组')
    }

    let arr = []
    if (typeof x == 'number') {
        for (let i = 0; i < x; i++) {
            arr.push(i)
        }
    } else {
        arr = x;
    }
    let min = 0;
    let max = arr.length - 1;
    for (let i = 0; i < arr.length; i++) {
        let randomIndex = getRandomIntInRange(min, max);
        let temp = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
}
exports.permutation = permutation;

// console.log(permutation()) //报错，说明是正确的

// console.log(permutation('a')) //报错，说明是正确的

// console.log(permutation(0))

// console.log(permutation(-1))

// console.log(permutation([]))

// console.log(permutation(1))

// console.log(permutation(5))

// console.log(permutation(10))

// console.log(permutation(['a']))

// console.log(permutation(['a', 'b', 'c']))

// console.log(permutation([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12]
// ]))

// console.log(permutation([
//     [
//         [1, 2, 3],
//         [4, 5, 6],
//         [7, 8, 9],
//     ],
//     [
//         [10, 11, 12],
//         [13, 14, 15],
//         [16, 17, 18]
//     ]
// ]))
// [[ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ],[ [ 10, 11, 12 ], [ 13, 14, 15 ], [ 16, 17, 18 ] ]]