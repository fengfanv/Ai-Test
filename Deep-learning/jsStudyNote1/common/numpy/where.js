const Broadcast = require('./broadcast.js')
var broadcast = Broadcast.broadcast;

const Common = require('./common.js')
var printArr = Common.printArr;

const Indexing = require('./indexing.js')
const True = Indexing.True;
const False = Indexing.False;
const indexing = Indexing.indexing;

const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Main = require('./main.js')
var shape = Main.shape;

const PrintTest = require('./print_test.js')
var toStr = PrintTest.toStr;

const Operators = require('./operators.js');
var expr = Operators.expr;

function where(condition, x, y) {
    if (typeof condition == 'undefined') {
        throw new Error('condition不能为空')
    }

    if ((typeof x != 'undefined' && typeof y == 'undefined') || (typeof x == 'undefined' && typeof y != 'undefined')) {
        throw new Error('应同时给出x和y，或两者都不给出')
    }

    if (typeof condition == 'number' && typeof x == 'number' && typeof y == 'number') {
        if (Boolean(condition)) {
            return x
        } else {
            return y
        }
    }

    if (!Array.isArray(condition)) {
        condition = [condition]
    } else {
        if (condition.length == 0 && x == undefined) {
            return [[]]
        } else if (condition.length == 0 && x != undefined) {
            return []
        }
    }

    printArr(condition, [], (res) => {
        if (String(res.value) != 'True' && String(res.value) != 'False') {
            res.childArr[res.childIndex] = Boolean(res.value) ? True : False;
        }
    })

    if ((typeof x != 'undefined' && typeof y != 'undefined')) {
        //有x和y
        if (!Array.isArray(x)) {
            x = [x]
        }

        if (!Array.isArray(y)) {
            y = [y]
        }

        var [condition, x, y] = broadcast([condition, x, y]);

        var resultData = [];
        var resultShape = shape(x);
        var condition_flatten = reshape(condition, [-1]);
        var x_flatten = reshape(x, [-1]);
        var y_flatten = reshape(y, [-1]);

        for (let i = 0; i < condition_flatten.length; i++) {
            if (String(condition_flatten[i]) == 'True') {
                resultData.push(x_flatten[i])
            } else {
                resultData.push(y_flatten[i])
            }
        }

        return reshape(resultData, resultShape)

    } else {
        //无x和y

        var resultList = [];
        printArr(condition, [], (res) => {
            if (String(res.value) == 'True') {
                resultList.push(res);
            }
        })
        if (resultList.length != 0) {
            let resultShapeList = []
            for (let i = 0; i < resultList[0].index.length; i++) {
                if (!Array.isArray(resultShapeList[i])) {
                    resultShapeList[i] = [];
                }
                for (let j = 0; j < resultList.length; j++) {
                    resultShapeList[i].push(resultList[j].index[i])
                }
            }
            return resultShapeList;
        } else {
            return [[]];
        }
    }
}
exports.where = where;

// console.log(where())

// console.log(where(1))

// console.log(where(0))

// console.log(where(0,1))

// console.log(where(0,undefined,2))

// console.log(where(True))

// console.log(where(False))

// console.log(where(expr(1,'>',2),[1,2,3],[1,2]))

// console.log(where([expr(1,'>',2)],[1,2,3],[1,2]))

// console.log(where([[expr(1,'>',2),expr(2,'>',1)]],[1,2],[100]))

// console.log(where([[expr(1,'>',2),expr(2,'>',1)]],[[1,2],[4,5]],[100]))

// console.log(where([expr(1,'>',2),expr(2,'>',1)],[[1,2],[4,5]],[100]))

// console.log(where([expr(1,'>',2),expr(2,'>',1)]))

// console.log(where([expr(1,'>',2)]))

// console.log(where(expr(1,'>',2)))

// console.log(where([1,2]))

// console.log(where([0,1]))

// console.log(where([0.1,1]))

// console.log(where([0.1,-1]))

// console.log(where(1))

// console.log(where([1],1,[2]))

// console.log(where([]))

// console.log(where([],1,2))

// console.log(where(0))

// console.log(where(0, 1, 2))

// console.log(where([0], 1, 2))

// console.log(where(0, [1], 2))

// console.log(where(1))

// console.log(where(1,2,3))

// console.log(where([1],2,3))

// console.log(where(expr([0, 1, 2, 3, 4, 5, 6, 7], '>', 4)))

// console.log(where(expr([[0, 1, 2, 3, 4],
// [5, 6, 7, 8, 9],
// [10, 11, 12, 13, 14],
// [15, 16, 17, 18, 19]], '>', 14)))

// console.log(where([[False, True], [False, True]], [[5, 3], [7, 9]], [[2, 6], [1, 8]]))

// console.log(where([[0, 1], [1, 1]]))

// console.log(where([0, 1, 2, 3, 4, 5, 6, 7, 8, 9],1,-1))

// console.log(where(expr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], ">", 5), 1, -1))

// console.log(where([[True, False], [True, True]], [[1, 2], [3, 4]], [[9, 8], [7, 6]]))

// console.log(where([[expr(10, ">", 5), expr(10, "<", 5)], [expr(10, "==", 10), expr(10, "==", 7)]],[["chosen","not chosen"], ["chosen","not chosen"]],[["not chosen","chosen"], ["not chosen","chosen"]]))

// console.log(where(expr([2, 4, 6, 8, 10], ">", 5)))

// var a = [2, 4, 6, 8, 10]
// console.log(indexing(a, where(expr(a, ">", 5))))

// console.log(where([[0, 1], [1, 0]]))

// console.log(where(expr([[[0, 1, 2],
// [3, 4, 5],
// [6, 7, 8]],

// [[9, 10, 11],
// [12, 13, 14],
// [15, 16, 17]],

// [[18, 19, 20],
// [21, 22, 23],
// [24, 25, 26]]], ">", 5)))

// var a = [[[0, 1, 2],
// [3, 4, 5],
// [6, 7, 8]],

// [[9, 10, 11],
// [12, 13, 14],
// [15, 16, 17]],

// [[18, 19, 20],
// [21, 22, 23],
// [24, 25, 26]]]
// console.log(where(expr(a, ">", 5)))

// console.log(indexing(a,where(expr(a, ">", 5))))