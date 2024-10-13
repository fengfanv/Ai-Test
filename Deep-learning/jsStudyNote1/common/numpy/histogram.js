const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const PrintTest = require('./print_test.js')
var toStr = PrintTest.toStr;

//阉割版
function histogram(a, bins, range) {
    if (typeof a == 'undefined') {
        throw new Error('a不能为空')
    }

    if (!Array.isArray(a)) {
        a = [a]
    }

    a = reshape(a, [-1])

    if (typeof bins == 'undefined') {
        bins = 10
    }

    //处理数据范围，如果没有提供range，则使用数据中的最小值和最大值
    //range=[min,max]
    let min = range ? range[0] : Math.min(...a);
    let max = range ? range[1] : Math.max(...a);

    //计算箱宽，箱宽(binWidth)是数据范围除以箱子数量
    let binWidth = (max - min) / bins;

    //初始化一个长度为bins的数组hist，用于存储每个箱子的计数
    let hist = new Array(bins).fill(0);
    //初始化binEdges数组，用于存储每个箱子的边界
    let binEdges = [];

    //填充箱子和创建边界
    //遍历数据，根据数据值计算其所属的箱子索引，并增加该箱子的计数
    for (let value of a) {
        if (value >= min && value <= max) {
            let index = Math.floor((value - min) / binWidth);
            if (index >= bins) {
                index = bins - 1
            }
            hist[index]++;
        }
    }
    //生成每个箱子的边界
    for (let i = 0; i <= bins; i++) {
        binEdges.push(min + i * binWidth);
    }

    return [hist, binEdges];
}
exports.histogram = histogram;

//let a = [141, 129, -86, -5, 154, -147, 36, -56, 63, 58, 49, 27, 79, -143, 53, -22, -51, -106, -53, -5]
// console.log(toStr(histogram()))

// console.log(toStr(histogram(a)))

// console.log(toStr(histogram(a,5)))

// console.log(toStr(histogram(a, 5, [0, 100])))

// console.log(toStr(histogram([[[a]]], 5, [0, 100])))