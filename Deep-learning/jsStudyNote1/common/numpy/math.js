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