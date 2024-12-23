const Common = require('./common.js');
var multiply = Common.multiply;

//关于numpy的主要（main）方法

//shape start
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
2,3,2,2 两个3,2,2 


[
    [
        [
            [1,1,1],
            [1,1,1]
        ],
        [
            [1,1,1],
            [1,1,1]
        ],
        [
            [1,1,1],
            [1,1,1]
        ]
    ],
    [
        [
            [1,1,1],
            [1,2]
        ],
        [
            [1,1,1],
            [1,1,1]
        ],
        [
            [1,1,1],
            [1,1,1]
        ]
    ],
]
2,3,2,3 两个3,2,3

观察以上数据后，发现数据的一些特点：
数据形状的最后一位，代表数据有多少列。如：[2,3,2,3] 的最后一位 3 代表数据有3列

*/
//shape end

/*
下面是关于获取数据形状(numpy.shape)的功能实现描述

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
2,3,2,2 两个3,2,2 


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

//获取数组形状的方法
function getArrShape(arr, shape) {
    if (Array.isArray(arr)) {
        shape.push(arr.length);
        if (arr.length > 0) {
            return getArrShape(arr[0], shape)
        } else {
            return shape
        }
    } else {
        return shape
    }
}

//检查数组形状是否符合规则
function checkShape(arr, shape, ndim) {
    let arrLen = arr.length;
    if (arrLen == shape[ndim]) {
        if (shape.length - 1 == ndim) {
            return true
        } else {
            let newNdim = ndim + 1;
            for (let i = 0; i < arrLen; i++) {
                let itemArr = arr[i];
                if (Array.isArray(itemArr)) {
                    checkShape(itemArr, shape, newNdim)
                } else {
                    throw new Error('错误：检查过程中发现非数组类型数据；此处获取的标准形状：' + shape + '；数据形状在：ndim' + ndim + '处发现非数据组类型;')
                }
            }
        }
    } else {
        throw new Error('错误：数据形状不规整；此处获取的标准形状：' + shape + '；数据形状在：ndim' + ndim + '处不规整;')
    }
}

function shape(arr) {
    let shapeArr = [];
    shapeArr = getArrShape(arr, shapeArr);
    checkShape(arr, shapeArr, 0)
    return shapeArr;
}

exports.shape = shape;

/*
下面是关于获取数据维度(numpy.ndim)的功能实现（获取数据是几维数据，维度的数量）

实现方法，先使用上面的numpy.shape获取数据形状数组，返回返回数据形状数组的长度，就得到了数据的维度
*/

function ndim(arr) {
    let shapeArr = shape(arr);
    return shapeArr.length
}

exports.ndim = ndim


/*
下面是关于，根据形状数组，生成数据的方法(numpy.create_array)，这个方法类似numpy里的（numpy.empty，numpy.zeros，numpy.ones）方法类似

这个方法接受，两个参数，一个是shape数组，另一个是，初始化的数据，使用什么数据进行初始化（初始化的数据，目前仅支持，纯数字，以后会支持funtion）

首先准备一个空数组，用来装待会生成的数据
let arr = [];

假如形状数组是shape = [4,3,2,1]

倒着循环形状数据，从里往外构建

function Create_a(shape, ndim, data) {
    let arr = [];
    data = typeof data == 'Number' ? data : JSON.parse(JSON.stringify(data));
    if (ndim < 0) {
        return data;//最后一层了，直接返回数据
    } else {
        //不是最后一层，继续循环构建数据
        for (let i = 0; i < shape[ndim]; i++) {
            arr.push(data)
        }
        return Create_a(shape, ndim - 1, arr)
    }
}

function create_array(shape,value){
    return Create_a(shape,shape.length-1,value)
}

数据形状是 [4,3,2,1]，然后你想给数据结构里填充的都是数值5，先创建形状数组最后一个的数据（从里往外构建），创建1的，这时方法的ndim是3，这时方法data是5

创建完毕最里面的数据之后，创建数据形状数组里的那个2的那层，这时方法的ndim是2，方法的data是一个数组[5]

然后按照上面的顺序，直到创建到数据形状数组的4的那个数据，最后返回生成的数据

*/

function createArr(shape, ndim, data) {
    let arr = [];
    data = typeof data == 'Number' ? data : JSON.parse(JSON.stringify(data));
    if (ndim < 0) {
        return data;//最后一层了，直接返回数据
    } else {
        //不是最后一层，继续循环构建数据
        for (let i = 0; i < shape[ndim]; i++) {
            arr.push(data)
        }
        return createArr(shape, ndim - 1, arr)
    }
}

function create_array(shape, value) {
    return createArr(shape, shape.length - 1, value)
}

exports.create_array = create_array;

/*
下面是关于，获取数组（矩阵）的元素的总个数的功能实现(numpy.size)

实现方法，使用上面的，获取数据形状数组的方法，shape，得到形状数组后，将里面的值都相乘，然后得到数据的元素个数。

*/

function size(arr) {
    let shapeArr = [];
    shapeArr = shape(arr);
    let value = multiply(shapeArr[0], shapeArr, 1) || 0;
    return value
}

exports.size = size;

/*
下面是关于，根据数值范围创建数组(numpy.arange)的方法

function arange(start, stop, step) {
    //start起始值，默认为0，可选
    //stop终止值，必选
    //step步长，默认为1，可选

    if (typeof start != 'undefined' && typeof stop == 'undefined' && typeof step == 'undefined') {
        //第一种情况，仅传stop值
        stop = start;
        start = 0;
        step = 1;
    } else if (typeof start != 'undefined' && typeof stop != 'undefined' && typeof step == 'undefined') {
        //第二种情况，传start，stop值
        // start = start;
        // stop = stop;
        step = 1;
    } else if (typeof start != 'undefined' && typeof stop != 'undefined' && typeof step != 'undefined') {
        //第三种情况，三个参数都传
        // start = start;
        // stop = stop;
        // step = step;
    }
    let arr = [];
    for (let i = start; i < stop; i=i+step) {
        arr.push(i);
    }
    return arr;
}
*/

function arange(start, stop, step) {
    if (typeof start != 'undefined' && typeof stop == 'undefined' && typeof step == 'undefined') {
        stop = start;
        start = 0;
        step = 1;
    } else if (typeof start != 'undefined' && typeof stop != 'undefined' && typeof step == 'undefined') {
        // start = start;
        // stop = stop;
        step = 1;
    } else if (typeof start != 'undefined' && typeof stop != 'undefined' && typeof step != 'undefined') {
        // start = start;
        // stop = stop;
        // step = step;
    }

    let arr = [];
    if (step > 0) {
        for (let i = start; i < stop; i = i + step) {
            arr.push(i);
        }
    } else if (step < 0) {
        for (let i = start; i > stop; i = i + step) {
            arr.push(i);
        }
    } else {
        throw new Error('arange 的step不能是0')
    }
    return arr;
}
exports.arange = arange;

//阉割版，阉割了start和stop可能是数组的功能
function linspace(start, stop, num, endpoint) {
    if (typeof start == 'undefined' || typeof stop == 'undefined') {
        throw new Error('start 和 stop 不能为空')
    }
    if (typeof num == 'undefined') {
        num = 50
    }
    if (num < 0) {
        throw new Error('num不能是负数')
    }
    if (typeof endpoint == 'undefined') {
        endpoint = true;
    }
    var arr = []
    var step = (stop - start) / num
    if (endpoint) {
        step = (stop - start) / (num - 1)
    }
    if (num == 1) {
        return [start]
    }
    for (let i = 0; i < num; i++) {
        let value = start + i * step
        arr.push(value)
    }
    return arr
}
exports.linspace = linspace;

// console.log(linspace())
// console.log(linspace(1))
// console.log(linspace(1,1))
// console.log(linspace(1,1,0))
// console.log(linspace(1, 1, -1))
// console.log(linspace(20,15,2))
// console.log(linspace(20, 15, 1))
// console.log(linspace(20, 15, 4))
// console.log(linspace(20, 15, 4, false))
// console.log(linspace(20, 15, 0, false))
// console.log(linspace(20, 15, 1, false))
// console.log(linspace(15, 20, 6, false))


function zeros(shape) {
    if (Array.isArray(shape) || typeof shape == 'number') {
        if (typeof shape == 'number') shape = [shape]
    } else {
        throw new Error('错误：shape数据类型不正确，shape仅支持Number Or Array')
    }
    for (let i = 0; i < shape.length; i++) {
        if (shape[i] < 0) {
            throw new Error('错误：不允许使用负维度')
        }
    }
    return create_array(shape, 0)
}
exports.zeros = zeros;

function ones(shape) {
    if (Array.isArray(shape) || typeof shape == 'number') {
        if (typeof shape == 'number') shape = [shape]
    } else {
        throw new Error('错误：shape数据类型不正确，shape仅支持Number Or Array')
    }
    for (let i = 0; i < shape.length; i++) {
        if (shape[i] < 0) {
            throw new Error('错误：不允许使用负维度')
        }
    }
    return create_array(shape, 1)
}
exports.ones = ones;

function zeros_like(arr) {
    let shapeArr = [];
    shapeArr = shape(arr);
    return create_array(shapeArr, 0)
}
exports.zeros_like = zeros_like;






