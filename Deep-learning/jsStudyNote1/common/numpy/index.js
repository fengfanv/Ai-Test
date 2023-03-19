// 获取数组(矩阵)的维度(形状)
// 实现要求，至少支持4维数据的识别，也就是[2,2,3,4]
function shape(arr) {

    isArray(arr);//检查是否是数组

    let shapeArr = [];//形状数组

    //检查数组所有的item是否有array类型的数据
    if (itemIsArray(arr) == false) {
        //没有array类型的数据，所以是一维数组，直接返回数组长度
        shapeArr[0] = arr.length;
        return shapeArr;
    } else {
        shapeArr.push(arr.length);//插入一维的长度
        //arr数据的列表项里有元素是数组
        if (allItemIsArray(arr) == false) {
            throw new Error('此数据具有不均匀的形状！')
        } else {
            let itemLen = arr.length;
            let firstItemLen = arr[0].length;
            let allItemValue = allItemSum(getItemArrayLength(arr));
            if (allItemValue / itemLen !== firstItemLen) {
                throw new Error('此数据具有不均匀的形状！')
            } else {
                shapeArr.push(firstItemLen);



            }
        }
    }

    return shapeArr;//返回数组形状
}
exports.shape = shape;

//检查数组所有的item是否有array类型的数据
function itemIsArray(arr) {
    let arrLen = arr.length;
    for (let i = 0; i < arrLen; i++) {
        let item = arr[i];
        if (Array.isArray(item)) {
            return true;
        }
    }
    return false;
}

//检查数据是否是数组
function isArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('此数据不是数组！')
    }
    return true
}

//检查数组所有的item是否都是array类型的数据
function allItemIsArray(arr) {
    let arrLen = arr.length;
    for (let i = 0; i < arrLen; i++) {
        let item = arr[i];
        if (Array.isArray(item) == false) {
            return false;
        }
    }
    return true;
}

//获取数组所有的item(item是array类型)的长度
function getItemArrayLength(arr) {
    let arrLen = arr.length;
    let lenArr = [];
    for (let i = 0; i < arrLen; i++) {
        lenArr.push(arr[i].length);
    }
    return lenArr;
}

//将数组所有数据项相加
function allItemSum(arr) {
    let arrLen = arr.length;
    let result = 0;
    for (let i = 0; i < arrLen; i++) {
        result = result + arr[i];
    }
    return result;
}

/*

[
    [1]
]
1,1 1行1列

[
    [1,2]
]
1,2 1行2列

[
    [1,2],
    [1,2]
]
2,2 两行两列表


[
    [
        [1,2],
        [1,2]
    ],
    [
        [1,2],
        [1,2]
    ],
    [
        [1,2],
        [1,2]
    ]
]
3,2,2 三个两行两列


[
    [
        [
            [1,2],
            [1,2]
        ],
        [
            [1,2],
            [1,2]
        ],
        [
            [1,2],
            [1,2]
        ]
    ],
    [
        [
            [1,2],
            [1,2]
        ],
        [
            [1,2],
            [1,2]
        ],
        [
            [1,2],
            [1,2]
        ]
    ],
]
2,3,2,2 两个 3,2,2 


*/