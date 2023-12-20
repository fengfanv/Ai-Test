const Main = require('./main.js');
var shape = Main.shape;
var create_array = Main.create_array;

const Common = require('./common.js');
var printArr = Common.printArr;

//-----------------

const Reshape = require('./reshape.js');
var reshape = Reshape.reshape;
var arange = Main.arange;



/*
索引和切片
*/


/*
索引元祖参数 start
*/
//切片 slice（slice仅接受两种类型的参数 None 或 数值）
function slice(start, stop, step) {
    if (String(start) == 'undefined') {
        throw new Error('slice 错误：请至少传入一个参数')
    }
    if (String(stop) == 'undefined') {
        stop = None;
    }
    if (String(step) == 'undefined') {
        step = None;
    }
    let dataType = [start, stop, step];
    for (let i = 0; i < dataType.length; i++) {
        let itemType = String(dataType[i]);
        if (itemType != 'None' && /^-?\d+$/.test(itemType) == false) {
            throw new Error('slice 错误：入参只接受 None 或 整数')
        }
    }
    if (/^-?\d+$/.test(String(start)) && String(stop) == 'None' && String(step) == 'None') {
        stop = start;
        start = None;
        step = None;
    }
    return {
        "name": "slice",
        "start": start,
        "stop": stop,
        "step": step,
        "toString": () => {
            return "slice"
        }
    }
}
exports.slice = slice;

//省略号 Ellipsis（...）
var Ellipsis = {
    "name": "Ellipsis",
    "toString": () => {
        return "Ellipsis"
    },
}
Object.freeze(Ellipsis); //冻结对象，防止对象属性被修改
exports.Ellipsis = Ellipsis;

//None（可作为slice的参数，也可直接作为索引元祖的参数（作为索引元祖参数时，其作用与 np.newaxis 一样））
var None = {
    "name": "None",
    "toString": () => {
        return "None"
    },
}
Object.freeze(None);
exports.None = None;

/*
索引元祖参数 end
*/










function indexing(arr, indexingTuple, value) {
    /*
    arr 被索引数据
    indexingTuple py里索引元祖，js这里用一个一维数组代替
    value 根据索引结果赋的值
    */
    /*
    处理流程：
    1、根据 indexingTuple(索引元祖) 判断索引是基本索引还是高级索引
    2、根据索引类型将 数据和索引 交给相关方法去处理
    3、将索引结果返回
    */

    let isAdvancedIndexing = false;//是否是高级索引。判断高级索引比较简单，indexingTuple里有数组，就算高级索引
    for (let i = 0; i < indexingTuple.length; i++) {
        let item = indexingTuple[i];
        if (Array.isArray(item)) {
            isAdvancedIndexing = true;
            break;
        }
    }
    if (isAdvancedIndexing) {
        return advancedIndexing(arr, indexingTuple)
    } else {
        return basicIndexing(arr, indexingTuple, value)
    }
}
exports.indexing = indexing;



//基本索引
//处理基本索引
function basicIndexing(arr, indexingTuple, value) {
    /*
    arr 被索引数据
    indexingTuple py里索引元祖，js这里用一个一维数组代替
    value 根据索引结果赋的值
    */
    /*
    基本索引处理的大概流程：
    1、根据 arr和indexingTuple 推算出，索引结果的形状
    2、获取索引结果里的数据(不用考虑形状)
    3、将获取的数据 转换成 索引结果的形状
    4、返回索引结果
    */
    //
    //
    //下面开始处理
    //
    //
    let arrShape = shape(arr);
    let arrNdim = arrShape.length || 0;
    /*
    为 索引元祖数组 补全 索引元素 start
    什么时候需要补全？
    1、索引元祖数组里抛除 None/np.newaxis 后，索引元祖数组长度不及被索引数组的维度数
    2、索引元祖数组里有Ellipsis（索引元祖数组里最多只能有一个Ellipsis）
    */
    //首先 从索引元祖数组里 数(找)出 除了 None/np.newaxis/Ellipsis 以外，有几个有效(有用)的索引元素
    //检查索引元祖数组里有几个有效(有用)的索引元素
    let canNum = 0;//有效的索引元素数量
    let indexingTupleArr = [].concat(indexingTuple);
    let EllipsisNum = 0;//Ellipsis数量
    let EllipsisIndex = -1;//Ellipsis位置
    for (let i = 0; i < indexingTupleArr.length; i++) {
        let item = String(indexingTupleArr[i]);
        if (item != 'None' && item != 'Ellipsis') {
            canNum++;
        }
        if (item == 'Ellipsis') {
            EllipsisNum++;
            EllipsisIndex = i;
        }
    }
    if (EllipsisNum > 1) {
        throw new Error('基本索引 错误：索引元祖数组里最多只能有一个Ellipsis')
    }
    //数出索引元祖数组里有几个有效的索引元素后
    //1、如果有效的索引元素数量不及被索引数组的维度数，则补充所需数量的slice(None,None,None)
    //2、如果索引元祖数组里有Ellipsis，则将Ellipsis替换成所需数量的slice(None,None,None)
    let needAddNum = 0;//索引元祖数组里，需要补充多少个slice(None,None,None)
    needAddNum = arrNdim - canNum <= 0 ? 0 : arrNdim - canNum;
    if (EllipsisNum != 0) {
        //有Ellipsis时，在Ellipsis所处的位置，将Ellipsis替换成所需数量的slice(None,None,None)
        indexingTupleArr.splice(EllipsisIndex, 1)//删除Ellipsis
        for (let i = 0; i < needAddNum; i++) {
            indexingTupleArr.splice(EllipsisIndex, 0, slice(None));//在Ellipsis的位置，插入所需数量的slice(None,None,None)
        }
    } else {
        //没有Ellipsis时，在索引元祖数组末尾，插入所需数量的slice(None,None,None)
        for (let i = 0; i < needAddNum; i++) {
            indexingTupleArr.push(slice(None));//在数组末尾的位置，插入所需数量的slice(None,None,None)
        }
    }
    if (arrNdim < canNum + needAddNum) {
        throw new Error(`基本索引 错误：被索引数组是一个${arrNdim}维数组 但却有${canNum + needAddNum}个索引元素`)
    }
    // console.log('indexingTupleArr：',indexingTupleArr);
    /*为 索引元祖数组 补全 索引元素 end*/
    /*
    匹配形状数组里元素(被索引数组的每个维度) 所对应的索引元素 start
    */
    let shapeArrToIndexingTupleArr = {
        // "0":"1", //形状数组下标 0，对应，索引元祖数组下标是 1 的索引元素
        // "1":"3", //形状数组下标 1，对应，索引元祖数组下标是 3 的索引元素
        // "2":"5", //形状数组下标 2，对应，索引元祖数组下标是 5 的索引元素
        // ...
    }
    let shapeArrToIndexingTupleArrReverse = {
        // "1":"0", //索引元祖数组下标是 1 的索引元素，对应，形状数组下标 0
        // "3":"1", //索引元祖数组下标是 3 的索引元素，对应，形状数组下标 1
        // "5":"2", //索引元祖数组下标是 5 的索引元素，对应，形状数组下标 2
        // ...
    }
    let shapeArrIndex = -1;
    for (let i = 0; i < indexingTupleArr.length; i++) {
        let item = String(indexingTupleArr[i]);
        if (item != 'None') {
            shapeArrIndex++;
            shapeArrToIndexingTupleArr[shapeArrIndex] = i;
        }
    }
    for (let key in shapeArrToIndexingTupleArr) {
        let value = shapeArrToIndexingTupleArr[key];
        shapeArrToIndexingTupleArrReverse[value] = key;
    }
    // console.log("shapeArrToIndexingTupleArr：",shapeArrToIndexingTupleArr);
    // console.log("shapeArrToIndexingTupleArrReverse：",shapeArrToIndexingTupleArrReverse);
     /*
    匹配形状数组里元素(被索引数组的每个维度) 所对应的索引元素 end
    */

    // 到这里 索引元祖数组(indexingTupleArr) 里只存在 None/整数/slice
    // 根据被索引数组的每个维度信息，为 该维度 所对应 的索引元素，补全 该索引元素的“参数”。如将slice(1,None,None)补成slice(1,10,1)。（注意，这里是为 索引元素 补全 参数。与上边不一样。上边是为 索引元祖数组 补全 索引元素）
    for (let key in shapeArrToIndexingTupleArr) {
        let shape_idx = key;
        let indexingTupleArr_idx = shapeArrToIndexingTupleArr[shape_idx];
        let item = String(indexingTupleArr[indexingTupleArr_idx]);
        if (item == 'slice') {
            if (String(indexingTupleArr[indexingTupleArr_idx].step) == 'None') {
                indexingTupleArr[indexingTupleArr_idx].step = 1
            }
            if (String(indexingTupleArr[indexingTupleArr_idx].start) == 'None') {
                if (indexingTupleArr[indexingTupleArr_idx].step > 0) {
                    indexingTupleArr[indexingTupleArr_idx].start = 0
                } else {
                    indexingTupleArr[indexingTupleArr_idx].start = arrShape[shape_idx] - 1;
                }
            }
            if (String(indexingTupleArr[indexingTupleArr_idx].stop) == 'None') {
                if (indexingTupleArr[indexingTupleArr_idx].step > 0) {
                    indexingTupleArr[indexingTupleArr_idx].stop = arrShape[shape_idx]
                } else {
                    indexingTupleArr[indexingTupleArr_idx].stop = -arrShape[shape_idx] - 1;
                }
            }
        }
    }
    // console.log('indexingTupleArr2：',indexingTupleArr);

    /*将numpy负索引转成正常索引下标；获取slice的下标；预测索引结果形状 start*/
    //根据上边 shapeArrToIndexingTupleArr数组，形状数组里元素(被索引数组的每个维度)与之对应的索引元素，计算出(求出)被索引数组里 每个维度 会被索引 的下标
    let dataIndex = {
        // "0":[1,2,3,4], //这里"0"是shape数组里的下标（用shape数组，是因为没有比shape数组，能更好展示被索引数组维度的方式了）；这里[1,2,3,4]是指该维度会被索引的“下标”；
        // "1":[0],
        // "2":[5,6,7],
        // ...
    }
    for (let key in shapeArrToIndexingTupleArr) {
        let shape_idx = key;
        let shape_item = arrShape[shape_idx];
        let indexingTupleArr_idx = shapeArrToIndexingTupleArr[shape_idx];
        let indexingTupleArr_item = indexingTupleArr[indexingTupleArr_idx];
        let itemType = String(indexingTupleArr_item);
        if (itemType == 'slice') {
            let d = shape_item;
            let i = indexingTupleArr_item.start;
            let j = indexingTupleArr_item.stop;
            let k = indexingTupleArr_item.step;
            dataIndex[shape_idx] = get_slice_index(d, i, j, k) 
        } else {
            let d = shape_item;
            let i = indexingTupleArr_item;
            dataIndex[shape_idx] = get_number_index(d, i)
        }
    }
    // console.log('dataIndex：',dataIndex);

    //预测索引结果形状
    let resultShape = [];//索引结果形状数组
    let newResultShape = [];//索引结果形状数组2
    for (let i = 0; i < indexingTupleArr.length; i++) {
        let item = indexingTupleArr[i];
        let itemType = String(item);
        if (/^-?\d+$/.test(itemType)) {
            //索引参数是 数值
            resultShape.push('-')
        } else if (itemType == 'None') {
            //索引参数是 None/np.newaxis
            resultShape.push(1)
        } else if (itemType == 'slice') {
            //索引参数是 slice
            let sliceArrLen = dataIndex[shapeArrToIndexingTupleArrReverse[i]].length || 0;
            resultShape.push(sliceArrLen)
        }
    }
    //去除索引结果形状数组里的"-"
    for (let i = 0; i < resultShape.length; i++) {
        if (resultShape[i] != '-') {
            newResultShape.push(resultShape[i])
        }
    }
    console.log(`resultShape：[${resultShape.join()}] => [${newResultShape.join()}]`);
    /*将numpy负索引转成正常索引；获取slice的下标；预测索引结果形状 end*/


    /*获取索引结果数据 start*/
    let resultDataArr = [
        // {
        //     "originalIndex":[1,2,3,1,1,1], //该数据值，在被索引数组里的坐标，后面用于索引赋值时使用（该坐标，永远不变）
        //     "index":[1,2,3,1,1,1],         //该数据值，在被索引数组里的坐标（该坐标，可能会在处理slice(i,j,k)k是负值的情况时，发生变化）
        //     "value":10                     //数据值
        // },
        // ...
    ];
    printArr(arr, [], (res) => {
        //打印矩阵里的每一个元素
        // console.log(res.index,res.value)
        let v = 0;
        for (let i = 0; i < res.index.length; i++) {
            if (dataIndex[i].indexOf(res.index[i]) != -1) {
                v++;
            }
        }
        if (v == res.index.length) {
            resultDataArr.push({
                originalIndex: JSON.parse(JSON.stringify(res.index)),
                index: res.index,
                value: res.value
            })
        }
    })
    console.log("size：", resultDataArr.length)
    for (let i = 0; i < resultDataArr.length; i++) {
        console.log(resultDataArr[i])
    }
    /*获取索引结果数据 end*/

    /*调整索引结果数据的顺序(处理slice(i,j,k) k是负值的情况) start*/
    let dataIndexSliceK = {
        // "0":undefined, //这里的 0 对应形状数组里 第0位，这里值是undefined，代表形状数组 第0位 对应的索引元素，不存在slice(i,j,k)k是负值的情况
        // "1":{          //这里的 1 对应形状数组里 第1位，这里值是object，代表形状数组 第1位 对应的索引元素，存在slice(i,j,k)k是负值的情况
        //     "0":"3",
        //     "1":"2",   
        //     "2":"1",   //resultDataArr里数据 的 形状数组坐标(resultDataArr[i].index)里第1位，是2时，则变成1    [1,2,...] ==> [1,1,...]
        //     "3":"0"    //resultDataArr里数据 的 形状数组坐标(resultDataArr[i].index)里第1位，是3时，则变成0    [1,3,...] ==> [1,0,...]
        // },
        // "2":undefined, //这里的2 对应形状数组里 第2位，这里值是undefined，代表形状数组 第2位 对应的索引元素，不存在slice(i,j,k)k是负值的情况
        // ...
    }
    for (let key in shapeArrToIndexingTupleArr) {
        let shape_idx = key;
        let indexingTupleArr_idx = shapeArrToIndexingTupleArr[shape_idx];
        let indexingTupleArr_item = indexingTupleArr[indexingTupleArr_idx];
        let itemType = String(indexingTupleArr_item);
        let dataIndexItem = dataIndex[shape_idx];
        if (itemType == 'slice' && indexingTupleArr_item.step < 0) {
            //slice(i,j,k)k是负值
            let reverseObj = {
                // "0": "3",
                // "1": "2",
                // "2": "1",
                // ...
            };
            for (let i = 0; i < dataIndexItem.length; i++) {
                let indexValue = dataIndexItem[i];
                let toIndexValue = dataIndexItem[dataIndexItem.length - 1 - i];
                reverseObj[indexValue] = toIndexValue;
            }
            dataIndexSliceK[shape_idx] = reverseObj;
        } else {
            dataIndexSliceK[shape_idx] = undefined;
        }
    }
    //备份resultDataArr数据
    let resultDataArr2 = JSON.parse(JSON.stringify(resultDataArr));
    //变换resultDataArr[i].index里的坐标。如将[1,2,...]变成[1,1,...]等等。
    for (let i = 0; i < resultDataArr.length; i++) {
        let item = resultDataArr[i];
        let itemIndexArr = item.index;
        let newItemIndexArr = [];
        for (let j = 0; j < itemIndexArr.length; j++) {
            let indexValue = itemIndexArr[j];
            if (dataIndexSliceK[j] == undefined) {
                newItemIndexArr.push(indexValue)
            } else {
                newItemIndexArr.push(dataIndexSliceK[j][indexValue])
            }
        }
        resultDataArr[i].index = newItemIndexArr;
    }
    //上边resultDataArr[i].index里的坐标变化完成后，为变换完坐标的索引结果数据，重新排序。
    let newResultDataArr = [
        // {
        //     "originalIndex":[1,2,3,1,1,1], //该数据值，在被索引数组里的坐标，后面用于索引赋值时使用（该坐标，永远不变）
        //     "index":[1,2,3,1,1,1],         //该数据值，在被索引数组里的坐标（该坐标，可能会在处理slice(i,j,k)k是负值的情况时，发生变化）
        //     "value":10                     //数据值
        // },
        // ...
    ]
    for (let i = 0; i < resultDataArr2.length; i++) {
        let item = resultDataArr2[i];
        for (let j = 0; j < resultDataArr.length; j++) {
            if (item.index.join() == resultDataArr[j].index.join()) {
                newResultDataArr.push(resultDataArr[j]);
                break;
            }
        }
    }
    console.log("newResultDataArr：", newResultDataArr.length)
    for (let i = 0; i < newResultDataArr.length; i++) {
        console.log(newResultDataArr[i].value)
    }
    /*调整索引结果数据的顺序(处理slice(i,j,k) k是负值的情况) end*/


    /* start
    检查是否需要根据索引结果来为原始数据赋值。
    1、如果需要根据索引结果为原始数据赋值，则为原始数据进行赋值，然后返回 被更改(赋值)完 的原始数据。
    2、如果不需要根据索引结果为原始数据赋值，则根据索引结果形状，创建一个空数组，然后将索引结果数据导入进空数组，最后返回索引结果数组。
    */


    /* 
    检查是否需要根据索引结果来为原始数据赋值。
    1、如果需要根据索引结果为原始数据赋值，则为原始数据进行赋值，然后返回 被更改(赋值)完 的原始数据。
    2、如果不需要根据索引结果为原始数据赋值，则根据索引结果形状，创建一个空数组，然后将索引结果数据导入进空数组，最后返回索引结果数组。
    end */

}

//获取被索引数组 某个维度 “整数” 会索引的 下标
function get_number_index(d, i) {
    //1、如果i是numpy负索引，则转成正常索引
    i = i < 0 ? d + i : i;
    if (i < 0 || i >= d) {
        //如果 该整数下标 不在该维度的有效范围内，则返回空数组
        return [];
    } else {
        return [i];
    }
}

//获取被索引数组 某个维度 “slice” 会索引的 下标
//对于该方法的更多内容，请看“索引和切片/关于切片slice/slice_test.js”
function get_slice_index(d, i, j, k) {
    if (k == 0) throw new Error('get_slice_index 错误：slice(i,j,k) k不能是0')

    //1、如果i或j是numpy负索引，则转成正常索引
    i = i < 0 ? d + i : i;
    j = j < 0 ? d + j : j;

    //2、如果i或j超越了数组范围，将超越范围的值，进行正常化处理
    if (k > 0) {
        i = i <= 0 ? 0 : i;
        j = j >= d ? d : j;
    } else if (k < 0) {
        i = i >= (d - 1) ? (d - 1) : i;
        j = j <= -1 ? -1 : j;
    }

    //3、使用(j-i)/k 和 (j-i)%k进行计算
    let q = Math.floor((j - i) / k);
    let r = (j - i) % k;
    let m = r == 0 ? (q + r) : (q + 1);
    m = m <= 0 ? 0 : m;

    let indexArr = [];
    let index = i;
    while (indexArr.length != m) {
        indexArr.push(index)
        index = index + k;
    }
    return indexArr;
}







var a = reshape(arange(2 * 3 * 4 * 5 * 6), [2, 3, 4, 5, 6])
var a1 = arange(5)
var a2 = reshape(arange(1,7), [2, 3, 1])
//indexing(a,[Ellipsis,1]) //=>indexingTupleArr：[slice(None,None,None),slice(None,None,None),slice(None,None,None),slice(None,None,None),1]
//indexing(a,[Ellipsis,1,Ellipsis]) //=>Error: 基本索引 错误：索引元祖里最多只能有一个Ellipsis
//indexing(a,[slice(1),Ellipsis,1]) //=>indexingTupleArr：[slice(None,1,None),slice(None,None,None),slice(None,None,None),slice(None,None,None),1]
//indexing(a,[slice(1),1,Ellipsis]) //=>indexingTupleArr：[slice(None,1,None),1,slice(None,None,None),slice(None,None,None),slice(None,None,None)]
//indexing(a,[slice(1),1]) //=>indexingTupleArr：[slice(None,1,None),1,slice(None,None,None),slice(None,None,None),slice(None,None,None)]
//indexing(a,[1,1,1,1,1]) //=>indexingTupleArr：[ 1, 1, 1, 1, 1 ]
//indexing(a,[1,None,Ellipsis,slice(1)]) //=>indexingTupleArr：[1,None,slice(None,None,None),slice(None,None,None),slice(None,None,None),slice(None,1,None)]

//indexing(a,[1,1,1,1,1,1]) //=>Error: 基本索引 错误：被索引数组是一个5维数组 但却有6个索引参数
//indexing(a,[None,1,None,1,1,Ellipsis,1,1]) //=>shapeArrToIndexingTupleArr：{ '0': 1, '1': 3, '2': 4, '3': 5, '4': 6 }
//indexing(a,[None,1,Ellipsis,1,1]) //=>indexingTupleArr：[None,1,slice(None,None,None),slice(None,None,None),1,1] ;;;; shapeArrToIndexingTupleArr：{ '0': 1, '1': 2, '2': 3, '3': 4, '4': 5 }

//indexing(a,[1,slice(None,None,None),slice(None,None,-1),slice(1,None,1)]) 
//=>indexingTupleArr2：[1,slice(0,3,1),slice(3,-5,-1),slice(1,5,1),slice(0,6,1)]

// indexing(a,[None,1,None,1,1,Ellipsis,1,1]) //=>dataIndex： { '0': [ 1 ], '1': [ 1 ], '2': [ 1 ], '3': [ 1 ], '4': [ 1 ] }
// indexing(a,[None,1,Ellipsis,1,1])
// dataIndex： {
//     '0': [ 1 ],
//     '1': [ 0, 1, 2 ],
//     '2': [ 0, 1, 2, 3 ],
//     '3': [ 1 ],
//     '4': [ 1 ]
// }
// indexing(a,[1,slice(None,None,None),slice(None,None,-1),slice(1,None,1)])
// dataIndex： {
//     '0': [ 1 ],
//     '1': [ 0, 1, 2 ],
//     '2': [ 3, 2, 1, 0 ],
//     '3': [ 1, 2, 3, 4 ],
//     '4': [ 0, 1, 2, 3, 4, 5 ]
// }
// indexing(a,[1,slice(None,None,None),slice(3,0,-1),slice(1,None,1)])
// dataIndex： {
//     '0': [ 1 ],
//     '1': [ 0, 1, 2 ],
//     '2': [ 3, 2, 1 ],
//     '3': [ 1, 2, 3, 4 ],
//     '4': [ 0, 1, 2, 3, 4, 5 ]
// }

//indexing(a,[None,1,None,1,1,Ellipsis,1,1]) //resultShape：[1,-,1,-,-,-,-] => [1,1]
//indexing(a,[1,slice(10,10,1)]) //resultShape：[-,0,4,5,6] => [0,4,5,6] 
//indexing(a,[None,1,Ellipsis,1,1]) //resultShape：[1,-,3,4,-,-] => [1,3,4]
//indexing(a,[1,slice(None,None,None),slice(None,None,-1),slice(1,None,1)]) //resultShape：[-,3,4,4,6] => [3,4,4,6]
//indexing(a,[1,slice(None,None,None),slice(3,0,-1),slice(1,None,1)]) //resultShape：[-,3,3,4,6] => [3,3,4,6]

// indexing(a,[Ellipsis,1])
// indexing(a,[None,1,None,1,1,Ellipsis,1,1])
// indexing(a,[1,slice(10,10,1)])
// indexing(a,[None,1,Ellipsis,1,1])
// indexing(a,[slice(1),Ellipsis,1])
// indexing(a,[1,None,slice(0,1,1),slice(0,None,2),slice(1,5,3),slice(0,5,2)])

// indexing(a,[1,None,slice(1,0,-1),slice(None,0,-2),slice(5,1,-3),slice(5,0,-2)])
// indexing(a,[1,None,slice(1,0,-1),slice(0,None,2),slice(5,1,-3),slice(5,0,-2)])
// indexing(a,[slice(2,None,-1),None,slice(2,0,-1),slice(0,None,2),slice(5,1,-3),slice(5,0,-2)])
// indexing(a,[1,slice(None,None,None),slice(None,None,-1),slice(1,None,1)])
// indexing(a,[1,None,slice(0,1,1),slice(0,None,2),slice(1,5,3),slice(0,5,2)])

// indexing(a1,[slice(None),None])
// indexing(a1,[None,slice(None)])
// indexing(a2,[slice(None),None,slice(None),slice(None)])
// indexing(a2,[slice(None),slice(None),0])



//高级索引
//处理高级索引(整数数组索引,布尔数组索引)和高级索引与基本索引相结合
function advancedIndexing(arr, indexingTuple) {
    /*
    arr 被索引数据
    indexingTuple py里索引元祖，js这里用一个一维数组代替
    */
    /*
    处理流程：
    1、根据 arr和indexingTuple 判断是 纯高级索引 还是 高级索引与基本索引相结合
    ...
    ...
    */

}
