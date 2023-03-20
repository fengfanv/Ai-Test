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
下面是关于获取数据形状(numpy.shape)的功能实现

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

let arr = 
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

获取上面arr数据的形状
获取数组维度(形状)，分为两步，1、默认数组是符合标准的数据，然后直接获取数据的形状，2、拿着获取到的形状数据，检查数据是否是符合标准的形状
1、获取数据的形状
准备一个数组用来存放形状数据
let shapeArr = [];
第一层（第一维），直接获取arr的长度，这里arr.length是2，所以将2放进形状数组
现在的shapeArr形状数组是[2]

第二层（第二维），获取arr[0].length，这里arr[0].length是3，将3放进形状数组
现在的shapeArr形状数组是[2,3]

第三层（第三维），获取arr[0][0].length，这里arr[0][0].length是2，将2放进形状数组
现在的shapeArr形状数组是[2,3,2]

第四层（第四维），获取arr[0][0][0].length，这里arr[0][0][0].length是2，将2放进形状数组
现在的shapeArr形状数组是[2,3,2,2]

2、根据获取到的数据的形状，检查数据是否符合标准
上面获取到的形状是[2,3,2,2]
下面利用这个数据，使用递归方法，检查数据的所有节点是否都是符合上面这个形状，如果检查过程中，如果有某个节点数据形状不对，则报错

//下面是检查方法
function shapeCheck(arr,shape,ndim){
    arr 是数据
    shape 形状数组
    ndim 数据形状维度的下标，这里为了兼容形状数组下标为0，所以默认为0开始。表示当前检查的是shape数组里的第几个。如形状数据是[4,3,2,2]，假如当前检查的是数据的第1层（数据的第一维），也就是数组里下标为0的那个数据，也就是4

    let arrLen = arr.length;
    if(arrLen == shape[ndim]){
        //正确，则继续往里面，检查
        if(shape.length-1 == ndim){
            //这是最后一层了，在往里面没有东西了
            return true
        }else{
            //不是最后一层，里面还有东西
            let newNdim = ndim++;
            for(let i=0;i<arrLen;i++){
                let itemArr = arr[i];
                if(Array.isArray(itemArr)){
                    shapeCheck(itemArr,shape,newNdim)
                }else{
                    //不是数组，抛错
                    throw new Error('检查过程中发现非数组类型！')
                }
            }
        }
    }else{
        //形状不正确，抛错
        throw new Error('检查发现，数据形状在，'+shape+'：'+ndim+'，处不正确！')
    }
}
*/


/*
下面是关于获取数据维度(numpy.ndim)的功能实现（获取数据是几维数据，维度的数量）

实现方法，先使用上面的numpy.shape获取数据形状数组，返回返回数据形状数组的长度，就得到了数据的维度
*/


/*
下面是关于，根据形状数组，生成数据的方法(numpy.create_array)

这个方法接受，两个参数，一个是shape数组，另一个是，初始化的数据，使用什么数据进行初始化（初始化的数据，目前仅支持，纯数字，以后会支持funtion）

首先准备一个空数组，用来装待会生成的数据
let arr = [];






*/


