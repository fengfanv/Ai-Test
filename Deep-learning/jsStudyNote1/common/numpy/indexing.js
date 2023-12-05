const Main = require('./main.js');
var shape = Main.shape;
var create_array = Main.create_array;

/*
索引和切片
*/

/*切片 slice
只接受两种类型的参数 None 或 数值
*/
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
        if (itemType != 'None' && itemType != 'number') {
            throw new Error('slice 错误：入参只接受 None 或 数值')
        }
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

/*省略号 Ellipsis ...*/
var Ellipsis = {
    "name": "Ellipsis",
    "toString": () => {
        return "Ellipsis"
    },
}
Object.freeze(Ellipsis); //冻结对象，防止对象属性被修改
exports.Ellipsis = Ellipsis;

/*None 可用于slice里，也可用于索引元祖里(用于索引元祖里时和np.newaxis意思一样)*/
var None = {
    "name": "None",
    "toString": () => {
        return "None"
    },
}
Object.freeze(None);
exports.None = None;



/*
var arr = [slice(None,None,None),Ellipsis,None,1,[11111]]
[
  { name: 'slice' },
  { name: 'Ellipsis' },
  { name: 'None' },
  1,
  [ 11111 ]
]
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
        return basicIndexing(arr, indexingTuple)
    } else {
        return advancedIndexing(arr, indexingTuple)
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
    let indexingTupleArr = JSON.parse(JSON.stringify(indexingTuple));
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

    console.log('indexingTupleArr：',indexingTupleArr);





    /*索引补全 end*/

    //数组每个维度对应的索引参数
    // let indexObj = {
    //     // "0":"1",
    //     // "1":{
    //     //     "name":"slice"
    //     // }
    // };
    // for (let i = 0; i < arrNdim; i++) {

    // }
}

var a=create_array([2,3,4,5,6,7,8],1)
indexing(a,[Ellipsis,1])




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
