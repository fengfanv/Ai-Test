const Axis = require('./axis.js')
var get_axis = Axis.get_axis;

const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Indexing = require('./indexing.js')
const True = Indexing.True;
const False = Indexing.False;

const printTest = require('./print_test.js');
var toStr = printTest.toStr;

const Operators = require('./operators.js');
var expr = Operators.expr;

function any(a, axis) {
    if (typeof a == 'undefined') {
        throw new Error('a不能为空')
    }

    if (!Array.isArray(a)) {
        a = [a]
    }

    if (typeof axis == 'undefined') {
        let flatten_arr = reshape(a, [-1])
        return checkAny(flatten_arr)
    } else {
        let axisInfo = get_axis(a, axis)
        let axisArr = axisInfo.axisArr
        for (let i = 0; i < axisArr.length; i++) {
            axisArr[i] = checkAny(axisArr[i])
        }
        let resultShape = axisInfo.resultShape
        let resultData = resultShape.length == 0 ? axisArr[0] : reshape(axisArr, resultShape)
        return resultData
    }
}
exports.any = any;

function checkAny(flatten_arr) {
    for (let i = 0; i < flatten_arr.length; i++) {
        // if (String(flatten_arr[i]) != 'False' && flatten_arr[i] != false && flatten_arr[i] != 0) {
        if (String(flatten_arr[i]) != 'false' && flatten_arr[i] != false && flatten_arr[i] != 0) {
            return True
        }
    }
    return False
}

// console.log(toStr(any()))

// console.log(toStr(any(1)))

// console.log(toStr(any(1,0)))

// console.log(toStr(any(1,1)))

// console.log(toStr(any([1],1)))

// console.log(toStr(any([1],0)))

// console.log(toStr(any(True,0)))

// console.log(toStr(any(False,0)))

// let a = reshape([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
//     17, 18, 19, 20, 21, 22, 23], [2, 3, 4])

// console.log(toStr(any(expr(a,'>',10))))

// console.log(toStr(any(expr(a,'>',10),0)))

// console.log(toStr(any(expr(a, '>', 10), 1)))

// console.log(toStr(any(expr(a, '>', 10), 2)))

// console.log(toStr(any(expr(a, '>', 10), 3)))

// let b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

// console.log(toStr(any(expr(b, '>', 10))))

// console.log(toStr(any(expr(b, '>', 50))))

// console.log(toStr(any(expr(b, '>', 10),0)))

// console.log(toStr(any(expr(b, '>', 10),1)))

// console.log(toStr(any(0)))

// console.log(toStr(any(0,0)))
