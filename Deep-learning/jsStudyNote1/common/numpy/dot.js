const Main = require('./main.js');
var shape = Main.shape;
var arange = Main.arange;

const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Common = require('./common.js');
var printArr = Common.printArr;
var multiply = Common.multiply;

const Transpose = require('./transpose.js');
var transpose = Transpose.transpose;

const Broadcast = require('./broadcast.js')
var broadcast = Broadcast.broadcast;

/*

实现numpy.dot方法

关于numpy.dot方法的运行基本操作，请看dot.py和 书，细心看，一看你就能明白

关于numpy.dot的总结：

如：numpy.dot(a,b)

1、a或b都是数字，或，a或b其中一个是数字，则执行乘法

2、a和b都是一维数组，点积运算
条件：要求两个一维数组是一样长，如何计算，请看dot.py

3、a和b，一方是一维数组，另一方是二维及以上的数组，（如果a是一维，b是二维及以上，是一套规则（左行右列，准则））（如果a是二维及以上，b是一维，又是一套规则（左行右列，准则））
情况1：
a.shape = [3]，b.shape = [3,2]，dot(a,b).shape = [2]
上面的案例，左边是一维，右边是二维及以上，根据左行右列准则（左行右列准则，请在心中冥想，书上教的左行右列dot计算），要求右边数组倒数第二维的数量，与，左边一维的数量是一样的，才允许运算
如果 a.shape = [3]，b.shape = [4,2]，在进行dot运算时就会报错，报错原因是因为，a一维的数量是3，而b的倒数第二维是4，所以报错（心中冥想，书上教的左行右列dot计算，你就会知道为什么会报错）
如果 a.shape = [3]，b.shape = [5,4,3,2] 所得出的结果是 [5,4,2]
情况2：
a.shape = [2,3]，b.shape = [3]，dot(a,b).shape = [2]
上面的案例，左边是二维及以上，右边是一维，根据左行右列准则（左行右列准则，请在心中冥想，书上教的左行右列dot计算），要求左边最后一维的数量，与，右一维的数量是一样的，才允许运算
如果a.shape = [2,4]，b.shape = [3]，在进行dot运算时就会报错，报错原因是因为，a最后一维是4，而b一维的数量是3，所以报错（心中冥想，书上教的左行右列dot计算，你就会知道为什么会报错）
如果 a.shape = [5,4,2,3]，b.shape = [3] 所得出的结果是 [5,4,2]

4、a和b，都是二维数组，矩阵点积
如：a.shape = [4,3]，b.shape = [3,6]，dot(a,b).shape = [4,6]
要求左边数组的最后一维，与，右边数组的第一维，数量一样，才可以运算（如你有点糊涂，那请在心中冥想，书上教的左行右列dot计算）
如果a.shape = [4,3]，b.shape = [4,6]，就会报错，报错原因是因为，a的最后一维是3，而b的第一维是4，所以报错（心中冥想，书上教的左行右列dot计算，你就会知道为什么会报错）
如果 a.shape = [8,7]，b.shape = [7,9] 所得出的结果是 [8,9]

5、a和b，一边是二维，另一边是三维及以上，或，两边都是三维及以上
如：a.shape = [1,2,3,4]，b.shape = [5,6,4,7]，dot(a,b).shape = [1,2,3, 5,6, 7]
要求左边数组的最后一维，与，右边数组的倒数第二维，大小一样，才可以运算（如你有点糊涂，那请在心中冥想，书上教的左行右列dot计算）
如果a.shape = [1,2,3,4]，b.shape = [5,6,7,8]，在进行dot运算时就会报错，报错原因是因为，a最后一维是4，而b倒数第二维是7，所以报错（心中冥想，书上教的左行右列dot计算，你就会知道为什么会报错）
如果a.shape = [1,2]，b.shape = [5,6,2,8]，所得出的结果是 [1, 5,6, 8]
如果a.shape = [5,6,7,8]，b.shape = [8,9]，所得出的结果是 [5,6,7, 9]

我是如何观察到上面的规律的？
第一 得感谢讲dot的那本书，让我了解到了左行右列这种运算方式，
第二 在dot.py文件里，通过对 各种形状的数据，进行大量的dot运算和实验，在一步一步试错和试验中，发现规律
第三 感谢numpy官网文档，和菜鸟教程文档
第四 感谢代码报错时，的报错提示信息

如何完成 重写dot方法 这样的任务？
第一（目标）设目标（或目的），（如，我要使用js重写dot方法）
第二（观察）找资料，写demo案例，进行大量实验，观察原始numpy是怎么运行的
第三（总结）根据上面实验，资料，获取到的信息，使用文字描述出 将要实现的功能，是干啥的，怎么运行，运行条件，运行注意事项等
第四（实现）根据上面的文字描述，使用代码实现功能

最后说一句，写完代码后，测试千万不要懒，一定要趁代码刚出炉，还有热乎劲，多测测，要不以后出问题了，不好修改。
*/

//点积运算
function dotProduct(arr1, arr2) {
    let result = 0;
    for (let i = 0; i < arr1.length; i++) {
        let arr1Item = arr1[i];
        let arr2Item = arr2[i];
        result = result + (arr1Item * arr2Item);
    }
    return result;
}

function dot(a, b) {
    let arrInfo = {
        aShape: shape(a),//a的形状
        bShape: shape(b),//b的形状
        aNdim:0,//a的维度
        bNdim:0,//b的维度
    };
    arrInfo['aNdim'] = arrInfo.aShape.length;
    arrInfo['bNdim'] = arrInfo.bShape.length;

    //1、检查两数组形状是否支持dot运算
    //2、生成结果数组形状
    //3、处理两个数组，然后计算，最后返回结果
    if ((arrInfo.aNdim == 0 && arrInfo.bNdim != 0) || (arrInfo.aNdim != 0 && arrInfo.bNdim == 0)) {
        //a和b有一边是数字，一边是数组，执行乘法
        let arr = null;
        let value = null;
        if (arrInfo.aNdim > 0) {
            arr = JSON.parse(JSON.stringify(a));
            value = b;
        } else {
            arr = JSON.parse(JSON.stringify(b));
            value = a;
        }
        printArr(arr, [], (res) => {
            res.childArr[res.childIndex] = res.value * value;
        })
        return arr;
    } else if (arrInfo.aNdim == 0 && arrInfo.bNdim == 0) {
        //a和b都是数字，执行乘法
        return a * b;
    } else if (arrInfo.aNdim == 1 && arrInfo.bNdim == 1) {
        //a和b都是一维
        if (arrInfo.aShape[0] != arrInfo.bShape[0]) {
            throw new Error(`dot:error a和b都是一维，两个一维数组长度不一样，a：${arrInfo.aShape}，b：${arrInfo.bShape}，无法进行dot运算`)
        }
        return dotProduct(a, b)
    } else if (arrInfo.aNdim == 1 && arrInfo.bNdim > 1) {
        //a是一维，b是二维及以上
        if (arrInfo.aShape.slice(-1)[0] != arrInfo.bShape.slice(-2, -1)[0]) {
            throw new Error(`dot:error a是一维 b是二维及以上，左边一维的数量与右边倒数第二维数量不一致，a：${arrInfo.aShape.slice(-1)}，b：${arrInfo.bShape.slice(-2, -1)}，无法进行dot运算`)
        }
        //生成结果数组形状
        let resultShape = [].concat(arrInfo.bShape.slice(0, -2), arrInfo.bShape.slice(-1));

        //行乘列，提取b数组里所有的列
        //提取方法，第一步，将数组里的，列变成行，行变成列
        let bShapeLen = arrInfo.bShape.length;
        let bAxes = arange(bShapeLen);
        let column = bAxes.slice(-1)[0];//倒数第一个元素（列）
        let row = bAxes.slice(-2, -1)[0];//倒数第二个元素（行）
        bAxes[bShapeLen - 1] = row;//颠倒行列
        bAxes[bShapeLen - 2] = column;//颠倒行列
        let bNewArr = transpose(b, bAxes);//执行数组，列变行，行变列，的操作
        let bNewShape = shape(bNewArr);//transpose后，获取数组新形状
        //第二步，数组里的列变成行后，获取数组所有的行
        let bAllRowNum = multiply(bNewShape[0], bNewShape.slice(0, -1), 1);//计算数组一共有多少行
        let bNewArr2 = reshape(bNewArr, [bAllRowNum, bNewShape.slice(-1)[0]]);//获取新数组里所有的行
        let aNewArr2 = broadcast([a, bNewArr2])[0];//根据b新数组形状，生成一个a新数组
        //开始计算
        let resultValue = [];
        for (let i = 0; i < aNewArr2.length; i++) {
            let a_arr_item = aNewArr2[i];
            let b_arr_item = bNewArr2[i];
            let result = dotProduct(a_arr_item, b_arr_item);
            resultValue.push(result)
        }
        //计算完毕，返回运算结果
        let resultArr = reshape(resultValue, resultShape)
        return resultArr;
    } else if (arrInfo.aNdim > 1 && arrInfo.bNdim == 1) {
        //a是二维及以上，b是一维
        if (arrInfo.aShape.slice(-1)[0] != arrInfo.bShape.slice(-1)[0]) {
            throw new Error(`dot:error a是二维及以上 b是一维，左边最后一维的数量与右边一维的数量不一致，a：${arrInfo.aShape.slice(-1)}，b：${arrInfo.bShape.slice(-1)}，无法进行dot运算`)
        }
        let resultShape = [].concat(arrInfo.aShape.slice(0, -1));

        //行乘列，提取a数组里所有的行
        let aAllRowNum = multiply(arrInfo.aShape[0], arrInfo.aShape.slice(0, -1), 1);//计算数组一共有多少行
        let aNewArr2 = reshape(a, [aAllRowNum, arrInfo.aShape.slice(-1)[0]]);//获取新数组里所有的行
        let bNewArr2 = broadcast([aNewArr2, b])[1];//根据a新数组形状，生成一个b新数组
        //开始计算
        let resultValue = [];
        for (let i = 0; i < aNewArr2.length; i++) {
            let a_arr_item = aNewArr2[i];
            let b_arr_item = bNewArr2[i];
            let result = dotProduct(a_arr_item, b_arr_item);
            resultValue.push(result)
        }
        //计算完毕，返回运算结果
        let resultArr = reshape(resultValue, resultShape)
        return resultArr;
    } else if (arrInfo.aNdim == 2 && arrInfo.bNdim == 2) {
        //a和b 都是2维
        if (arrInfo.aShape.slice(-1)[0] != arrInfo.bShape.slice(0, 1)[0]) {
            throw new Error(`dot:error a和b都是二维，左边最后一维的数量与右边第一维的数量不一致，a：${arrInfo.aShape.slice(-1)}，b：${arrInfo.bShape.slice(0, 1)}，无法进行dot运算`)
        }
        let resultShape = [].concat(arrInfo.aShape.slice(0, 1), arrInfo.bShape.slice(-1));

        //行乘列，提取a的所有行，提取b的所有列
        let aNewArr = a;//二维数组，所有不用提取，直接赋值就行
        let bNewArr = transpose(b, [1, 0]);//让b的，列变成行，行变成列
        let aNewArrLen = aNewArr.length;
        let bNewArrLen = bNewArr.length;
        //根据b的行数，复制拓展扩充a的行
        //根据a的行数，复制b数组
        //（为啥要这么做，请在大脑中思考dot行乘列时的运算过程，你就明白为啥要这么做了）
        let aNewArr2 = [];
        let bNewArr2 = [];
        for (let i = 0; i < aNewArrLen; i++) {
            //根据b的行数，复制拓展扩充a的行
            let aRowItem = aNewArr[i].concat();
            for (let j = 0; j < bNewArrLen; j++) {
                aNewArr2.push(aRowItem)
            }
            //根据a的行数，复制b数组
            bNewArr2 = bNewArr2.concat(bNewArr)
        }
        //开始计算
        let resultValue = [];
        for (let i = 0; i < aNewArr2.length; i++) {
            let a_arr_item = aNewArr2[i];
            let b_arr_item = bNewArr2[i];
            let result = dotProduct(a_arr_item, b_arr_item);
            resultValue.push(result)
        }
        //计算完毕，返回运算结果
        let resultArr = reshape(resultValue, resultShape)
        return resultArr;
    } else if (arrInfo.aNdim == 2 && arrInfo.bNdim > 2) {
        //a是二维，b是三维及以上
        if (arrInfo.aShape.slice(-1)[0] != arrInfo.bShape.slice(-2, -1)[0]) {
            throw new Error(`dot:error a是二维 b是三维及以上，左边最后一维的数量与右边倒数第二维的数量不一致，a：${arrInfo.aShape.slice(-1)}，b：${arrInfo.bShape.slice(-2, -1)}，无法进行dot运算`)
        }
        let resultShape = [].concat(arrInfo.aShape.slice(0, -1), arrInfo.bShape.slice(0, -2), arrInfo.bShape.slice(-1));

        //行乘列，取a的所有的行，取b的所有的列
        let aNewArr = a;//二维数组，所有不用提取，直接赋值就行
        let bNewArr = [];
        //取b的所有的列
        let bShapeLen = arrInfo.bShape.length;
        let bAxes = arange(bShapeLen);
        let column = bAxes.slice(-1)[0];//倒数第一个元素（列）
        let row = bAxes.slice(-2, -1)[0];//倒数第二个元素（行）
        bAxes[bShapeLen - 1] = row;//颠倒行列
        bAxes[bShapeLen - 2] = column;//颠倒行列
        bNewArr = transpose(b, bAxes);//执行数组的列变行，行变列
        let bNewShape = shape(bNewArr);//transpose后，获取数组新形状
        //b数组里的列变成行后，获取数组所有的行
        let bAllRowNum = multiply(bNewShape[0], bNewShape.slice(0, -1), 1);//计算数组一共有多少行
        bNewArr = reshape(bNewArr, [bAllRowNum, bNewShape.slice(-1)[0]]);//获取新数组里所有的行
        let aNewArrLen = aNewArr.length;
        let bNewArrLen = bNewArr.length;
        //根据b的行数，复制拓展扩充a的行
        //根据a的行数，复制b数组
        //（为啥要这么做，请在大脑中思考dot行乘列时的运算过程，你就明白为啥要这么做了）
        let aNewArr2 = [];
        let bNewArr2 = [];
        for (let i = 0; i < aNewArrLen; i++) {
            //根据b的行数，复制拓展扩充a的行
            let aRowItem = aNewArr[i].concat();
            for (let j = 0; j < bNewArrLen; j++) {
                aNewArr2.push(aRowItem)
            }
            //根据a的行数，复制b数组
            bNewArr2 = bNewArr2.concat(bNewArr)
        }
        //开始计算
        let resultValue = [];
        for (let i = 0; i < aNewArr2.length; i++) {
            let a_arr_item = aNewArr2[i];
            let b_arr_item = bNewArr2[i];
            let result = dotProduct(a_arr_item, b_arr_item);
            resultValue.push(result)
        }
        //计算完毕，返回运算结果
        let resultArr = reshape(resultValue, resultShape)
        return resultArr;
    } else if (arrInfo.aNdim > 2 && arrInfo.bNdim == 2) {
        //a是三维及以上，b是二维
        if (arrInfo.aShape.slice(-1)[0] != arrInfo.bShape.slice(-2, -1)[0]) {
            throw new Error(`dot:error a是三维及以上 b是二维，左边最后一维的数量与右边倒数第二维的数量不一致，a：${arrInfo.aShape.slice(-1)}，b：${arrInfo.bShape.slice(-2, -1)}，无法进行dot运算`)
        }
        let resultShape = [].concat(arrInfo.aShape.slice(0, -1), arrInfo.bShape.slice(0, -2), arrInfo.bShape.slice(-1));

        //行乘列，取a的所有的行，取b的所有的列
        let aNewArr = [];
        let bNewArr = [];
        //取a所有的行
        let aAllRowNum = multiply(arrInfo.aShape[0], arrInfo.aShape.slice(0, -1), 1);//计算数组一共有多少行
        aNewArr = reshape(a, [aAllRowNum, arrInfo.aShape.slice(-1)[0]]);//获取a数组里所有的行
        //取b所有的列
        bNewArr = transpose(b, [1, 0]);//b是二维数组，列变行，行变列
        let aNewArrLen = aNewArr.length;
        let bNewArrLen = bNewArr.length;
        //根据b的行数，复制拓展扩充a的行
        //根据a的行数，复制b数组
        //（为啥要这么做，请在大脑中思考dot行乘列时的运算过程，你就明白为啥要这么做了）
        let aNewArr2 = [];
        let bNewArr2 = [];
        for (let i = 0; i < aNewArrLen; i++) {
            //根据b的行数，复制拓展扩充a的行
            let aRowItem = aNewArr[i].concat();
            for (let j = 0; j < bNewArrLen; j++) {
                aNewArr2.push(aRowItem)
            }
            //根据a的行数，复制b数组
            bNewArr2 = bNewArr2.concat(bNewArr)
        }
        //开始计算
        let resultValue = [];
        for (let i = 0; i < aNewArr2.length; i++) {
            let a_arr_item = aNewArr2[i];
            let b_arr_item = bNewArr2[i];
            let result = dotProduct(a_arr_item, b_arr_item);
            resultValue.push(result)
        }
        //计算完毕，返回运算结果
        let resultArr = reshape(resultValue, resultShape)
        return resultArr;
    } else if (arrInfo.aNdim > 2 && arrInfo.bNdim > 2) {
        //a和b都是三维及以上
        if (arrInfo.aShape.slice(-1)[0] != arrInfo.bShape.slice(-2, -1)[0]) {
            throw new Error(`dot:error a和b都是三维及以上，左边最后一维的数量与右边倒数第二维的数量不一致，a：${arrInfo.aShape.slice(-1)}，b：${arrInfo.bShape.slice(-2, -1)}，无法进行dot运算`)
        }
        let resultShape = [].concat(arrInfo.aShape.slice(0, -1), arrInfo.bShape.slice(0, -2), arrInfo.bShape.slice(-1));

        //行乘列，取a的所有的行，取b的所有的列
        let aNewArr = [];
        let bNewArr = [];
        //取a所有的行
        let aAllRowNum = multiply(arrInfo.aShape[0], arrInfo.aShape.slice(0, -1), 1);//计算数组一共有多少行
        aNewArr = reshape(a, [aAllRowNum, arrInfo.aShape.slice(-1)[0]]);//获取a数组里所有的行
        //取b所有的列
        let bShapeLen = arrInfo.bShape.length;
        let bAxes = arange(bShapeLen);
        let column = bAxes.slice(-1)[0];//倒数第一个元素（列）
        let row = bAxes.slice(-2, -1)[0];//倒数第二个元素（行）
        bAxes[bShapeLen - 1] = row;//颠倒行列
        bAxes[bShapeLen - 2] = column;//颠倒行列
        bNewArr = transpose(b, bAxes);//执行数组的列变行，行变列
        let bNewShape = shape(bNewArr);//transpose后，获取数组新形状
        //b数组里的列变成行后，获取数组所有的行
        let bAllRowNum = multiply(bNewShape[0], bNewShape.slice(0, -1), 1);//计算数组一共有多少行
        bNewArr = reshape(bNewArr, [bAllRowNum, bNewShape.slice(-1)[0]]);//获取新数组里所有的行
        let aNewArrLen = aNewArr.length;
        let bNewArrLen = bNewArr.length;
        //根据b的行数，复制拓展扩充a的行
        //根据a的行数，复制b数组
        //（为啥要这么做，请在大脑中思考dot行乘列时的运算过程，你就明白为啥要这么做了）
        let aNewArr2 = [];
        let bNewArr2 = [];
        for (let i = 0; i < aNewArrLen; i++) {
            //根据b的行数，复制拓展扩充a的行
            let aRowItem = aNewArr[i].concat();
            for (let j = 0; j < bNewArrLen; j++) {
                aNewArr2.push(aRowItem)
            }
            //根据a的行数，复制b数组
            bNewArr2 = bNewArr2.concat(bNewArr)
        }
        //开始计算
        let resultValue = [];
        for (let i = 0; i < aNewArr2.length; i++) {
            let a_arr_item = aNewArr2[i];
            let b_arr_item = bNewArr2[i];
            let result = dotProduct(a_arr_item, b_arr_item);
            resultValue.push(result)
        }
        //计算完毕，返回运算结果
        let resultArr = reshape(resultValue, resultShape)
        return resultArr;
    }
}
exports.dot = dot;


// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

// 测试1，测试是否符合dot运算，测试结果数组形状是否正确

// console.log(dot(1,2)); //结果是纯数字


// let a = reshape(arange(1 * 2 * 3 * 4), [1, 2, 3, 4])
// console.log("shape(a)", shape(a))
// dot(a,2) //[1, 2, 3, 4]
// dot(2,a) //[1, 2, 3, 4]


// dot([1,2,3],[4,5,6]) //结果是纯数字

// dot([1,2,3],[1,2]) //报错，正常的


// let a = [1, 2, 3, 4];
// let b = reshape(arange(1*2*4*5),[1,2,4,5]);
// let b1 = reshape(arange(1*2*3*4),[1,2,3,4]);
// let c = reshape(arange(1*2*3*4),[1,2,3,4]);
// let d = [1,2,3,4];
// let e = reshape(arange(2*3*4*5),[2,3,4,5]);
// console.log("shape(a)",shape(a)) //[ 4 ]
// console.log("shape(b)",shape(b)) //[ 1, 2, 4, 5 ]
// console.log(dot(a,b)) //[ 1, 2, 5 ]

// console.log("shape(b1)",shape(b1)) //[ 1, 2, 3, 4 ]
// dot(a,b1) //报错，说明是正常的

// console.log("shape(c)",shape(c)) //[ 1, 2, 3, 4 ]
// console.log("shape(d)",shape(d)) //[ 4 ]
// dot(c,d) //[ 1, 2, 3 ]

// dot(b,d) //报错，说明是正常的

// console.log(dot(a,e))

// let a = reshape(arange(1 * 2), [1, 2])
// let b = reshape(arange(2*6), [2,6])
// let c = reshape(arange(2*8), [2,8])
// console.log("shape(a)",shape(a))//[ 1, 2 ]
// console.log("shape(b)",shape(b))//[ 2, 6 ]
// console.log("shape(c)",shape(c))//[ 2, 8 ]
// dot(a,b)// [ 1, 6 ]

// dot(b,c) //报错，说明是正常的

// let a = reshape(arange(1 * 2), [1, 2])
// let b = reshape(arange(1 * 2 * 3 * 4 * 5 * 6 * 2 * 1), [1, 2, 3, 4, 5, 6, 2, 1])
// let c = reshape(arange(1 * 2 * 3 * 4), [1, 2, 3, 4])
// console.log("shape(a)", shape(a)) // [ 1, 2 ]
// console.log("shape(b)", shape(b)) //[1, 2, 3, 4, 5, 6, 2, 1]
// console.log("shape(c)", shape(c)) //[ 1, 2, 3, 4 ]
// dot(a, b) //[1, 1, 2, 3,4, 5, 6, 1]

// dot(a,c)//报错，是正常的

// let a = reshape(arange(1 * 2 * 3 * 4 * 5 * 6 * 2 * 1), [1, 2, 3, 4, 5, 6, 2, 1])
// let b = reshape(arange(1 * 1), [1,1])
// let c = reshape(arange(2 * 1), [2,1])
// console.log("shape(a)",shape(a)) //[1, 2, 3, 4,5, 6, 2, 1]
// console.log("shape(b)",shape(b)) //[ 1, 1 ]
// console.log("shape(c)",shape(c)) //[ 2, 1 ]
// dot(a,b)//[1, 2, 3, 4,5, 6, 2, 1]

// dot(a,c)//报错，说明是正常的

// let a = reshape(arange(1*2*3), [1,2,3])
// let b = reshape(arange(1*3*5), [1,3,5])
// let c = reshape(arange(1*4*5), [1,4,5])
// console.log("shape(a)",shape(a))//[ 1, 2, 3 ]
// console.log("shape(b)",shape(b))//[ 1, 3, 5 ]
// console.log("shape(c)",shape(c))//[ 1, 4, 5 ]
// dot(a,b)//[ 1, 2, 1, 5 ]
// dot(a,c)//报错，说明是正常的


//------------------------------


//测试2，测试算数
// console.log(dot(1,2)) //2


// let a = reshape(arange(1*2*3*4),[1,2,3,4])
// console.log("shape(a)",shape(a))//[ 1, 2, 3, 4 ]
// let result = dot(a,2);
// console.log("shape(result)",shape(result))//[ 1, 2, 3, 4 ]

// let result2 = dot(4,a);
// console.log("shape(result2)",shape(result2))//[ 1, 2, 3, 4 ]


// let a = arange(1*2*3*4)
// console.log(dot(a,a)) //4324


// let a = [1, 2, 3];
// let a2 = [1];
// let b = reshape(arange(1 * 2 * 3 * 4), [1, 2, 3, 4]);
// let b2 = reshape(arange(1 * 2 * 1 * 4), [1, 2, 1, 4]);
// let b3 = reshape(arange(2 * 1 * 3 * 4), [2, 1, 3, 4]);
// console.log(dot(a, b))//[ [ [ 32, 38, 44, 50 ], [ 104, 110, 116, 122 ] ] ]
// console.log(dot(a2, b2))
// /*
// [ [ [ 0, 1, 2, 3 ], [ 4, 5, 6, 7 ] ] ]
// */
// console.log(dot(a, b3))
// /*
// [ [ [ 32, 38, 44, 50 ] ], [ [ 104, 110, 116, 122 ] ] ]
// */




// let a = reshape(arange(1 * 2 * 3 * 4), [1, 2, 3, 4]);
// let b = [1,2,3,4]
// let a1 = reshape(arange(2*2 * 3 * 4), [2, 2, 3, 4]);
// console.log(dot(a, b))//[ [ [ 20, 60, 100 ], [ 140, 180, 220 ] ] ]
// console.log(dot(a1, b))
// /*
// [
//   [ [ 20, 60, 100 ], [ 140, 180, 220 ] ],
//   [ [ 260, 300, 340 ], [ 380, 420, 460 ] ]
// ]
// */



//a和b都是二维
// let a = reshape(arange(3 * 4), [3, 4]);
// let a1 = reshape(arange(1 * 4), [1, 4]);
// let b = reshape(arange(4 * 5), [4, 5]);
// let b1 = reshape(arange(4 * 1), [4, 1]);
// console.log(dot(a,b))
// /*
// [
//   [ 70, 76, 82, 88, 94 ],
//   [ 190, 212, 234, 256, 278 ],
//   [ 310, 348, 386, 424, 462 ]
// ]
// */
// console.log(dot(a1,b))
// /*
// [ [ 70, 76, 82, 88, 94 ] ]
// */
// console.log(dot(a,b1))
// /*
// [ [ 14 ], [ 38 ], [ 62 ] ]
// */
// console.log(dot(a1,b1))
// /*
// [ [ 14 ] ]
// */



//a是二维，b是三维及以上
// let a = reshape(arange(3 * 4), [3, 4]);
// let a1 = reshape(arange(1 * 4), [1, 4]);
// let a2 = reshape(arange(4 * 1), [4, 1]);
// let b = reshape(arange(3 * 4 * 5), [3, 4, 5]);
// let b1 = reshape(arange(1 * 4 * 5), [1, 4, 5]);
// let b2 = reshape(arange(1 * 1 * 4), [1, 1, 4]);
// console.log(dot(a,b))
// /*
// [
//   [
//     [ 70, 76, 82, 88, 94 ],
//     [ 190, 196, 202, 208, 214 ],
//     [ 310, 316, 322, 328, 334 ]
//   ],
//   [
//     [ 190, 212, 234, 256, 278 ],
//     [ 630, 652, 674, 696, 718 ],
//     [ 1070, 1092, 1114, 1136, 1158 ]
//   ],
//   [
//     [ 310, 348, 386, 424, 462 ],
//     [ 1070, 1108, 1146, 1184, 1222 ],
//     [ 1830, 1868, 1906, 1944, 1982 ]
//   ]
// ]
// */
// console.log(dot(a,b1))
// /*
// [
//   [ [ 70, 76, 82, 88, 94 ] ],
//   [ [ 190, 212, 234, 256, 278 ] ],
//   [ [ 310, 348, 386, 424, 462 ] ]
// ]
// */
// console.log(dot(a1,b))
// /*
// [
//   [
//     [ 70, 76, 82, 88, 94 ],
//     [ 190, 196, 202, 208, 214 ],
//     [ 310, 316, 322, 328, 334 ]
//   ]
// ]
// */
// console.log(dot(a1,b1))
// /*
// [ [ [ 70, 76, 82, 88, 94 ] ] ]
// */
// console.log(dot(a2,b2))
// /*
// [
//   [ [ 0, 0, 0, 0 ] ],
//   [ [ 0, 1, 2, 3 ] ],
//   [ [ 0, 2, 4, 6 ] ],
//   [ [ 0, 3, 6, 9 ] ]
// ]
// */



//a是三维及以上，b是二维
// let a = reshape(arange(3 * 4 * 5), [3, 4, 5]);
// let a1 = reshape(arange(1 * 3 * 4 * 5), [1, 3, 4, 5]);
// let a2 = reshape(arange(1 * 3 * 4 * 1), [1, 3, 4, 1]);
// let b = reshape(arange(5*4), [5,4])
// let b1 = reshape(arange(5*1), [5,1])
// let b2 = reshape(arange(1*2), [1,2])
// console.log(dot(a, b));
// /*
// [
//   [
//     [ 120, 130, 140, 150 ],
//     [ 320, 355, 390, 425 ],
//     [ 520, 580, 640, 700 ],
//     [ 720, 805, 890, 975 ]
//   ],
//   [
//     [ 920, 1030, 1140, 1250 ],
//     [ 1120, 1255, 1390, 1525 ],
//     [ 1320, 1480, 1640, 1800 ],
//     [ 1520, 1705, 1890, 2075 ]
//   ],
//   [
//     [ 1720, 1930, 2140, 2350 ],
//     [ 1920, 2155, 2390, 2625 ],
//     [ 2120, 2380, 2640, 2900 ],
//     [ 2320, 2605, 2890, 3175 ]
//   ]
// ]
// */
// console.log(JSON.stringify(dot(a1, b)));
// /*
// [[[[120,130,140,150],[320,355,390,425],[520,580,640,700],[720,805,890,975]],[[920,1030,1140,1250],[1120,1255,1390,1525],[1320,1480,1640,1800],[1520,1705,1890,2075]],[[1720,1930,2140,2350],[1920,2155,2390,2625],[2120,2380,2640,2900],[2320,2605,2890,3175]]]]
// */
// console.log(JSON.stringify(dot(a, b1)));
// /*
// [[[30],[80],[130],[180]],[[230],[280],[330],[380]],[[430],[480],[530],[580]]]
// */
// console.log(JSON.stringify(dot(a1, b1)));
// /*
// [[[[30],[80],[130],[180]],[[230],[280],[330],[380]],[[430],[480],[530],[580]]]]
// */
// console.log(JSON.stringify(dot(a2, b2)));
// /*
// [[[[0,0],[0,1],[0,2],[0,3]],[[0,4],[0,5],[0,6],[0,7]],[[0,8],[0,9],[0,10],[0,11]]]]
// */


//a和b都是三维及以上
// let a = reshape(arange(3 * 4 * 5), [3, 4, 5]);
// let a1 = reshape(arange(1 * 4 * 5), [1, 4, 5]);
// let a2 = reshape(arange(1 * 4 * 1), [1, 4, 1]);
// let b = reshape(arange(4 * 5 * 6), [4, 5, 6]);
// let b1 = reshape(arange(1 * 5 * 6), [1, 5, 6]);
// let b2 = reshape(arange(1 * 1 * 6), [1, 1, 6]);
// console.log(JSON.stringify(dot(a,b)));
// /*
// [[[[180,190,200,210,220,230],[480,490,500,510,520,530],[780,790,800,810,820,830],[1080,1090,1100,1110,1120,1130]],[[480,515,550,585,620,655],[1530,1565,1600,1635,1670,1705],[2580,2615,2650,2685,2720,2755],[3630,3665,3700,3735,3770,3805]],[[780,840,900,960,1020,1080],[2580,2640,2700,2760,2820,2880],[4380,4440,4500,4560,4620,4680],[6180,6240,6300,6360,6420,6480]],[[1080,1165,1250,1335,1420,1505],[3630,3715,3800,3885,3970,4055],[6180,6265,6350,6435,6520,6605],[8730,8815,8900,8985,9070,9155]]],[[[1380,1490,1600,1710,1820,1930],[4680,4790,4900,5010,5120,5230],[7980,8090,8200,8310,8420,8530],[11280,11390,11500,11610,11720,11830]],[[1680,1815,1950,2085,2220,2355],[5730,5865,6000,6135,6270,6405],[9780,9915,10050,10185,10320,10455],[13830,13965,14100,14235,14370,14505]],[[1980,2140,2300,2460,2620,2780],[6780,6940,7100,7260,7420,7580],[11580,11740,11900,12060,12220,12380],[16380,16540,16700,16860,17020,17180]],[[2280,2465,2650,2835,3020,3205],[7830,8015,8200,8385,8570,8755],[13380,13565,13750,13935,14120,14305],[18930,19115,19300,19485,19670,19855]]],[[[2580,2790,3000,3210,3420,3630],[8880,9090,9300,9510,9720,9930],[15180,15390,15600,15810,16020,16230],[21480,21690,21900,22110,22320,22530]],[[2880,3115,3350,3585,3820,4055],[9930,10165,10400,10635,10870,11105],[16980,17215,17450,17685,17920,18155],[24030,24265,24500,24735,24970,25205]],[[3180,3440,3700,3960,4220,4480],[10980,11240,11500,11760,12020,12280],[18780,19040,19300,19560,19820,20080],[26580,26840,27100,27360,27620,27880]],[[3480,3765,4050,4335,4620,4905],[12030,12315,12600,12885,13170,13455],[20580,20865,21150,21435,21720,22005],[29130,29415,29700,29985,30270,30555]]]]
// */
// console.log(JSON.stringify(dot(a1,b)));
// /*
// [[[[180,190,200,210,220,230],[480,490,500,510,520,530],[780,790,800,810,820,830],[1080,1090,1100,1110,1120,1130]],[[480,515,550,585,620,655],[1530,1565,1600,1635,1670,1705],[2580,2615,2650,2685,2720,2755],[3630,3665,3700,3735,3770,3805]],[[780,840,900,960,1020,1080],[2580,2640,2700,2760,2820,2880],[4380,4440,4500,4560,4620,4680],[6180,6240,6300,6360,6420,6480]],[[1080,1165,1250,1335,1420,1505],[3630,3715,3800,3885,3970,4055],[6180,6265,6350,6435,6520,6605],[8730,8815,8900,8985,9070,9155]]]]
// */
// console.log(JSON.stringify(dot(a,b1)));
// /*
// [[[[180,190,200,210,220,230]],[[480,515,550,585,620,655]],[[780,840,900,960,1020,1080]],[[1080,1165,1250,1335,1420,1505]]],[[[1380,1490,1600,1710,1820,1930]],[[1680,1815,1950,2085,2220,2355]],[[1980,2140,2300,2460,2620,2780]],[[2280,2465,2650,2835,3020,3205]]],[[[2580,2790,3000,3210,3420,3630]],[[2880,3115,3350,3585,3820,4055]],[[3180,3440,3700,3960,4220,4480]],[[3480,3765,4050,4335,4620,4905]]]]
// */
// console.log(JSON.stringify(dot(a1,b1)));
// /*
// [[[[180,190,200,210,220,230]],[[480,515,550,585,620,655]],[[780,840,900,960,1020,1080]],[[1080,1165,1250,1335,1420,1505]]]]
// */
// console.log(JSON.stringify(dot(a2,b2)));
// /*
// [[[[0,0,0,0,0,0]],[[0,1,2,3,4,5]],[[0,2,4,6,8,10]],[[0,3,6,9,12,15]]]]
// */