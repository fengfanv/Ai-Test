const Main = require('./main.js')
var shape = Main.shape;

const { slice, Ellipsis, None, newaxis, True, False, indexing } = require('./indexing.js')

const PrintTest = require('./print_test.js')
var toStr = PrintTest.toStr;

//沿轴1（左/右）翻转
function fliplr(m) {
    if (typeof m == 'undefined') {
        throw new Error('m不能为空')
    }

    let mShape = shape(m);

    if (mShape.length < 2) {
        throw new Error('m的维度必须是2维及以上')
    }

    return indexing(m, [slice(None, None, None), slice(None, None, -1), Ellipsis])
}
exports.fliplr = fliplr;

// console.log(fliplr())

// console.log(fliplr(1))

// console.log(fliplr([1]))

// console.log(fliplr([[1]]))

// console.log(toStr(fliplr([[1,  0,  0],[0,  2,  0],[0,  0,  3]])))

// console.log(toStr(fliplr([[[1,  0,  0],[0,  2,  0],[0,  0,  3]],[[4,  0,  0],[0,  5,  0],[0,  0,  6]]])))

//沿轴0（上/下）翻转
function flipud(m) {
    if (typeof m == 'undefined') {
        throw new Error('m不能为空')
    }

    let mShape = shape(m);

    if (mShape.length < 1) {
        throw new Error('m的维度必须是1维及以上')
    }

    return indexing(m, [slice(None, None, -1), Ellipsis])
}
exports.flipud = flipud;

// console.log(flipud())

// console.log(flipud(1))

// console.log(flipud([1]))

// console.log(flipud([1,2]))

// console.log(flipud([[1]]))

// console.log(toStr(flipud([[1,  0,  0],[0,  2,  0],[0,  0,  3]])))

// console.log(toStr(flipud([[[1,  0,  0],[0,  2,  0],[0,  0,  3]],[[4,  0,  0],[0,  5,  0],[0,  0,  6]]])))