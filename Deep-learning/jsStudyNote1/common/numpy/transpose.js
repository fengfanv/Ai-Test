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

let a = [
    [1,2,3],
    [4,5,6]
]

let b = [
    [1,4],
    [2,5],
    [3,6]
]

printArr(a, [], (res) => {
    console.log(res.index,res.value)
})
console.log('----')
printArr(b, [], (res) => {
    console.log(res.index,res.value)
})