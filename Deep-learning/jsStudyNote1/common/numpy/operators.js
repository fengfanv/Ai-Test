//关系运算符（比较运算符）

const Indexing = require('./indexing.js')
var True = Indexing.True;
var False = Indexing.False;

const Broadcast = require('./broadcast.js')
var broadcast = Broadcast.broadcast;

const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Main = require('./main.js')
var shape = Main.shape;

const PrintTest = require('./print_test.js')
var toStr = PrintTest.toStr;

//算术运算符（Arithmetic Operators）
//关系运算符(比较运算符)（Relational Operators）
function compute(a, operator, b) {
    // var r = eval(String(a) + operator + String(b)); //危险

    var r = undefined;
    if (operator == '==') {
        //等于 Equal (==)
        r = a == b
    } else if (operator == '!=') {
        //不等于 Not equal (!=)
        r = a != b
    } else if (operator == '===') {
        //全等 Strict equal (===)
        r = a === b
    } else if (operator == '!==') {
        //不全等 Strict not equal (!==)
        r = a !== b
    } else if (operator == '>') {
        //大于 Greater than (>)
        r = a > b
    } else if (operator == '>=') {
        //大于等于 Greater than or equal (>=)
        r = a >= b
    } else if (operator == '<') {
        //小于 Less than (<)
        r = a < b
    } else if (operator == '<=') {
        //小于等于 Less than or equal (<=)
        r = a <= b
    } else if (operator == '+') {
        //Addition
        r = a + b
    } else if (operator == '-') {
        //Subtraction
        r = a - b
    } else if (operator == '*') {
        //Multiplication
        r = a * b
    } else if (operator == '/') {
        //Division
        r = a / b
    } else if (operator == '%') {
        //Modulo
        r = a % b
    } else if (operator == '**') {
        //to the power of
        r = a ** b
    } else {
        throw new Error(`错误：暂不支持该种运算符 ${operator}`)
    }

    if (typeof r == 'boolean') {
        r = r ? True : False;
    }
    return r
}

function A_R(a, operator, b) {
    if (Array.isArray(a) == false && Array.isArray(b) == false) {
        return compute(a, operator, b)
    }
    if (!Array.isArray(a)) {
        a = [a]
    }
    if (!Array.isArray(b)) {
        b = [b]
    }
    var res = broadcast([a, b])
    a = res[0];
    b = res[1];
    var resultShape = shape(a);
    var resultData = [];
    a = reshape(a, [-1]);
    b = reshape(b, [-1]);
    for (let i = 0; i < a.length; i++) {
        resultData.push(compute(a[i], operator, b[i]))
    }
    return reshape(resultData, resultShape)
}
//expression表达式
exports.expr = A_R;

// console.log(A_R(1, '==', 11))
// console.log(A_R(1, '!=', 11))
// console.log(A_R('11', '===', 11))
// console.log(A_R(1, '!==', 11))
// console.log(A_R(1, '>', 11))
// console.log(A_R(11, '>=', 11))
// console.log(A_R(11, '<', 11))
// console.log(A_R(11, '<=', 11))

// console.log(A_R(11, '+', 11))
// console.log(A_R(11, '-', 11))
// console.log(A_R(11, '*', 11))
// console.log(A_R(11, '/', 11))
// console.log(A_R(4, '%', 2))
// console.log(A_R(2, '**', 2))

// console.log(A_R(2, '^', 2))

// console.log(A_R(11, '>', 10))
// console.log(A_R(11, '==', 10))
// console.log(A_R(1, '+', 11))
// console.log(A_R(11, '-', 10))
// console.log(A_R(11, '/', 10))
// console.log(A_R([1, 12, 4], '<', 10))
// console.log(toStr(A_R([1, 12, 4], '>', [11, 20, 3])))
// console.log(A_R([1.2222, 2, 3], '+', 10.1111))