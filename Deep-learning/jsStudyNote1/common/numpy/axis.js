const Main = require('./main.js');
var shape = Main.shape;
var arange = Main.arange;

const Common = require('./common.js');
var multiply = Common.multiply;

const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;
/*

实现“获取数据指定的轴”的方法

关于“获取数据指定的轴”方法的运行原理，请看，axis.py，细心看，一看你就能明白

*/

//从 标记数组 里，从左往右找，找没有被使用过的数据
function getUnusedNumberFromTagArr(arr){
    for(let i=0;i<arr.length;i++){
        if(arr[i]!='*'){
            return i;
        }
    }
}


function getAxis(arr, axis) {
    /*
    arr 数组，array类型
    axis 指定获取arr的哪一个轴，number类型
    */
    let arrInfo = {
        shape: shape(arr),//数据的形状
        shapeAxis:null,//形状数组里，与，当前轴，所对应，的那个形状值，纯数字
        resultShape:null,//根据某个轴进行运算后，返回的结果的数组形状，如在numpy.sum，numpy.max里，根据某个轴运算后，的运算结果的数组形状；如果是空数组，说明结果是纯数字
        axisLength:null,//当前轴有几组数据，纯数字
        strides:null,//当前轴，在一维数组里提取数据时，数据与数据之间的间隔，纯数字
        ravel:reshape(arr,[-1]),//数据展开成一维数组
        tagArr:arr.concat(),//标记数组，提取数据时，用于标记已被使用过的数据
        axisArr:[],//当前轴的数据
    }

    if (axis > arrInfo.shape.length - 1){
        throw new Error('getAxis:error 当前arr不存在轴（axis:'+axis+'）')
    }

    arrInfo.shapeAxis = arrInfo.shape[axis];

    arrInfo.resultShape = arrInfo.shape.concat();//拷贝数组
    arrInfo.resultShape.splice(axis,1);

    if(arrInfo.resultShape.length == 0){
        arrInfo.axisLength = 1;
    }else{
        arrInfo.axisLength = multiply(arrInfo.resultShape[0],arrInfo.resultShape,1);
    }

    let stridesArr = arrInfo.shape.slice(axis+1);
    if(stridesArr.length == 0){
        arrInfo.strides = 1;
    }else{
        arrInfo.strides = multiply(stridesArr[0],stridesArr,1);
    }

    arrInfo.tagArr = arrInfo.ravel.concat();//拷贝数组

    //开始提取轴数据
    for(let i=0;i<arrInfo.axisLength;i++){
        let a_set_arr = [];//一组数据

        let firstValueIndex = getUnusedNumberFromTagArr(arrInfo.tagArr);//在标记数组里，从左往右，寻找没有被标记的数据
        for(let j=0;j<arrInfo.shapeAxis;j++){
            let index = firstValueIndex+(j*arrInfo.strides);
            let value = arrInfo.ravel.slice(index,index+1)[0];
            arrInfo.tagArr[index] = '*';//打上标记，表示数据已经被使用过
            a_set_arr.push(value)
        }
        arrInfo.axisArr.push(a_set_arr)
    }
    //提取 轴数据 完毕，返回提取结果
    return arrInfo;
}
exports.get_axis = getAxis;


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

// 测试

// let a = reshape(arange(4*3*2),[4,3,2])
// console.log(shape(a)) //[ 4, 3, 2 ]
// console.log(a)
/*
[
  [ [ 0, 1 ], [ 2, 3 ], [ 4, 5 ] ],
  [ [ 6, 7 ], [ 8, 9 ], [ 10, 11 ] ],
  [ [ 12, 13 ], [ 14, 15 ], [ 16, 17 ] ],
  [ [ 18, 19 ], [ 20, 21 ], [ 22, 23 ] ]
]
*/
// console.log(getAxis(a,0))
/*
{
  resultShape: [ 3, 2 ],
  axisArr: [
    [ 0, 6, 12, 18 ],
    [ 1, 7, 13, 19 ],
    [ 2, 8, 14, 20 ],
    [ 3, 9, 15, 21 ],
    [ 4, 10, 16, 22 ],
    [ 5, 11, 17, 23 ]
  ]
}
*/
// console.log(getAxis(a,1))
/*
{
  resultShape: [ 4, 2 ],
  axisArr: [
    [ 0, 2, 4 ],
    [ 1, 3, 5 ],
    [ 6, 8, 10 ],
    [ 7, 9, 11 ],
    [ 12, 14, 16 ],
    [ 13, 15, 17 ],
    [ 18, 20, 22 ],
    [ 19, 21, 23 ]
  ]
}
*/
// console.log(getAxis(a,2))
/*
{
  resultShape: [ 4, 3 ],
  axisArr: [
    [ 0, 1 ],   [ 2, 3 ],
    [ 4, 5 ],   [ 6, 7 ],
    [ 8, 9 ],   [ 10, 11 ],
    [ 12, 13 ], [ 14, 15 ],
    [ 16, 17 ], [ 18, 19 ],
    [ 20, 21 ], [ 22, 23 ]
  ]
}
*/

//------------------------------------------------------

// let a = reshape(arange(4*3*2*1),[4,3,2,1])
// console.log(shape(a)) //[ 4, 3, 2, 1 ]
// console.log(getAxis(a,0))
/*
{
  resultShape: [ 3, 2, 1 ],
  axisArr: [
    [ 0, 6, 12, 18 ],
    [ 1, 7, 13, 19 ],
    [ 2, 8, 14, 20 ],
    [ 3, 9, 15, 21 ],
    [ 4, 10, 16, 22 ],
    [ 5, 11, 17, 23 ]
  ]
}
*/
// console.log(getAxis(a,1))
/*
{
  resultShape: [ 4, 2, 1 ],
  axisArr: [
    [ 0, 2, 4 ],
    [ 1, 3, 5 ],
    [ 6, 8, 10 ],
    [ 7, 9, 11 ],
    [ 12, 14, 16 ],
    [ 13, 15, 17 ],
    [ 18, 20, 22 ],
    [ 19, 21, 23 ]
  ],
}
*/
// console.log(getAxis(a,2))
/*
{
  resultShape: [ 4, 3, 1 ],
  axisArr: [
    [ 0, 1 ],   [ 2, 3 ],
    [ 4, 5 ],   [ 6, 7 ],
    [ 8, 9 ],   [ 10, 11 ],
    [ 12, 13 ], [ 14, 15 ],
    [ 16, 17 ], [ 18, 19 ],
    [ 20, 21 ], [ 22, 23 ]
  ],
}
*/
// console.log(getAxis(a,3))
/*
{
  resultShape: [ 4, 3, 2 ],
  axisArr: [
    [ 0 ],  [ 1 ],  [ 2 ],  [ 3 ],
    [ 4 ],  [ 5 ],  [ 6 ],  [ 7 ],
    [ 8 ],  [ 9 ],  [ 10 ], [ 11 ],
    [ 12 ], [ 13 ], [ 14 ], [ 15 ],
    [ 16 ], [ 17 ], [ 18 ], [ 19 ],
    [ 20 ], [ 21 ], [ 22 ], [ 23 ]
  ],
}
*/
//------------------------------------------------------------
// let a = reshape(arange(1*4*3*2*1),[1,4,3,2,1])
// console.log(shape(a)) //[ 1, 4, 3, 2, 1 ]
// console.log(getAxis(a,0))
/*
{
  resultShape: [ 4, 3, 2, 1 ],
  axisArr: [
    [ 0 ],  [ 1 ],  [ 2 ],  [ 3 ],
    [ 4 ],  [ 5 ],  [ 6 ],  [ 7 ],
    [ 8 ],  [ 9 ],  [ 10 ], [ 11 ],
    [ 12 ], [ 13 ], [ 14 ], [ 15 ],
    [ 16 ], [ 17 ], [ 18 ], [ 19 ],
    [ 20 ], [ 21 ], [ 22 ], [ 23 ]
  ],
}
*/

// console.log(getAxis(a,1))
/*
{
  resultShape: [ 1, 3, 2, 1 ],
  axisArr: [
    [ 0, 6, 12, 18 ],
    [ 1, 7, 13, 19 ],
    [ 2, 8, 14, 20 ],
    [ 3, 9, 15, 21 ],
    [ 4, 10, 16, 22 ],
    [ 5, 11, 17, 23 ]
  ],
}
*/
// console.log(getAxis(a,2))
/*
{
  resultShape: [ 1, 4, 2, 1 ],
  axisArr: [
    [ 0, 2, 4 ],
    [ 1, 3, 5 ],
    [ 6, 8, 10 ],
    [ 7, 9, 11 ],
    [ 12, 14, 16 ],
    [ 13, 15, 17 ],
    [ 18, 20, 22 ],
    [ 19, 21, 23 ]
  ],
}
*/

// console.log(getAxis(a,3))
/*
{
  resultShape: [ 1, 4, 3, 1 ],
  axisArr: [
    [ 0, 1 ],   [ 2, 3 ],
    [ 4, 5 ],   [ 6, 7 ],
    [ 8, 9 ],   [ 10, 11 ],
    [ 12, 13 ], [ 14, 15 ],
    [ 16, 17 ], [ 18, 19 ],
    [ 20, 21 ], [ 22, 23 ]
  ],
}
*/

// console.log(getAxis(a,4))
/*
{
  resultShape: [ 1, 4, 3, 2 ],
  axisArr: [
    [ 0 ],  [ 1 ],  [ 2 ],  [ 3 ],
    [ 4 ],  [ 5 ],  [ 6 ],  [ 7 ],
    [ 8 ],  [ 9 ],  [ 10 ], [ 11 ],
    [ 12 ], [ 13 ], [ 14 ], [ 15 ],
    [ 16 ], [ 17 ], [ 18 ], [ 19 ],
    [ 20 ], [ 21 ], [ 22 ], [ 23 ]
  ],
}
*/

//---------------------------------------------------------

// let a = arange(10)
// console.log(shape(a)); //[ 10 ]
// console.log(getAxis(a,0))
/*
{
  resultShape: [],
  axisArr: [
    [
      0, 1, 2, 3, 4,
      5, 6, 7, 8, 9
    ]
  ],
}
*/
// console.log(getAxis(a,1)) //报错，是正常的