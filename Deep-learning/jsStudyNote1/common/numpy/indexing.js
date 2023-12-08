const Main = require('./main.js');
var shape = Main.shape;
var create_array = Main.create_array;

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
    if(/^-?\d+$/.test(String(start)) && String(stop) == 'None' && String(step) == 'None'){
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










function indexing(arr, indexingTuple) {
    /*
    arr 被索引数据
    indexingTuple py里索引元祖，js这里用一个一维数组代替
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
        return basicIndexing(arr, indexingTuple)
    }
}
exports.indexing = indexing;



//基本索引
//处理基本索引
function basicIndexing(arr, indexingTuple) {
    /*
    arr 被索引数据
    indexingTuple py里索引元祖，js这里用一个一维数组代替
    */
    /*
    处理流程：
    1、根据 arr和indexingTuple 推算出，索引结果的形状。
    2、获取索引结果里的数据(不用考虑形状)
    3、将获取的数据 转换成 索引结果的形状
    4、返回索引结果
    */
    let arrShape = shape(arr);
    let arrNdim = arrShape.length || 0;
    /*
    索引补全 start
    什么时候需要补全？
    索引元祖里抛除 None/np.newaxis 后，索引元祖长度不及被索引数组的维度数
    索引元祖里有Ellipsis（索引元祖里最多只能有一个Ellipsis）

    首先 数出 除了None/np.newaxis/Ellipsis 以外，有几个有效(有用)索引元素
    */
    //检查索引里有几个有效(有用的索引元素)
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
        throw new Error('基本索引 错误：索引元祖里最多只能有一个Ellipsis')
    }
    let needAddNum = 0;//索引元祖里，需要补充多少个slice(None,None,None)
    needAddNum = arrNdim-canNum<=0?0:arrNdim-canNum;
    if(EllipsisNum!=0){
        //有Ellipsis时，在Ellipsis所处的位置，将Ellipsis替换成所需数量的slice(None,None,None)
        indexingTupleArr.splice(EllipsisIndex,1)//删除Ellipsis
        for(let i=0;i<needAddNum;i++){
            indexingTupleArr.splice(EllipsisIndex,0,slice(None));//在Ellipsis的位置，插入可需数量的slice(None,None,None)
        }
    }else{
        //没有Ellipsis时，在索引元祖末尾插入所需数量的slice(None,None,None)
        for(let i=0;i<needAddNum;i++){
            indexingTupleArr.push(slice(None));//在数组末尾的位置，插入可需数量的slice(None,None,None)
        }
    }
    if(arrNdim<canNum+needAddNum){
        throw new Error(`基本索引 错误：被索引数组是一个${arrNdim}维数组 但却有${canNum+needAddNum}个索引参数`)
    }
    // console.log('indexingTupleArr：',indexingTupleArr);
    /*索引补全 end*/
    /*
    形状数组里元素(被索引数组的每个维度)对应的索引参数 start
    */
    let shapeArrToIndexingTupleArr = {
        // "0":"1", //形状数组下标 0，对应索引元祖数组下标是1的索引元素
        // "1":"3", //形状数组下标 1，对应索引元祖数组下标是3的索引元素
        // "2":"5", //形状数组下标 2，对应索引元祖数组下标是5的索引元素
        // ...
    }
    let shapeArrIndex = -1;
    for(let i=0;i<indexingTupleArr.length;i++){
        let item = String(indexingTupleArr[i]);
        if(item != 'None'){
            shapeArrIndex++;
            shapeArrToIndexingTupleArr[shapeArrIndex] = i;
        }
    }
    // console.log("shapeArrToIndexingTupleArr：",shapeArrToIndexingTupleArr);
    // 为，被索引数组的每个维度，所对应，的索引参数，补全索引参数，如将slice(1,None,None)补成slice(1,10,1)
    // 到达这里 indexingTupleArr 里只存在 None 整数 slice
    for(let key in shapeArrToIndexingTupleArr){
        let shape_idx = key;
        let indexingTupleArr_idx = shapeArrToIndexingTupleArr[shape_idx];
        let item = String(indexingTupleArr[indexingTupleArr_idx]);
        if(item == 'slice'){
            if(String(indexingTupleArr[indexingTupleArr_idx].step) == 'None'){
                indexingTupleArr[indexingTupleArr_idx].step = 1
            }
            if(String(indexingTupleArr[indexingTupleArr_idx].start) == 'None'){
                if(indexingTupleArr[indexingTupleArr_idx].step > 0){
                    indexingTupleArr[indexingTupleArr_idx].start = 0
                }else{
                    indexingTupleArr[indexingTupleArr_idx].start = arrShape[shape_idx] - 1;
                }
            }
            if(String(indexingTupleArr[indexingTupleArr_idx].stop) == 'None'){
                if(indexingTupleArr[indexingTupleArr_idx].step > 0){
                    indexingTupleArr[indexingTupleArr_idx].stop = arrShape[shape_idx]
                }else{
                    indexingTupleArr[indexingTupleArr_idx].stop = -arrShape[shape_idx] - 1;
                }
            }
        }
    }
    console.log('indexingTupleArr2：',indexingTupleArr);
    /*
    数组每个维度对应的索引参数 end
    */

    /*将numpy负索引转成正常索引下标；获取slice的数据下标；预测索引结果形状 start*/
    //根据上边 shapeArrToIndexingTupleArr 数组，形状数组里元素(被索引数组的每个维度)与对应的索引参数，得出来的每个维度被索引的数据下标
    let dataIndex = {
        // "0":[1,2,3,4], //这里"0"是shape数组里的数据下标；为什么用shape数组，因为没有比shape数组能更好展示数据维度的方式了
        // "1":[0],
        // "2":[5,6,7],
        // ...
    }





    /*将numpy负索引转成正常索引；预测索引结果形状 end*/

    


}

function get_number_index(d,i){
    //1、如果i是numpy负索引，则转成正常索引
    i = i < 0 ? d + i : i;
    return [i];
}


//获取被索引数组维度slice参数的数据下标
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







var a=create_array([2,3,4,5,6],1)
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
