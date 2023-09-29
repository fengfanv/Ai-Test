/*
一、
Float64Array是JavaScript中的TypedArray类型之一，它是一个类似数组的对象，用于表示一个固定长度的浮点数（64位浮点数）数组。
Float64Array类型是由IEEE 754标准定义的双精度浮点数类型（也被称为double）。

二、
Float64Array的意义在于提供了一种高效处理大量浮点数数据的方式，尤其在科学计算、图形渲染、音频处理等领域非常有用。
与普通的JavaScript数组相比，Float64Array在内存中使用连续的二进制数据表示浮点数，因此可以更高效地进行数值计算和操作。

三、
Float64Array是一种使用固定长度的二进制数据表示浮点数的类型，因此无法像普通的JavaScript数组一样自动扩展或收缩。
在创建时需要指定数组的长度，并且无法动态改变数组的大小。如果需要动态大小的数组，可以使用普通的JavaScript数组。
*/






// 创建一个指定长度的Float64Array
// const array = new Float64Array(length);

// 访问和修改Float64Array数组元素
// array[index] = value;
// const element = array[index];

// 对数组进行迭代或处理
// for (let i = 0; i < array.length; i++) {
//     // 处理array[i]
// }






/*
如下，使用Float64Array进行简单数值计算的案例，计算两个数组的加法
*/
// // 创建两个长度相同的Float64Array
// const array1 = new Float64Array([1.5, 2.7, 3.9]);
// const array2 = new Float64Array([0.5, 1.2, 2.8]);

// // 创建结果数组
// const resultArray = new Float64Array(array1.length);

// // 执行加法操作
// for (let i = 0; i < array1.length; i++) {
//   resultArray[i] = array1[i] + array2[i];
// }

// // 输出结果
// console.log("Array1:", array1);         // 输出: Array1: Float64Array [ 1.5, 2.7, 3.9 ]
// console.log("Array2:", array2);         // 输出: Array2: Float64Array [ 0.5, 1.2, 2.8 ]
// console.log("Result Array:", resultArray);   // 输出: Result Array: Float64Array [ 2, 3.9, 6.7 ]






/*
问a数值计算快，还是b数值计算快，为什么？
*/
// var a = [1, 2, 3, 4]
// var b = new Float64Array([1, 2, 3, 4])
// 
// 在执行数值计算方面，使用Float64Array类型的数据通常比使用普通JavaScript数组（即变量a）更快。这是因为Float64Array类型是一种优化过的、基于二进制的数据类型，它在内存中以连续的二进制数据表示浮点数，可以更高效地进行数值计算和操作。
// 相对于普通JavaScript数组，Float64Array具有以下优势：
// 连续内存分配：Float64Array在创建时会进行连续内存分配，并以64位浮点数的格式存储数据。这使得CPU能够更有效地访问和处理数组的元素，减少了内存访问的开销。
// 优化的数值操作：浏览器和引擎在执行数值操作时对Float64Array进行了优化，利用SIMD（单指令多数据流）指令集来并行处理多个浮点数。这就意味着在相同的运算量下，Float64Array可以更快地完成数值计算。
// 减少类型转换：由于Float64Array是专门用于存储浮点数的类型，在进行数值计算时不需要进行类型转换操作，避免了数据类型转换的开销。
// 因此，当涉及到大量数值计算时，使用Float64Array类型的数据（如变量b）会更快，因为它具有更高的执行效率和优化的底层实现。然而，在某些情况下，对于少量数据或简单的计算，性能差异可能不太明显，这取决于具体的使用场景和操作。





/*
基于Float64Array创建一个3x3的二维数组
*/
// // 创建一个包含3个Float64Array的数组
// const matrix = [
//     new Float64Array(3),
//     new Float64Array(3),
//     new Float64Array(3)
// ];
// // 对二维数组进行初始化
// matrix[0][0] = 1.1;
// matrix[0][1] = 2.2;
// matrix[0][2] = 3.3;

// matrix[1][0] = 4.4;
// matrix[1][1] = 5.5;
// matrix[1][2] = 6.6;

// matrix[2][0] = 7.7;
// matrix[2][1] = 8.8;
// matrix[2][2] = 9.9;

// console.log(matrix);
