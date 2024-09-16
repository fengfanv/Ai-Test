const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Transpose = require('./transpose.js')
var transpose = Transpose.transpose;

const Axis = require('./axis.js')
var get_axis = Axis.get_axis;

const Broadcast = require('./broadcast.js')
var broadcast = Broadcast.broadcast;
var broadcastToShape = Broadcast.broadcastToShape;

const Main = require('./main.js')
var shape = Main.shape;
var arange = Main.arange;

const printTest = require('./print_test.js')
var toStr = printTest.toStr;

const Common = require('./common.js');
var multiply = Common.multiply;

function flatten(arr, order) {
    if (typeof order == 'undefined') {
        order = 'C'
    }
    order = order.toUpperCase()
    if (['C', 'F'].indexOf(order) == -1) {
        throw new Error('order必须是 C 或 F 其中之一')
    }
    if (order == 'C') {
        //C(行)顺序
        return reshape(arr, [-1])
    } else {
        //F(列)顺序
        return reshape(transpose(arr), [-1])
    }
}
exports.flatten = flatten;

function getMax(arr) {
    let index = 0;
    let item = arr[index];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].value > item.value) {
            index = i;
            item = arr[i];
        }
    }
    return {
        index,
        item
    }
}

function getMin(arr) {
    let index = 0;
    let item = arr[index];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].value < item.value) {
            index = i;
            item = arr[i];
        }
    }
    return {
        index,
        item
    }
}

function max(arr, axis) {
    if (typeof arr == 'undefined') {
        throw new Error('错误：arr不能为空')
    }

    if (Array.isArray(arr) || typeof arr == 'number') {
        if (typeof arr == 'number') arr = [arr]
    } else {
        throw new Error('错误：arr数据类型不正确，sum仅支持Number Or Array')
    }

    if (typeof axis == 'undefined') {
        let f_arr = flatten(arr);
        let index = 0;
        for (let i = 0; i < f_arr.length; i++) {
            if (f_arr[i] > f_arr[index]) {
                index = i;
            }
        }
        return f_arr[index]
    } else {
        let axisInfo = get_axis(arr, axis)
        let axisArr = axisInfo.axisArr2
        for (let i = 0; i < axisArr.length; i++) {
            axisArr[i] = getMax(axisArr[i]).item.value
        }
        let resultShape = axisInfo.resultShape
        let resultData = resultShape.length == 0 ? Number(axisArr) : reshape(axisArr, resultShape)
        return resultData
    }
}
exports.max = max;

function argmax(arr, axis) {
    if (typeof arr == 'undefined') {
        throw new Error('错误：arr不能为空')
    }

    if (Array.isArray(arr) || typeof arr == 'number') {
        if (typeof arr == 'number') arr = [arr]
    } else {
        throw new Error('错误：arr数据类型不正确，sum仅支持Number Or Array')
    }

    if (typeof axis == 'undefined') {
        let f_arr = flatten(arr);
        let index = 0;
        for (let i = 0; i < f_arr.length; i++) {
            if (f_arr[i] > f_arr[index]) {
                index = i;
            }
        }
        return index
    } else {
        let axisInfo = get_axis(arr, axis)
        let axisArr = axisInfo.axisArr2
        for (let i = 0; i < axisArr.length; i++) {
            axisArr[i] = getMax(axisArr[i]).index
        }
        let resultShape = axisInfo.resultShape
        let resultData = resultShape.length == 0 ? Number(axisArr) : reshape(axisArr, resultShape)
        return resultData
    }
}
exports.argmax = argmax;

function min(arr, axis) {
    if (typeof arr == 'undefined') {
        throw new Error('错误：arr不能为空')
    }

    if (Array.isArray(arr) || typeof arr == 'number') {
        if (typeof arr == 'number') arr = [arr]
    } else {
        throw new Error('错误：arr数据类型不正确，sum仅支持Number Or Array')
    }

    if (typeof axis == 'undefined') {
        let f_arr = flatten(arr);
        let index = 0;
        for (let i = 0; i < f_arr.length; i++) {
            if (f_arr[i] < f_arr[index]) {
                index = i;
            }
        }
        return f_arr[index]
    } else {
        let axisInfo = get_axis(arr, axis)
        let axisArr = axisInfo.axisArr2
        for (let i = 0; i < axisArr.length; i++) {
            axisArr[i] = getMin(axisArr[i]).item.value
        }
        let resultShape = axisInfo.resultShape
        let resultData = resultShape.length == 0 ? Number(axisArr) : reshape(axisArr, resultShape)
        return resultData
    }
}
exports.min = min;

function argmin(arr, axis) {
    if (typeof arr == 'undefined') {
        throw new Error('错误：arr不能为空')
    }

    if (Array.isArray(arr) || typeof arr == 'number') {
        if (typeof arr == 'number') arr = [arr]
    } else {
        throw new Error('错误：arr数据类型不正确，sum仅支持Number Or Array')
    }

    if (typeof axis == 'undefined') {
        let f_arr = flatten(arr);
        let index = 0;
        for (let i = 0; i < f_arr.length; i++) {
            if (f_arr[i] < f_arr[index]) {
                index = i;
            }
        }
        return index
    } else {
        let axisInfo = get_axis(arr, axis)
        let axisArr = axisInfo.axisArr2
        for (let i = 0; i < axisArr.length; i++) {
            axisArr[i] = getMin(axisArr[i]).index
        }
        let resultShape = axisInfo.resultShape
        let resultData = resultShape.length == 0 ? Number(axisArr) : reshape(axisArr, resultShape)
        return resultData
    }
}
exports.argmin = argmin;

// var a = reshape(arange(1 * 2 * 3 * 4), [1, 2, 3, 4])
// a[0][1][1][1] = -123
// console.log(toStr(a))

// var b = arange(1 * 2 * 3)
// b[2] = -123
// console.log(toStr(b))

// console.log(toStr(argmin(a)))

// console.log(toStr(argmin(a, 0)))

// console.log(toStr(argmin(a, 1)))

// console.log(toStr(argmin(a, 2)))

// console.log(toStr(argmin(a, 3)))

// console.log(toStr(argmin(a, 4)))

// console.log(toStr(argmin(b)))

// console.log(toStr(argmin(b, 0)))

// console.log(toStr(argmin(b, 1)))

// console.log(toStr(argmax(10)))

// console.log(toStr(argmax(10, 0)))

// console.log(toStr(argmax(10, 1)))

function maximum(a, b) {
    if (typeof a == 'undefined' || typeof b == 'undefined') {
        throw new Error('a或b不能为空')
    }
    if (Array.isArray(a) == false && typeof a != 'number') {
        throw new Error('a只能是Number Or Array')
    }
    if (Array.isArray(b) == false && typeof b != 'number') {
        throw new Error('b只能是Number Or Array')
    }
    if (typeof a == 'number' && typeof b == 'number') {
        if (a > b) {
            return a
        } else {
            return b
        }
    }
    if (typeof a == 'number') {
        a = [a]
    }
    if (typeof b == 'number') {
        b = [b]
    }
    var broadcastRes = broadcast([a, b])
    var resultShape = shape(broadcastRes[0])
    a = broadcastRes[0]
    b = broadcastRes[1]
    a = flatten(a)
    b = flatten(b)
    var resultData = []
    for (let i = 0; i < a.length; i++) {
        if (a[i] > b[i]) {
            resultData[i] = a[i]
        } else {
            resultData[i] = b[i]
        }
    }
    return reshape(resultData, resultShape)
}
exports.maximum = maximum;

// console.log(maximum())

// console.log(maximum(1))

// console.log(maximum('1', 1))

// console.log(maximum(1, '1'))

// console.log(toStr(maximum(1, 1)))

// console.log(toStr(maximum(1, 2)))

// console.log(toStr(maximum(2, 1)))

// console.log(toStr(maximum([2], 1)))

// console.log(toStr(maximum(1, [2])))

// console.log(toStr(maximum([23], [2])))

// console.log(toStr(maximum([23], [2])))

// console.log(toStr(maximum([23,1,3,4,20], [10])))

// console.log(toStr(maximum([23,1,3,4,20], 10)))

// console.log(toStr(maximum([23,1,3,4,20], [10,30])))

// console.log(toStr(maximum([[23, 1, 3, 4, 20]], [10, 30, 20, 5, 10])))

// console.log(toStr(maximum([[23, 1, 3, 4, 20]], [[10], [30], [20], [5], [10]])))

//阉割版，最多只支持3维
function meshgrid() {
    var list = Array.from(arguments);
    for (let i = 0; i < list.length; i++) {
        if (Array.isArray(list[i]) == false) {
            list[i] = [list[i]]
        } else {
            list[i] = flatten(list[i])
        }
    }
    if (list.length == 0) {
        return []
    } else if (list.length == 1) {
        return list
    } else if (list.length >= 2) {
        let resultShape = []
        let resultShape_original = []
        for (let i = 0; i < list.length; i++) {
            resultShape.push(list[i].length)
            resultShape_original.push(list[i].length)
        }
        let temp = resultShape[0]
        resultShape[0] = resultShape[1]
        resultShape[1] = temp
        // console.log("resultShape：", resultShape)
        // console.log("resultShape_original：", resultShape_original)
        for (let i = 0; i < list.length; i++) {
            // console.log("i：", i)

            let resultShape2 = [].concat(resultShape);
            if (resultShape2[resultShape2.length - 1] != list[i].length) {
                list[i] = reshape(list[i], [list[i].length, 1])
            } else {
                if (i == 1) {
                    list[i] = reshape(list[i], [list[i].length, 1])
                }
            }

            if (list.length > 2 && resultShape2.indexOf(1) != -1 && resultShape2[resultShape2.length - 1] != 1) {
                let last = resultShape2.splice(resultShape2.length - 1, 1);
                let value = multiply(resultShape2[0], resultShape2, 1);
                resultShape2 = [].concat(value, last);
            } else if (list.length > 2 && resultShape2.indexOf(1) != -1 && resultShape2[resultShape2.length - 1] == 1) {

                let oneArr = [];
                for (let j = 0; j < i; j++) {
                    oneArr.push(1)
                }
                if (i == list.length - 1) {
                    oneArr = []
                }
                let toShape = [].concat(list[i].length, oneArr, 1);
                list[i] = reshape(list[i], toShape)

            } else if (list.length > 2 && resultShape2.indexOf(1) == -1) {
                if (resultShape2[resultShape2.length - 1] != list[i].length) {

                    let oneArr = [];
                    for (let j = 0; j < i; j++) {
                        oneArr.push(1)
                    }
                    if (i == list.length - 1) {
                        oneArr = []
                    }
                    let toShape = [].concat(list[i].length, oneArr, 1);
                    list[i] = reshape(list[i], toShape)

                } else {

                    if (i < list.length - 1) {
                        let oneArr = [];
                        for (let j = 0; j < i; j++) {
                            oneArr.push(1)
                        }
                        if (i == list.length - 1) {
                            oneArr = []
                        }
                        let toShape = [].concat(list[i].length, oneArr, 1);
                        list[i] = reshape(list[i], toShape)
                    }

                }
            }
            list[i] = broadcastToShape(list[i], resultShape2)[0]

            list[i] = reshape(list[i], resultShape)
            // console.log("i-结束：", i)
        }
        return list
    }
}
exports.meshgrid = meshgrid;

// console.log(meshgrid())

// console.log(meshgrid(1))

// console.log(meshgrid([[[[1]]]]))

//--------------------------------

// console.log(toStr(meshgrid([1, 2], [1, 2, 3])))

// console.log(toStr(meshgrid([1, 2, 3], [1, 2])))

// console.log(toStr(meshgrid([1], [1, 2])))

// console.log(toStr(meshgrid([1, 2], [1])))

// console.log(toStr(meshgrid([1], [1])))

// console.log(toStr(meshgrid([1, 2], [1, 2])))

//--------------------------------

// console.log(toStr(meshgrid([1], [1, 2], [1, 2, 3])))

// console.log(toStr(meshgrid([1, 2], [1], [1, 2, 3])))

// console.log(toStr(meshgrid([1, 2], [1, 2, 3], [1])))

// console.log(toStr(meshgrid([1, 2], [1, 2, 3], [1, 2, 3, 4])))

// console.log(toStr(meshgrid([1, 2], [1, 2], [1, 2])))

// console.log(toStr(meshgrid([1], [1], [1])))

//--------------------------------

// console.log(toStr(meshgrid([1, 2], [1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5])))

//--------------------------------

function logspace(start, stop, num, base) {
    if (typeof start == 'undefined' || typeof stop == 'undefined') {
        throw new Error('start 和 stop 不能为空')
    }
    if (num == undefined) {
        num = 50
    }
    if (base == undefined) {
        base = 10
    }
    let resultData = []

    const log_diff = (stop - start) / (num - 1);    //计算序列中每个数的对数值的差
    for (let i = 0; i < num; i++) {
        resultData.push(start + i * log_diff);  //生成对数序列
        resultData[i] = Math.pow(base, resultData[i]);  //将对数序列转换回原始数
    }
    return resultData
}
exports.logspace = logspace;

// console.log(logspace())

// console.log(logspace(1))

// console.log(logspace(0, 9, 10, 2))

// console.log(logspace(2, 3, 4))