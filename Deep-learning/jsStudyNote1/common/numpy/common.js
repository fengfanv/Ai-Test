
//乘法
function multiply(value, arr, index) {
    if (index >= arr.length) {
        return value
    } else {
        let newValue = value * arr[index];
        let newIndex = index + 1;
        return multiply(newValue, arr, newIndex)
    }
}
exports.multiply = multiply;

//将数组里的数据读取出来并打印出坐标（支持给数据赋值）
function printArr(arr, indexArr, callback) {
    if (Array.isArray(arr) == false || arr.length < 1) {
        throw new Error('printArr:error arr不能是空数组！');
    }
    if (typeof indexArr == 'undefined') {
        indexArr = []
    }
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        let newIndexArr = JSON.parse(JSON.stringify(indexArr));
        newIndexArr.push(i);
        if (Array.isArray(item)) {
            printArr(item, newIndexArr, callback);
        } else {
            callback && callback({ index: newIndexArr, value: item, childArr: arr, childIndex: i })
        }
    }
}
exports.printArr = printArr;
// let a = [[0,0,0],[0,0,0]];
// printArr(a, [], (res) => {
//     //打印矩阵里的每一个元素
//     // console.log(res.index,res.value)
//     //重新赋值
//     // res.childArr[res.childIndex] = aIndex;
//     // aIndex = aIndex + 1;
//     //遍历完所有子元素
//     // if (aIndex == aSize) {
//     //     console.log('aSize', aSize);
//     //     console.log('a：');
//     //     printArr(a, [], (res) => {
//     //         console.log(res.index,res.value)
//     //     })
//     // }
// })
// console.log('shape(a)', shape(a))