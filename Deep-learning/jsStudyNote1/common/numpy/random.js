const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Common = require('./common.js');
var multiply = Common.multiply;


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