/*
索引和切片
*/

/*切片 slice*/
function slice(start,stop,step){
    if(typeof start == 'undefined'){
        throw new Error('slice 错误：请至少传入一个参数')
    }
    if(typeof stop == 'undefined'){
        stop = None;
    }
    if(typeof step == 'undefined'){
        step = None;
    }
    return {
        "name":"slice",
        "start":start,
        "stop":stop,
        "step":step
    }
}
exports.slice = slice;

/*省略号 Ellipsis ...*/
var Ellipsis = {
    "name":"Ellipsis"
}
Object.freeze(Ellipsis); //冻结对象，防止对象属性被修改
exports.Ellipsis = Ellipsis;

/*None 可用于slice里，也可用于索引元祖里(用于索引元祖里时和np.newaxis意思一样)*/
var None = {
    "name":"None"
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
    for(let i=0;i<indexingTuple.length;i++){
        let item = indexingTuple[i];
        if(Array.isArray(item)){
            isAdvancedIndexing = true;
            break;
        }
    }
    if(isAdvancedIndexing){
        return basicIndexing(arr,indexingTuple)
    }else{
        return advancedIndexing(arr,indexingTuple)
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




}


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
