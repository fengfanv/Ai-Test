const Main = require('./main.js');
var shape = Main.shape;
var size = Main.size;

const Common = require('./common.js');
var printArr = Common.printArr;

const Axis = require('./axis.js');
var get_axis = Axis.get_axis;

const Reshape = require('./reshape.js');
var reshape = Reshape.reshape;

function workData(data, fun) {
    if (typeof data == 'number' || Array.isArray(data)) {
        if (typeof data == 'number') {
            return fun(data)
        } else {
            let newData = JSON.parse(JSON.stringify(data))
            printArr(newData, [], (res) => {
                //重新赋值
                res.childArr[res.childIndex] = fun(res.childArr[res.childIndex]);
            })
            return newData
        }
    } else {
        throw new Error('错误：数据类型不正确')
    }
}

exports.sin = function (data) {
    return workData(data, Math.sin)
}

exports.cos = function (data) {
    return workData(data, Math.cos)
}

exports.tan = function (data) {
    return workData(data, Math.tan)
}

exports.exp = function (data) {
    return workData(data, Math.exp)
}

exports.log = function (data) {
    return workData(data, Math.log)
}

exports.sqrt = function (data) {
    return workData(data, Math.sqrt)
}

exports.ceil = function (data) {
    return workData(data, Math.ceil)
}



exports.sum = function (data, axis) {
    if (typeof data == 'undefined') {
        throw new Error('错误：data不能为空')
    }

    if (Array.isArray(data) || typeof data == 'number') {
        if (typeof data == 'number') data = [data]
    } else {
        throw new Error('错误：data数据类型不正确，sum仅支持Number Or Array')
    }

    if (typeof axis == 'undefined') {
        let sumValue = 0
        printArr(data, [], (res) => {
            sumValue += res.childArr[res.childIndex]
        })
        return sumValue
    } else {
        let axisInfo = get_axis(data, axis)
        let axisArr = axisInfo.axisArr
        for (let i = 0; i < axisArr.length; i++) {
            axisArr[i] = axisArr[i].reduce((prev, cur) => prev + cur)
        }
        let resultShape = axisInfo.resultShape
        let resultData = resultShape.length == 0 ? Number(axisArr) : reshape(axisArr, resultShape)
        return resultData
    }
}

exports.mean = function (data, axis) {
    if (typeof data == 'undefined') {
        throw new Error('错误：data不能为空')
    }

    if (Array.isArray(data) || typeof data == 'number') {
        if (typeof data == 'number' && typeof axis == 'undefined') {
            data = [data]
        } else if (typeof data == 'number' && typeof axis == 'number') {
            throw new Error('error：data不存在轴（axis:' + axis + '）')
        }
    } else {
        throw new Error('错误：data数据类型不正确，sum仅支持Number Or Array')
    }

    if (typeof axis == 'undefined') {
        let sumValue = 0
        let len = size(data)
        printArr(data, [], (res) => {
            sumValue += res.childArr[res.childIndex]
        })
        return sumValue / len
    } else {
        let axisInfo = get_axis(data, axis)
        let axisArr = axisInfo.axisArr
        for (let i = 0; i < axisArr.length; i++) {
            let len = axisArr[i].length
            let sumValue = axisArr[i].reduce((prev, cur) => prev + cur)
            axisArr[i] = sumValue / len
        }
        let resultShape = axisInfo.resultShape
        let resultData = resultShape.length == 0 ? Number(axisArr) : reshape(axisArr, resultShape)
        return resultData
    }
}

exports.round = function (a, decimals) {
    if (typeof a == 'undefined') {
        throw new Error('a不能为空')
    }
    if (typeof decimals == 'undefined') {
        decimals = 0
    }

    function roundWork(value, decimals) {
        if (typeof value != 'number') {
            throw new Error('value必须为数值类型')
        }
        if (decimals >= 0) {
            return Number(value.toFixed(decimals))
        } else {
            let zeros = '';
            for (let i = decimals; i < 0; i++) {
                zeros += 0;
            }
            value = value.toFixed(0);
            let sign = '';
            if (/^[+|-]/.test(value)) {
                sign = value.slice(0, 1)
                value = value.slice(1)
            }
            value = value.slice(0, decimals);
            return Number(sign + value + zeros)
        }
    }

    if (Array.isArray(a)) {
        printArr(a, [], (res) => {
            res.childArr[res.childIndex] = roundWork(res.value, decimals)
        })
        return a;
    } else {
        return roundWork(a, decimals)
    }
}

// console.log(exports.round())

// console.log(exports.round(1))

// console.log(exports.round(1.11))

// console.log(exports.round(1.11,1))

// console.log(exports.round(1.11,5))

// console.log(exports.round(123.321,0))

// console.log(exports.round(123.321,-1))

// console.log(exports.round(123.321,-2))

// console.log(exports.round(123.321,-3))

// console.log(exports.round(123.321,-4))

// console.log(exports.round(-123.321,-4))

// console.log(exports.round(-123.321,-3))

// console.log(exports.round(-123.321,-2))

// console.log(exports.round(-123.321,-1))

// console.log(exports.round(-0.321,-1))

// console.log(exports.round(-0.321,1))

// console.log(exports.round([[1.11,2.22,-3.33]],1))

// console.log(exports.round([[1.11,2.22,-3.33]]))

// console.log(exports.round([[1.11,2.22,-3.33]],-1))

// console.log(exports.round([[11.11,22.22,-33.33]],-1))

function absolute(x) {
    return workData(x, Math.abs)
}
exports.absolute = absolute;
exports.abs = absolute;

// console.log(absolute(-1))

// console.log(absolute(-111.111))

// console.log(absolute(111.111))

// console.log(absolute([111.111,-0.111,-123,-0]))

// console.log(absolute(+1111))