const Main = require('./main.js');
var shape = Main.shape;
var arange = Main.arange;

const Common = require('./common.js');
var printArr = Common.printArr;

const Broadcast = require('./broadcast.js')
var broadcast = Broadcast.broadcast;

const Reshape = require('./reshape.js');
var reshape = Reshape.reshape;




/*
索引和切片

编写顺序：
基本索引
高级索引整数数组索引
高级索引布尔数组索引

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

//True
var True = {
    "name": "True",
    "toString": () => {
        return "True"
    },
}

//False
var False = {
    "name": "False",
    "toString": () => {
        return "False"
    },
}

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
    1、根据 被索引数据(arr) 优化索引元组
    2、根据 索引元祖(indexingTuple) 判断索引是基本索引还是高级索引
    3、根据索引类型 将数据和索引 交给相关方法去处理
    4、将索引结果返回
    */

    // 下面开始处理...
    /*
    为 索引元祖数组 补全 索引元素 start
    什么时候需要补全？
    1、索引元祖数组里抛除 None/np.newaxis 后，索引元祖数组长度不及被索引数组的维度数
    2、索引元祖数组里有Ellipsis（索引元祖数组里最多只能有一个Ellipsis）
    */
    let arrShape = shape(arr);
    let arrNdim = arrShape.length || 0;

    //首先 从索引元祖数组里 数(找)出 除了 None/np.newaxis/Ellipsis 以外，有几个有效(有用)的索引元素
    //数，有几个有效的索引元素时，注意多维布尔数组的问题
    //检查索引元祖数组里有几个有效(有用)的索引元素
    let haveBooleanArray = false;//索引元组里有布尔数组
    let canNum = 0;//有效的索引元素数量
    let indexingTupleArr = [].concat(indexingTuple);
    let EllipsisNum = 0;//Ellipsis数量
    let EllipsisIndex = -1;//Ellipsis位置
    for (let i = 0; i < indexingTupleArr.length; i++) {
        let item = indexingTupleArr[i];
        let itemType = String(item);

        if (itemType != 'None' && itemType != 'Ellipsis') {
            if (isBooleanArray(item)) {
                //是布尔数组，则不能默认+1，要根据布尔数组的维度数量来加
                let booleanArrayShape = shape(item)
                canNum = canNum + booleanArrayShape.length;
                haveBooleanArray = true;
            } else {
                //不是None/Ellipsis、布尔数组，则默认+1
                canNum = canNum + 1;
            }
        }
        if (itemType == 'Ellipsis') {
            EllipsisNum++;
            EllipsisIndex = i;
        }
    }
    if (EllipsisNum > 1) {
        throw new Error('索引元组 错误：索引元祖数组里最多只能有一个Ellipsis')
    }
    //数出索引元祖数组里有几个有效的索引元素后
    //1、如果有效的索引元素数量不及被索引数组的维度数，则在索引元组末尾补充所需数量的slice(None,None,None)
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
        throw new Error(`索引元组 错误：被索引数组是一个${arrNdim}维数组 但却有${canNum + needAddNum}个索引元素`)
    }
    // console.log('indexingTupleArr：',indexingTupleArr);
    /*为 索引元祖数组 补全 索引元素 end*/

    /*
    索引元组里存在布尔数组，让布尔数组与其对应的维度的形状进行校验，校验通过后将布尔数组转换成整数数组 start
    */
    if (haveBooleanArray) {
        //校验布尔数组
        let shapeArrIndex = -1;//当前对应的形状数组下标是多少
        for (let i = 0; i < indexingTupleArr.length; i++) {
            let item = indexingTupleArr[i];
            let itemType = String(item);

            if (itemType != 'None') {
                shapeArrIndex++;
                if (isBooleanArray(item)) {
                    let booleanArrayShape = shape(item)
                    //取出，对应布尔数组的维度的形状
                    let start = shapeArrIndex;
                    let end = shapeArrIndex + booleanArrayShape.length;
                    let booleanInShapeArr = arrShape.slice(start, end);
                    //校验 布尔数组的形状 与其对应的维度的形状 是否匹配
                    if (booleanInShapeArr.join() != booleanArrayShape.join()) {
                        throw new Error(`索引元组 错误：布尔数组的形状是${booleanArrayShape}，但其对应维度的形状是${booleanInShapeArr}`)
                    } else {
                        shapeArrIndex = end - 1;//减1，是为了，下次循环时上边shapeArrIndex++不出错
                    }
                }
            }
        }
        //布尔数组转换成整数数组
        for (let i = 0; i < indexingTupleArr.length; i++) {
            if (isBooleanArray(indexingTupleArr[i])) {
                let integerArray = booleanArrayToIntegerArray(indexingTupleArr[i]);
                indexingTupleArr.splice(i, 1)//删除原布尔数组
                for (let j = 0; j < integerArray.length; j++) {
                    indexingTupleArr.splice(i + j, 0, integerArray[j]);//在原布尔数组的位置，插入整数数组
                }
            }
        }
    }
    // console.log("indexingTupleArr：");
    // console.log(indexingTupleArr);
    /*
    索引元组里存在布尔数组，让布尔数组与其对应的维度的形状进行校验，校验通过后将布尔数组转换成整数数组 end
    */

    /*
    判断索引是什么类型，然后交给相应索引方法去处理 start 
    */
    //索引分三种：纯基本索引、纯高级索引、基本索引和高级索引相结合
    let isBasicIndexing = false;//是否是基本索引。
    let isAdvancedIndexing = false;//是否是高级索引。判断高级索引比较简单，indexingTupleArr里有数组，就算高级索引
    for (let i = 0; i < indexingTupleArr.length; i++) {
        let item = indexingTupleArr[i];
        let itemType = String(item);

        //先检测索引元素是不是数组，然后再检测索引元素是不是整数。这样可以避免String([[1]])==>"1"的bug
        if (Array.isArray(item)) {
            isAdvancedIndexing = true;
        }

        let sliceHaveNum = false;
        if (itemType == 'slice') {
            if (String(item.start) != 'None' || String(item.stop) != 'None' || String(item.step) != 'None') {
                sliceHaveNum = true;
            }
        }

        if (itemType == 'None' || /^-?\d+$/.test(itemType) || sliceHaveNum) {
            isBasicIndexing = true;
        }
    }

    if (isBasicIndexing && isAdvancedIndexing) {
        //基本索引和高级索引相结合
        //将索引元组分成 纯基本索引 和 纯高级索引 两个
        //基本索引和高级索引相结合时，分离出来的纯高级索引元组长度 可能比 被索引数组的维度长，但这是正常的。因为当基本索引和高级索引相结合时，会从原始索引元组里分离出两个索引元组，一个是纯基本索引元组，一个是纯高级索引元组，然后会优先执行纯基本索引，然后再用纯基本索引的结果执行高级索引。
        let BI = [];//纯基本索引
        let AI = [];//纯高级索引
        for (let i = 0; i < indexingTupleArr.length; i++) {
            let item = indexingTupleArr[i];
            let itemType = String(item);

            if (Array.isArray(item) || /^-?\d+$/.test(itemType)) {
                //基本索引和高级索引相结合时，整数 算高级索引
                //当前 索引元素 属于高级索引
                AI.push(item);
                BI.push(slice(None));//当前索引元素属于高级索引。同一位置，基本索引这里，用slice(None)替换(当前索引元素)
            } else {
                //当前 索引元素 属于基本索引
                BI.push(item);
                AI.push(slice(None));//当前索引元素属于基本索引。同一位置，高级索引这里，用slice(None)替换(当前索引元素)
            }
        }

        // console.log('基本索引和高级索引相结合-纯基本索引元组：',BI.length,BI);
        // console.log('基本索引和高级索引相结合-纯高级索引元组：',AI.length,AI);
        // return false;
        //先用 从原始索引元组里 分离出来的纯基本索引元组 执行基本索引，基本索引执行结束后，再用基本索引的执行结果和纯高级索引元组执行高级索引
        return integerArrayIndexing(basicIndexing(arr, BI, undefined, true), AI, value)
    }

    if (isBasicIndexing == false && isAdvancedIndexing == false) {
        //索引元组里全是slice(None)的情况
        isBasicIndexing = true
    }

    if (isBasicIndexing) {
        //纯基本索引
        //return console.log("基本索引：",indexingTupleArr.length,indexingTupleArr);
        return basicIndexing(arr, indexingTupleArr, value)
    } else {
        //纯高级索引
        //这里高级索引直接调用整数数组索引方法，是因为布尔数组在上边优化索引元组时，就已经被转换成整数数组了，所以这里不需要在区分是整数数组还是布尔数组，所以这里就直接调用了整数数组的方法
        //return console.log("高级索引：",indexingTupleArr.length,indexingTupleArr);
        return integerArrayIndexing(arr, indexingTupleArr, value)
    }
    /*
    判断索引是什么类型，然后交给相应索引方法去处理 end
    */
}
exports.indexing = indexing;





//基本索引
//处理基本索引
function basicIndexing(arr, indexingTuple, value, debug) {
    /*
    arr 被索引数据
    indexingTuple py里索引元祖，js这里用一个一维数组代替
    value 根据索引结果赋的值
    debug 调试模式，布尔值。开始调试模式后，索引结果的每一个数据，不是数值，而是对象，对象内包含数据值和该数据值的原始坐标（debug模式，一般用在，基本索引和高级索引相结合，和，高级索引获取数据时，这两种情况）
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
    //console.log(`resultShape：[${resultShape.join()}] => [${newResultShape.join()}]`);
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
    // console.log("size：", resultDataArr.length)
    // for (let i = 0; i < resultDataArr.length; i++) {
    //     console.log(resultDataArr[i])
    // }
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
    /*调整索引结果数据的顺序(处理slice(i,j,k) k是负值的情况) end*/

    //打印索引结果
    if (!debug) {
        console.log(`resultShape：[${resultShape.join()}] => [${newResultShape.join()}]`);
        console.log("newResultDataArr.size：", newResultDataArr.length)
        for (let i = 0; i < newResultDataArr.length; i++) {
            console.log(newResultDataArr[i].value)
        }
    }

    /*将索引结果数据 整理成 索引结果形状 start*/
    if (debug) {
        console.log(`basicIndexing-resultShape：[${resultShape.join()}] => [${newResultShape.join()}]`);
        if(newResultShape.length == 0 && newResultDataArr.length==1){
            //索引结果是一个 标量
            return newResultDataArr[0];
        }else{
            //索引结果是一个 数组
            return reshape(newResultDataArr, newResultShape);
        }
    }
    /*将索引结果数据 整理成 索引结果形状 end*/

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



var a = reshape(arange(2 * 3 * 4 * 5 * 6), [2, 3, 4, 5, 6]) //a=np.arange(2*3*4*5*6).reshape(2,3,4,5,6)
var a1 = arange(5) //a1=np.arange(5)
var a2 = reshape(arange(1, 7), [2, 3, 1]) //a2=np.arange(1,7).reshape(2,3,1)
//indexing(a,[Ellipsis,1])
//indexing(a,[Ellipsis,1,Ellipsis]) //=>Error: 基本索引 错误：索引元祖里最多只能有一个Ellipsis
//indexing(a,[slice(1),Ellipsis,1])
//indexing(a,[slice(1),1,Ellipsis])
//indexing(a,[slice(1),1])
//indexing(a,[1,1,1,1,1])
//indexing(a,[1,None,Ellipsis,slice(1)])

//indexing(a,[1,1,1,1,1,1]) //=>Error: 基本索引 错误：被索引数组是一个5维数组 但却有6个索引参数
//indexing(a,[None,1,None,1,1,Ellipsis,1,1])
//indexing(a,[None,1,Ellipsis,1,1])

//indexing(a,[1,slice(None,None,None),slice(None,None,-1),slice(1,None,1)])
//indexing(a,[1,slice(None,None,None),slice(3,0,-1),slice(1,None,1)])
//indexing(a,[1,slice(10,10,1)])
//indexing(a,[1,None,slice(0,1,1),slice(0,None,2),slice(1,5,3),slice(0,5,2)])

//indexing(a,[1,None,slice(1,0,-1),slice(None,0,-2),slice(5,1,-3),slice(5,0,-2)])
//indexing(a,[1,None,slice(1,0,-1),slice(0,None,2),slice(5,1,-3),slice(5,0,-2)])
//indexing(a,[slice(2,None,-1),None,slice(2,0,-1),slice(0,None,2),slice(5,1,-3),slice(5,0,-2)])

//indexing(a1,[slice(None),None])
//indexing(a1,[None,slice(None)])
//indexing(a2,[slice(None),None,slice(None),slice(None)])
//indexing(a2,[slice(None),slice(None),0])

//indexing(a,[slice(None),slice(None),Ellipsis])

//indexing(a,[0,2,slice(None),1,1])
//indexing(a,[0,2,1,1,1])

// ------------------------------------------

indexing(a,[[[False,False,True],[True,False,False]],None])
//indexing(a,[None,[[False,False,True],[True,False,False]],None])
//indexing(a,[None,slice(None),[[False,False,True],[True,False,False]],None]) // 报错了，但是正确的
//indexing(a,[[[False,False,True,True],[True,False,False,True]],None]) // 报错了，但是正确的
//indexing(a,[[True,False],None])
//indexing(a,[[True,False,False],None]) // 报错了，但是正确的
//indexing(a,[[[False,False,True],[True,False,False]],None,slice(None),[True,True,True,True]]) //报错了，但是正确的
//indexing(a,[[[False,False,True],[True,False,False]],None,slice(None),[True,True,True,True,False]]) //(符合索引元组规则，但广播时会报错)
//indexing(a, [[[False, False, True], [True, False, False]], None, slice(None), [[[False]]]]) //报错了，但是正确的
//indexing(a, [[[False, False, False], [False, False, False]], None, slice(None)])
//indexing(a,[[[False,False,True],[True,False,False]],slice(None),[1,2],1])

//indexing(a,[[[False,False,True],[True,False,False]],slice(None),[1,2]])
//indexing(a,[[[False,False,True],[True,False,False]],[1,2]])

//indexing(a,[slice(None),[],slice(None),[]])
//indexing(a,[slice(None),slice(None),[],slice(None),[]])
//indexing(a,[slice(None),[],[],slice(None),[]])
//indexing(a,[slice(None),[],slice(None),[],[]])
//indexing(a,[slice(None),[],slice(None),slice(None),[]])
//indexing(a,[slice(None),slice(None),[],slice(None),[]])
//indexing(a,[[],slice(None),[],slice(None),[]])
//indexing(a,[slice(None),slice(None),[],[],slice(None)])

//indexing(a, [[]])
//indexing(a, [slice(None),[[[]]],slice(None),[]])
//indexing(a,[slice(None),[],[[0],[1]]])

//如上这些没有报错的例子，可能也会报错，可能会报无法广播的错误。这里先不考虑广播报错，这里仅思考索引元组是否符合规则。


//处理高级索引-整数数组索引
function integerArrayIndexing(arr, indexingTuple, value) {
    /*
    arr 被索引数据
    indexingTuple py里索引元祖，js这里用一个一维数组代替
    value 根据索引结果赋的值
    */
    /*
    整数数组索引处理的大概流程：
    1、根据 arr和indexingTuple 推算出，索引结果的形状
    2、获取索引结果里的数据(不用考虑形状)
    3、将获取的数据 转换成 索引结果的形状
    4、返回索引结果
    */
    let arrShape = shape(arr);
    let arrNdim = arrShape.length || 0;
    let indexingTupleArr = [].concat(indexingTuple);
    //因为索引元组已经被优化和补全过，所以这里，索引元组内，只存在 slice(None) 整数 数组 这三种类型的数据。
    //因为索引元组已经被优化和补全过，所以这里，索引元组的长度和被索引数组维度一样长。（基本索引和高级索引相结合的情况除外）

    //预测结果形状
    /*
    匹配形状数组里元素(被索引数组的每个维度) 所对应的索引元素 start
    */
    let shapeArrToItem = {
        // "0":"slice(None,None,None)", //形状数组下标 0，对应的索引元素是，slice(None,None,None)
        // "1":3, //形状数组下标 1，对应的索引元素是，整数（整数在这里会被转换成一维数组，如：1=>[1]）
        // "2":[[1,1,1]], //形状数组下标 2，对应的索引元素是，整数数组
        // ...
    }
    for (let i = 0; i < indexingTupleArr.length; i++) {
        let item = indexingTupleArr[i];
        let itemType = String(item);

        if (itemType == 'slice') {
            shapeArrToItem[i] = "slice(None,None,None)";
        } else if (Array.isArray(item)) {//先检测索引元素是不是数组，然后再检测索引元素是不是整数。这样可以避免String([[1]])==>"1"的bug
            shapeArrToItem[i] = item;
        } else if (/^-?\d+$/.test(itemType)) {
            shapeArrToItem[i] = [item]; //索引元素是整数，所以这里把整数转换成数组
        }
    }
    /*
    匹配形状数组里元素(被索引数组的每个维度) 所对应的索引元素 end
    */

    // printArr(arr, [], (res) => {
    //     //打印矩阵里的每一个元素
    //     console.log(res.index, res.value)
    // })
    console.log('arrShape：', arrShape)
    console.log("shapeArrToItem：", shapeArrToItem);

    let firstArrIndex = -1;//索引元组里，第一个数组的坐标
    let isTranspose = false;//最终索引结果是否需要transpose
    let isTransposeArr = [];
    for (let index in shapeArrToItem) {
        let item = shapeArrToItem[index];
        if (Array.isArray(item) && firstArrIndex == -1) {
            firstArrIndex = index;
        }
        if (index >= 1) {
            //从数组下标1开始找，找 [数组,slice(None,None,None),数组] 这个结构
            if (isTransposeArr.length == 0) {
                //isTransposeArr长度是0时，需要一个数组
                if (Array.isArray(item)) {
                    isTransposeArr.push(index)
                }
            }
            if (isTransposeArr.length == 1) {
                //isTransposeArr长度是1时，需要一个slice(None,None,None)
                if (item == 'slice(None,None,None)') {
                    isTransposeArr.push(index)
                }
            }
            if (isTransposeArr.length == 2) {
                //isTransposeArr长度是2时，需要一个数组
                if (Array.isArray(item)) {
                    isTransposeArr.push(index)
                }
            }
        }
    }
    if (shapeArrToItem[0] == 'slice(None,None,None)' && isTransposeArr.length == 3) {
        isTranspose = true;
    }

    //广播索引元组里的数组
    let needBroadcastArr = [];//存放需要被广播处理的索引元素 的数组
    for (let index in shapeArrToItem) {
        let item = shapeArrToItem[index];
        if (Array.isArray(item)) {
            needBroadcastArr.push(item);
        }
    }
    console.log('before-broadcast-shapeArrToItem：', shapeArrToItem);
    let afterBroadcastShape = [];//是数组的索引元素，广播后的形状（兼职，索引结果形状，第二部分）
    if (needBroadcastArr.length > 1) {
        //索引元组里有，多个数组，需要广播处理
        let broadcastResult = broadcast(needBroadcastArr);
        let arrCount = -1;
        for (let index in shapeArrToItem) {
            let item = shapeArrToItem[index];
            if (Array.isArray(item)) {
                arrCount++;
                shapeArrToItem[index] = broadcastResult[arrCount];
                afterBroadcastShape = shape(broadcastResult[arrCount]);
            }
        }
    } else {
        //索引元组里只有，一个数组，不需要广播
        afterBroadcastShape = shape(needBroadcastArr[0])
    }
    console.log("afterBroadcastShape：", afterBroadcastShape);
    let zeroInArr = false;//是数组的索引元素，广播后的数组形状里，是否存在0
    if (afterBroadcastShape.indexOf(0) != -1) {
        zeroInArr = true;
    }
    console.log('after-broadcast-shapeArrToItem：', shapeArrToItem);

    let resultFirstShape = [];//索引结果形状，第一部分
    for (let index in shapeArrToItem) {
        let item = shapeArrToItem[index]
        if (Array.isArray(item)) {
            break;
        } else {
            resultFirstShape.push(arrShape[index])
        }
    }
    console.log("resultFirstShape：", resultFirstShape);
    //----
    let resultThirdShape = [];//索引结果形状，第三部分
    if (zeroInArr) {
        //索引结果形状里带有数字0
        for (let index in shapeArrToItem) {
            let item = shapeArrToItem[index]
            if (item == "slice(None,None,None)" && index >= firstArrIndex) {
                resultThirdShape.push(arrShape[index])
            }
        }
    } else {
        //索引结果形状里不带0
        let getResultShapeIndexingTuple = []; // 获取 基本索引索引结果 的索引元组
        for (let index in shapeArrToItem) {
            let item = shapeArrToItem[index];

            if (index < firstArrIndex) {
                getResultShapeIndexingTuple.push(0)
            } else if (Array.isArray(item)) {
                let indexingTupleItemArr = item;
                if (shape(item).length > 1) {
                    indexingTupleItemArr = reshape(item, [-1])
                }
                if (indexingTupleItemArr.length > 0) {
                    getResultShapeIndexingTuple.push(indexingTupleItemArr[0])
                } else {
                    let itemShapeSize = arrShape[index]
                    getResultShapeIndexingTuple.push(slice(itemShapeSize, itemShapeSize))
                }
            } else if (item == "slice(None,None,None)") {
                getResultShapeIndexingTuple.push(slice(None))
            }
        }
        let basicIndexingResultData = basicIndexing(arr, getResultShapeIndexingTuple, undefined, true)
        if(Array.isArray(basicIndexingResultData)){
            resultThirdShape = shape(basicIndexingResultData)
        }else{
            resultThirdShape = []
        }
    }
    console.log("resultThirdShape：", resultThirdShape);
    //---
    let resultShapeArr = [resultFirstShape, afterBroadcastShape, resultThirdShape]; //索引结果形状
    let newResultShapeArr = []; //索引结果形状2
    if (isTranspose) {
        newResultShapeArr = [afterBroadcastShape, resultFirstShape, resultThirdShape]
    } else {
        newResultShapeArr = resultShapeArr;
    }
    console.log(`isTranspose：${isTranspose} resultShapeArr：(${resultShapeArr.flat().join()}) => newResultShapeArr：(${newResultShapeArr.flat().join()})`);












}

//检测参数是否是布尔数组
//条件：1、是数组 2、数组元素值是 True/False
function isBooleanArray(arr, parentIsArr) {
    if (Array.isArray(arr)) {
        if (arr.length > 0) {
            return isBooleanArray(arr[0], true)
        } else {
            return false
        }
    } else {
        let value = String(arr);
        if (parentIsArr && value == "True" || parentIsArr && value == "False") {
            return true
        } else {
            return false
        }
    }
}
// console.log(isBooleanArray([])) // false
// console.log(isBooleanArray([True])) // true
// console.log(isBooleanArray([[False]])) // true
// console.log(isBooleanArray(False)) // false
// console.log(isBooleanArray(True)) // false

//将布尔数组索引转换成整数数组索引
function booleanArrayToIntegerArray(booleanArray) {
    let booleanArrayShape = shape(booleanArray);
    let booleanArrayNdim = booleanArrayShape.length || 0;
    let indexingArr = [];
    let arr = [];
    printArr(booleanArray, [], (res) => {
        let item = String(res.value);
        if (item == "True") {
            arr.push({
                index: res.index,
                value: res.value
            })
        } else {
            if (item != "False") {
                throw new Error('booleanArrayToIntegerArray 错误：布尔数组的元素 有非True/False值')
            }
        }
    })
    for (let i = 0; i < booleanArrayNdim; i++) {
        indexingArr.push([])//创建数组
        for (let j = 0; j < arr.length; j++) {
            indexingArr[i].push(arr[j].index[i])
        }
    }
    return indexingArr
}
// console.log(booleanArrayToIntegerArray([[True,True,False],[False,True,True]])) // [ [ 0, 0, 1, 1 ], [ 0, 1, 1, 2 ] ]
// console.log(booleanArrayToIntegerArray([])) // 报错是正确的
// console.log(booleanArrayToIntegerArray([False,False,False])) // [ [] ]
// console.log(booleanArrayToIntegerArray([True,False,False])) // [ [ 0 ] ]




