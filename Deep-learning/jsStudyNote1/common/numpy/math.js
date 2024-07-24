const Main = require('./main.js');
var shape = Main.shape;

const Common = require('./common.js');
var printArr = Common.printArr;

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