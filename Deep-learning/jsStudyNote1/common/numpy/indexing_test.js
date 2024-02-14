const { slice, Ellipsis, None, True, False, indexing, size } = require('./index.js');
const { shape, arange, reshape } = require('./index.js');
const { printArr } = require('./common.js');

/*
切片和索引_1.jpeg
切片和索引_2.jpeg
切片和索引_3.jpeg
切片和索引_4.jpeg
切片和索引_5.jpeg
切片和索引_6.jpeg
*/
// let ar = arange(10,30) // ar=np.arange(10,30)
// console.log(ar)
// console.log(indexing(ar,[3]))
// console.log(indexing(ar,[3],[10])) //报错说明是正确的（报错原因是，索引结果是个标量，但赋的值是个数组）（本代码，这里报的错是，(1)无法广播到()，但无伤大雅）
// console.log(indexing(ar,[3],10))
// console.log(indexing(ar,[slice(3,15)]))
// console.log(indexing(ar,[slice(3,15)],100))
// console.log(indexing(ar,[slice(3,15)],[1000]))
// console.log(indexing(ar,[slice(None,None,3)]))
// console.log(indexing(ar,[slice(None,None,3)],1000))

// let ar = reshape(arange(16),[4,4]) //ar=np.arange(16).reshape(4,4)
// console.log(ar)
// console.log(indexing(ar,[2]))
// console.log(indexing(ar,[2],10))
// console.log(indexing(indexing(ar,[2]),[2]))
// console.log(indexing(ar,[slice(1,3)]))
// console.log(indexing(ar,[slice(1,3)],[[200],[100]]))
// console.log(indexing(indexing(ar,[slice(1,4)]),[1]))
// console.log(indexing(ar,[2,2]))
// console.log(indexing(ar,[slice(None,2),slice(1,None)]))
// console.log(slice(1,None))
// console.log(slice(1))

// let ar = reshape(arange(12),[3,2,2]) //ar=np.arange(12).reshape(3,2,2)
// console.log(ar)
// console.log(indexing(ar,[1]))
// console.log(indexing(ar,[1,1]))
// console.log(indexing(indexing(indexing(ar,[1]),[1]),[1]))

// let ar = reshape(arange(12),[3,4]) //ar=np.arange(12).reshape(3,4)
// console.log(ar)
// let i = [True,False,True]
// let j = [True,False,True,False]
// console.log(indexing(ar,[i,slice(None)]))
// console.log(indexing(ar,[slice(None),j]))
// console.log(indexing(ar,[i,slice(None)],[[700],[800]]))
// console.log(indexing(ar,[slice(None),j],[[700],[800],[900]]))
// console.log(indexing(ar,[slice(None),i]))

// let ar = arange(2,15) //ar=np.arange(2,15)
// console.log(ar)
// console.log(indexing(ar,[4],100))
// console.log(indexing(ar,[slice(6,9)],200))

// --------------------------------------------------

// let a = [1,2,3,4] //a=np.array([1,2,3,4])
// console.log(a)
// console.log(indexing(a,[0]))
// console.log(indexing(a,[0],2))
// console.log(indexing(a,[slice(1,3)]))
// console.log(indexing(a,[slice(1,-1)]))
// console.log(indexing(a,[slice(None,3)]))
// console.log(indexing(a,[slice(3,None)]))
// console.log(indexing(a,[slice(None,None,2)]))

// let a = [1,2,3,4,5] //a=np.array([1,2,3,4,5])
// console.log(a)
// console.log(indexing(a,[slice(1,None)]))
// console.log(indexing(a,[slice(None,-1)]))

// let a = [[0,1,2,3],[10,11,12,13]] //a=np.array([[0,1,2,3],[10,11,12,13]])
// console.log(a)
// console.log(indexing(a,[slice(None),1]))

// let a = [[0,1,2,3,4,5],[10,11,12,13,14,15],[20,21,22,23,24,25],[30,31,32,33,34,35],[40,41,42,43,44,45],[50,51,52,53,54,55]] //a=np.array([[0,1,2,3,4,5],[10,11,12,13,14,15],[20,21,22,23,24,25],[30,31,32,33,34,35],[40,41,42,43,44,45],[50,51,52,53,54,55]])
// console.log(a)
// console.log(indexing(a,[0,slice(3,5)]))
// console.log(indexing(a,[slice(4,None),slice(4,None)]))
// console.log(indexing(a,[slice(None),2]))
// console.log(indexing(a,[slice(2,None,2),slice(None,None,2)]))

// let a = [0,10,20,30,40,50,60,70,80,90] //a=np.array([0,10,20,30,40,50,60,70,80,90])
// console.log(a)
// index = [1,2,-3]
// console.log(indexing(a,[index]))
// mask = [False,True,True,False,False,True,False,False,True,False]
// console.log(indexing(a,[mask]))

// let a = [[0,1,2,3,4,5],[10,11,12,13,14,15],[20,21,22,23,24,25],[30,31,32,33,34,35],[40,41,42,43,44,45],[50,51,52,53,54,55]] //a=np.array([[0,1,2,3,4,5],[10,11,12,13,14,15],[20,21,22,23,24,25],[30,31,32,33,34,35],[40,41,42,43,44,45],[50,51,52,53,54,55]])
// console.log(a)
// console.log(indexing(a,[[0,1,2,3,4],[1,2,3,4,5]]))
// console.log(indexing(a,[slice(3,None),[0,2,4]]))
// console.log(indexing(a,[slice(None,3)]))
// console.log(indexing(a,[[False,True,True,False,True,False]]))

// --------------------------------------------------

// let a_array = arange(10) //a_array=np.arange(10)
// console.log(a_array)
// console.log(indexing(a_array,[slice(1,10,2)]))
// console.log(indexing(a_array,[slice(2,None)]))
// console.log(indexing(a_array,[slice(None,5)]))

// let a_array = [[1,2,3],[4,5,6],[7,8,9]] //a_array=np.array([[1,2,3],[4,5,6],[7,8,9]])
// console.log(a_array)
// console.log(indexing(a_array,[slice(1,None)]))
// console.log(indexing(a_array,[Ellipsis,0]))
// console.log(indexing(a_array,[1,Ellipsis]))
// console.log(indexing(a_array,[Ellipsis,slice(1,None)]))
// console.log(indexing(a_array,[slice(1,None),Ellipsis]))
// console.log(indexing(a_array,[[0,1,2],[0,1,2]]))
// console.log(indexing(a_array,[[[0,0],[2,2]],[[0,2],[0,2]]]))
// console.log(indexing(a_array,[slice(0,2),slice(0,2)]))
// console.log(indexing(a_array,[Ellipsis,slice(0,2)]))
// console.log(indexing(a_array,[[[False,False,False],[True,True,True],[True,True,True]]]))

// let array = reshape(arange(25),[5,5]) // array=np.arange(25).reshape(5,5)
// console.log(array)
// console.log(indexing(array,[[1,2,3]]))
// console.log(indexing(array,[[-1,-2,-3]]))
// console.log(indexing(indexing(array,[[2,1,3]]),[slice(None),[2,3,1,4,0]]))

// --------------------------------------------------

// let arr = arange(10) //arr=np.arange(10)
// console.log(arr)
// console.log(indexing(arr,[slice(2,7,2)]))
// console.log(indexing(arr,[3]))
// console.log(indexing(arr,[slice(2,None)]))
// console.log(indexing(arr,[slice(2,6)]))

// let arr = reshape(arange(12),[3,4]) //arr=np.arange(12).reshape(3,4)
// console.log(arr)
// console.log(indexing(arr,[Ellipsis,1]))
// console.log(indexing(arr,[slice(None),1]))
// console.log(indexing(arr,[1,Ellipsis]))
// console.log(indexing(arr,[1,slice(None)]))
// console.log(indexing(arr,[Ellipsis,slice(1,None)]))
// console.log(indexing(arr,[slice(None),slice(1,None)]))

// let arr = arange(10) //arr=np.arange(10)
// console.log(arr)
// console.log(indexing(arr,[-1]))
// console.log(indexing(arr,[-3]))
// console.log(indexing(arr,[slice(None,-1)]))
// console.log(indexing(arr,[slice(None,-3)]))
// console.log(indexing(arr,[slice(None,None,-1)]))
// console.log(indexing(arr,[slice(2,None,-1)]))
// console.log(indexing(arr,[slice(5,None,2)]))
// console.log(indexing(arr,[slice(5,None,-3)]))
// console.log(indexing(arr,[slice(None,None,-3)]))

// let arr = reshape(arange(12),[4,3]) //arr=np.arange(12).reshape(4,3)
// console.log(arr)
// console.log(indexing(arr,[[0,1,3,2],[2,1,2,2]]))
// let rows = [[0,0],[3,3]]
// let cols = [[0,2],[0,2]]
// console.log(indexing(arr,[rows,cols]))
// console.log(indexing(arr,[slice(1,3),slice(1,3)]))
// console.log(indexing(arr,[slice(None),[1,2]]))

// let arr = reshape(arange(20),[5,4]) //arr=np.arange(20).reshape(5,4)
// console.log(arr)
// console.log(indexing(arr,[[4,2,1]]))
// console.log(indexing(arr,[[4,2,1]],[[1000],[2000],[3000]]))
// console.log(indexing(arr,[[-4,-2,-1]]))
// console.log(indexing(arr,[[1,2,3],[2,1,1]]))
// console.log(indexing(arr,[[[1],[2],[3]],[[2,1,3]]]))

// --------------------------------------------------

// let av = arange(20) //av=np.arange(20)
// console.log(av)
// console.log(indexing(av,[slice(5,16,1)]))

// let a = arange(10) //a=np.arange(10)
// console.log(a)
// console.log(indexing(a,[slice(2,None)]))

// let a = [[1,2,3],[3,4,5],[4,5,6]] //a=np.array([[1,2,3],[3,4,5],[4,5,6]])
// console.log(a)
// console.log(indexing(a,[Ellipsis,1]))
// console.log(indexing(a,[1,Ellipsis]))
// console.log(indexing(a,[Ellipsis,slice(1,None)]))

// let xg = [[1,2],[3,4],[5,6]] //xg=np.array([[1,2],[3,4],[5,6]])
// console.log(xg)
// console.log(indexing(xg,[[0,1,0],[0,1,1]]))

// let az = [[1,2,3],[4,5,6],[7,8,9]] //az=np.array([[1,2,3],[4,5,6],[7,8,9]])
// console.log(az)
// console.log(indexing(az,[slice(1,3),slice(1,3)]))
// console.log(indexing(az,[slice(1,3),[1,0]]))
// console.log(indexing(az,[Ellipsis,slice(1,None)]))

// let x = reshape(arange(32),[8,4]) //x=np.arange(32).reshape((8,4))
// console.log(x)
// console.log(indexing(x,[[0,3,5],Ellipsis]))
// console.log(indexing(x,[[-0,-3,-5],Ellipsis]))
// console.log(indexing(x,[[[1],[5],[7],[2]],[[0,3,1,2]]]))

// --------------------------------------------------

// let x = [1,2,3,4,5,6,7,8] //x=np.array([1,2,3,4,5,6,7,8])
// console.log(x)
// console.log(indexing(x,[2]))

// let x = [[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25],[26,27,28,29,30],[31,32,33,34,35]] //x=np.array([[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25],[26,27,28,29,30],[31,32,33,34,35]])
// console.log(x)
// console.log(indexing(x,[2]))
// console.log(indexing(indexing(x,[2]),[1]))
// console.log(indexing(x,[[2,1],[1,2]],100))
// console.log(indexing(x,[[2,1],[1,2]]))
// console.log(indexing(x,[[0,1,2]]))
// console.log(indexing(x,[slice(0,3),[1,2,2]]))
// console.log(indexing(x,[slice(0,3),[1,2,2]],[[1000,2000,3000]]))

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------

/*
chatGpt_check_indexType.py
index.py
numpy_slice.py
numpy_slice1.py
numpy_slice2.py
numpy_slice3.py
numpy_slice4.py
numpy_slice5.py
numpy_slice6.py
numpy_slice7.py
numpy_slice8.py
numpy_slice9.py
numpy_slice10.py
numpy_slice11.py
numpy_slice12.py
*/
// arr1 = [1,2,3,4] //arr1 = np.array([1,2,3,4])
// console.log(indexing(arr1,[[0,2]]))

// arr2 = [[1,2],[3,4]] //arr2 = np.array([[1,2],[3,4]])
// console.log(indexing(arr2,[[0,1],[1,0]]))
// console.log(indexing(arr2,[[1,2],[3,4]])) //报错说明是正确的
// console.log(indexing(arr2,[1,3])) //报错说明是正确的

// arr3 = reshape(arange(10),[2,5]) //arr3 = np.arange(10).reshape(2,5)
// console.log(indexing(arr3,[slice(None),slice(None,None,2)]))
// console.log(indexing(arr3,[slice(None,None,2),[2,1,3,0]]))

// arr5 = [[1,2,3],[4,5,6],[7,8,9]] //arr5 = np.array([[1,2,3],[4,5,6],[7,8,9]])
// console.log(indexing(arr5,[0,1]))
// console.log(indexing(arr5,[[0,2]]))
// console.log(indexing(arr5,[[0],[1]]))
// console.log(indexing(arr5,[[[0],[1]]]))
// console.log(indexing(arr5,[[[0]]]))
// console.log(shape(indexing(arr5,[[[0]]])))
// console.log(indexing(arr5,[[0]]))
// console.log(shape(indexing(arr5,[[0]])))
// console.log(indexing(arr5,[[[[0]]]]))
// printArr(indexing(arr5,[[[[0]]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(indexing(arr5,[[[[0]]]],1000))
// console.log(shape(indexing(arr5,[[[[0]]]])))
// console.log(indexing(arr5,[[[[0]]],[[[0]]]]))
// printArr(indexing(arr5,[[[[0]]],[[[0]]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(indexing(arr5,[[[[0]]],[[[0]]]],[1000]))
// console.log(shape(indexing(arr5,[[[[0]]],[[[0]]]])))
// console.log(indexing(arr5,[[[[0],[0]]]]))
// printArr(indexing(arr5,[[[[0],[0]]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(indexing(arr5,[[[[0],[0]]]],reshape(arange(1*2*1*3),[1,2,1,3])))
// console.log(shape(indexing(arr5,[[[[0],[0]]]])))

// --------------------------------------------------

// let a = reshape(arange(30),[3,2,5]) //a = np.arange(30).reshape(3,2,5)
// console.log(a)
// console.log(indexing(a,[slice(None),slice(1,2),slice(None)]))
// console.log(indexing(a,[slice(None),1,slice(None)]))

// let b = reshape(arange(40),[2,5,2,2]) //b = np.arange(40).reshape(2,5,2,2)
// printArr(b,[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(b,[slice(None),slice(1,2),Ellipsis])))
// printArr(indexing(b,[slice(None),slice(1,2),Ellipsis]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(indexing(b,[slice(None),1,Ellipsis]))

// let c = reshape(arange(1,7),[2,3,1]) //c = np.arange(1,7).reshape(2,3,1)
// console.log(c)
// console.log(indexing(c,[slice(1,2),slice(0,2),0]))
// console.log(indexing(indexing(indexing(c,[slice(1,2),Ellipsis]),[Ellipsis,slice(0,2),slice(None)]),[Ellipsis,0]))
// console.log(indexing(indexing(indexing(c,[slice(1,2),Ellipsis]),[Ellipsis,slice(0,2),slice(None)]),[0]))
// console.log(indexing(indexing(indexing(c,[slice(1,2)]),[slice(0,2)]),[0]))
// console.log(indexing(c,[slice(0,1),Ellipsis,slice(1,2),slice(None)]))
// console.log(shape(indexing(c,[slice(0,1),Ellipsis,slice(1,2),slice(None)])))
// console.log(indexing(indexing(indexing(c,[slice(0,1),Ellipsis]),[Ellipsis,slice(1,2),slice(None)]),[Ellipsis,slice(None)]))
// console.log(indexing(c,[slice(0,1),slice(1,2),slice(None)]))

// --------------------------------------------------

// let x = arange(5) //x = np.arange(5)
// console.log(x)
// console.log(indexing(x,[None,slice(None)]))
// console.log(shape(indexing(x,[None,slice(None)])))
// console.log(indexing(x,[slice(None),None]))
// console.log(shape(indexing(x,[slice(None),None])))

// --------------------------------------------------

// let a = reshape(arange(10),[2,5]) //a = np.arange(10).reshape(2, 5)
// console.log(a)
// console.log(indexing(a,[[1],[1,2,3]]))
// console.log(indexing(a,[[0]]))
// console.log(indexing(a,[[0],[0,1,2]]))
// console.log(indexing(a,[0]))
// console.log(indexing(a,[[0]]))

// --------------------------------------------------

// let x = reshape(arange(18),[2,3,3]) //x = np.arange(18).reshape(2,3,3)
// console.log(x)
// console.log(indexing(x,[[1,0],slice(None),[1,2]]))
// console.log(indexing(x,[1,slice(None),1]))
// console.log(indexing(x,[0,slice(None),2]))
// console.log(indexing(indexing(x,[[1,0]]),[Ellipsis,[1,2]]))

// let x = reshape(arange(2*3*3*3),[2,3,3,3]) //x = np.arange(2*3*3*3).reshape(2,3,3,3)
// printArr(x,[],(res)=>{
//     console.log(res.value)
// })
// console.log(indexing(x,[[1,0],slice(None),slice(None),[1,2]]))
// console.log('---')
// printArr(indexing(indexing(x,[[1,0],Ellipsis]),[Ellipsis,[1,2]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(indexing(x,[1,Ellipsis,1]))
// console.log(indexing(x,[0,Ellipsis,2]))

// let x = reshape(arange(18),[2,3,3]) //x = np.arange(18).reshape(2,3,3)
// console.log(x)
// console.log(indexing(x,[[1,0],slice(None),1]))
// console.log(indexing(indexing(x,[[1,0],Ellipsis]),[Ellipsis,1]))
// console.log(indexing(indexing(x,[[1,0],Ellipsis]),[1]))

// let x = reshape(arange(2*3*4*5),[2,3,4,5]) //x = np.arange(2*3*4*5).reshape(2,3,4,5)
// printArr(x,[],(res)=>{
//     console.log(res.value)
// })
// console.log(indexing(x,[[1,0],slice(None),1,1]))
// console.log(indexing(indexing(x,[[1,0],slice(None),1]),[Ellipsis,1]))
// console.log(indexing(indexing(x,[[1,0]]),[Ellipsis,1,1]))
// console.log(indexing(indexing(indexing(x,[[1,0],Ellipsis]),[Ellipsis,1,slice(None)]),[Ellipsis,1]))
// console.log(indexing(x,[1,slice(None),1,1]))
// console.log(indexing(x,[0,slice(None),1,1]))
// console.log(indexing(x,[[1,0],slice(None),slice(None),1]))
// console.log(indexing(indexing(x,[[1,0]]),[Ellipsis,1]))
// console.log(indexing(x,[1,slice(None),slice(None),1]))
// console.log(indexing(x,[0,slice(None),slice(None),1]))
// console.log(indexing(x,[[1,0],slice(None),[1,2]]))
// console.log(shape(indexing(x,[[1,0],slice(None),[1,2]])))
// console.log(indexing(x,[1,slice(None),1,slice(None)]))
// console.log(indexing(x,[0,slice(None),2,slice(None)]))
// console.log(shape(indexing(x,[[[1,0]],slice(None),[[1,2]]])))
// printArr(indexing(x,[[[1,0]],slice(None),[[1,2]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(x,[[[1,0],[1,0]],slice(None),[[1,2],[1,2]]])))
// printArr(indexing(x,[[[1,0],[1,0]],slice(None),[[1,2],[1,2]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(x,[[[1,0],[0,1]],slice(None),[[1,2],[1,2]]])))
// printArr(indexing(x,[[[1,0],[0,1]],slice(None),[[1,2],[1,2]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(x,[[[[1,0],[0,1]]],slice(None),[[[1,2],[1,2]]]])))
// printArr(indexing(x,[[[[1,0],[0,1]]],slice(None),[[[1,2],[1,2]]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(x,[[[[[1,0]],[[0,1]]]],slice(None),[[[[1,2]],[[1,2]]]]])))
// printArr(indexing(x,[[[[[1,0]],[[0,1]]]],slice(None),[[[[1,2]],[[1,2]]]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(x,[1,slice(None),1])))
// console.log(indexing(x,[1,slice(None),1]))

// let a = reshape(arange(2*3*4*2),[2,3,4,2]) //a = np.arange(2*3*4*2).reshape(2,3,4,2)
// printArr(a,[],(res)=>{
//     console.log(res.value)
// })
// console.log(indexing(a,[Ellipsis,[1,0],[1,2],slice(None)]))
// console.log(shape(indexing(a,[Ellipsis,[1,0],[1,2],slice(None)])))
// console.log(indexing(indexing(indexing(a,[0]),[1]),[1]))
// console.log(indexing(indexing(indexing(a,[0]),[0]),[2]))
// console.log(indexing(indexing(indexing(a,[1]),[1]),[1]))
// console.log(indexing(indexing(indexing(a,[1]),[0]),[2]))

// let b = reshape(arange(2*4*6),[2,4,6]) //b = np.arange(2*4*6).reshape(2,4,6)
// console.log(b)
// console.log(shape(indexing(b,[Ellipsis,[[0,1],[2,3]],slice(None)])))
// console.log(indexing(b,[Ellipsis,[[0,1],[2,3]],slice(None)]))
// printArr(indexing(b,[Ellipsis,[[0,1],[2,3]],slice(None)]),[],(res)=>{
//     console.log(res.value)
// })

// --------------------------------------------------

// let x = reshape(arange(2*3*4),[2,3,4]) //x = np.arange(2*3*4).reshape(2,3,4)
// console.log(x)
// console.log(indexing(x,[1,Ellipsis]))
// console.log(shape(indexing(x,[1,Ellipsis])))
// console.log(indexing(x,[slice(None),1,slice(None)]))
// console.log(shape(indexing(x,[slice(None),1,slice(None)])))
// console.log(indexing(x,[Ellipsis,1]))
// console.log(shape(indexing(x,[Ellipsis,1])))

// let a = arange(10) //a = np.arange(10)
// console.log(a)
// console.log(indexing(a,[3]))

// --------------------------------------------------

// let x = reshape(arange(2*3*4),[2,3,4]) //x = np.arange(2*3*4).reshape(2,3,4)
// console.log(x)
// console.log(indexing(x,[[1],[0],[0,0]]))
// console.log(indexing(x,[[1,1],[0,0],[0,0]]))
// console.log(indexing(x,[[1],[0],[0,1]]))
// console.log(indexing(x,[[1,1],[0,0],[0,1]]))
// console.log(indexing(x,[[1],[0,1],[0]]))
// console.log(indexing(x,[[1,1],[0,1],[0,0]]))
// console.log(indexing(x,[[1,0],[1],[0]]))
// console.log(indexing(x,[[1,0],[1,1],[0,0]]))

// --------------------------------------------------

// let c = reshape(arange(1,7),[2,3,1]) //c = np.arange(1,7).reshape(2,3,1)
// console.log(c)
// console.log(indexing(c,[slice(None)]))
// console.log(indexing(c,[Ellipsis]))

// --------------------------------------------------

// let x = reshape(arange(2*3*4),[2,3,4]) //x = np.arange(2*3*4).reshape(2,3,4)
// console.log(x)
// console.log(indexing(x,[[0,1],[True,False,True],[0,2]]))
// console.log(indexing(x,[[0,1],[0,2],[0,2]]))
// console.log(indexing(x,[[0,1],[True,True,True],[0,2]])) //报错，说明是正确的
// console.log(indexing(x,[[0,1],[False,False,True],[0,2]]))
// console.log(indexing(x,[[True,False]]))
// console.log(shape(indexing(x,[[True,False]])))
// console.log(indexing(x,[[True,False],[True,True,True]]))
// console.log(shape(indexing(x,[[True,False],[True,True,True]])))
// console.log(indexing(x,[[0],[0,1,2]]))
// console.log(indexing(x,[[True,True],[True,True,True]])) //报错，说明是正确的
// console.log(indexing(x,[[True,False],[True,False,True]]))
// console.log(indexing(x,[[0],[0,2]]))
// console.log(shape(indexing(x,[[0],[0,2]])))
// console.log(indexing(x,[slice(None),[True,False,True]]))
// console.log(indexing(x,[slice(None),[0,2]]))
// console.log(shape(indexing(x,[slice(None),[0,2]])))
// console.log(indexing(x,[Ellipsis,[True,False,True,False]]))
// console.log(indexing(x,[Ellipsis,[0,2]]))
// console.log(shape(indexing(x,[Ellipsis,[0,2]])))

// let x = reshape(arange(30),[2,3,5]) //x = np.arange(30).reshape(2,3,5)
// console.log(x)
// console.log(indexing(x,[[[True,False,True],[True,False,True]]]))
// console.log(shape(indexing(x,[[[True,False,True],[True,False,True]]])))
// console.log(indexing(x,[slice(None),[[True,True,True,True,False],[True,True,True,True,False],[True,True,True,True,False]]]))
// console.log(shape(indexing(x,[slice(None),[[True,True,True,True,False],[True,True,True,True,False],[True,True,True,True,False]]])))
// console.log(indexing(x,[slice(None),[[True,True,True,False,False],[True,True,True,True,False],[True,True,True,True,False]]]))
// console.log(shape(indexing(x,[slice(None),[[True,True,True,False,False],[True,True,True,True,False],[True,True,True,True,False]]])))

// --------------------------------------------------

// let a = reshape(arange(3*4*5),[3,4,5]) //a = np.arange(3*4*5).reshape(3,4,5)
// console.log(a)
// console.log(indexing(a,[slice(None),[2,3],slice(None)]))
// console.log(shape(indexing(a,[slice(None),[2,3],slice(None)])))
// console.log(indexing(a,[slice(None),slice(None),[2,3]]))
// console.log(shape(indexing(a,[slice(None),slice(None),[2,3]])))
// console.log(shape(indexing(a,[slice(None),slice(None),[[2,3]]])))
// printArr(indexing(a,[slice(None),slice(None),[[2,3]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[slice(None),[[1,2],[2,3]],slice(None)])))
// printArr(indexing(a,[slice(None),[[1,2],[2,3]],slice(None)]),[],(res)=>{
//     console.log(res.value)
// })

// --------------------------------------------------

// let a = reshape(arange(2*3*4*5),[2,3,4,5]) //a=np.arange(2*3*4*5).reshape(2,3,4,5)
// printArr(a,[],(res)=>{
//     console.log(res.value)
// })
// console.log(indexing(a,[1,slice(10,10,1)]))
// console.log(indexing(a,[1,slice(10,10,1)],1000))
// console.log(indexing(a,[[]]))
// console.log(indexing(a,[[]],1000))
// console.log(indexing(a,[[],slice(10,10,1)]))
// console.log(indexing(a,[[],slice(10,10,1)],1000))
// console.log(indexing(a,[[[[]]],slice(10,10,1)]))
// console.log(indexing(a,[[1,0],slice(10,10,1)]))
// console.log(indexing(a,[[],slice(0,10)]))

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------

/*
basicIndexing.py
advancedIndexing_integerArrayIndexing.py
advancedIndexing_booleanArrayIndexing.py
*/

// let a = reshape(arange(4*3*2),[4,3,2]) //a = np.arange(4*3*2).reshape(4,3,2)
// console.log(a)
// console.log(indexing(a,[1]))
// console.log(indexing(a,[slice(None),1]))
// console.log(indexing(a,[Ellipsis,1]))
// console.log(indexing(a,[slice(1,None),slice(None),1]))
// console.log(indexing(a,[slice(1,None),slice(None,1),1]))

// let a = reshape(arange(2*3*4),[2,3,4]) //a=np.arange(2*3*4).reshape(2,3,4)
// console.log(a)
// console.log(indexing(a,[1,None,slice(1,3)]))
// console.log(indexing(a,[1,slice(3,0,-1),slice(4,-11,-1)]))

// --------------------------------------------------

// let a = reshape(arange(2*3*4*5),[2,3,4,5]) //a=np.arange(2*3*4*5).reshape(2,3,4,5)
// printArr(a,[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[[1,0,1,0]])))
// printArr(indexing(a,[[1,0,1,0]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[[[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]])))
// printArr(indexing(a,[[[1,0,1,0],[0,1,0,1],[1,0,1,0],[0,1,0,1]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[slice(None),[1,0,1,0]])))
// printArr(indexing(a,[slice(None),[1,0,1,0]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[slice(None),[[1,0],[0,1]]])))
// printArr(indexing(a,[slice(None),[[1,0],[0,1]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[slice(None),[0,2,1],[1,2,3]])))
// printArr(indexing(a,[slice(None),[0,2,1],[1,2,3]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[slice(None),[[1,2],[0,2]],[[3,2],[1,0]]])))
// printArr(indexing(a,[slice(None),[[1,2],[0,2]],[[3,2],[1,0]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[[1,1,0,1],slice(None),[2,3,1,2]])))
// printArr(indexing(a,[[1,1,0,1],slice(None),[2,3,1,2]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[slice(None),[1,2,0],slice(None),[4,3,1]])))
// printArr(indexing(a,[slice(None),[1,2,0],slice(None),[4,3,1]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[slice(None),[[1]],slice(None),[[2]]])))
// printArr(indexing(a,[slice(None),[[1]],slice(None),[[2]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[slice(None),[1,0],[1,0],[1,0]])))
// printArr(indexing(a,[slice(None),[1,0],[1,0],[1,0]]),[],(res)=>{
//     console.log(res.value)
// })


// let b = reshape(arange(2*3*4*5*6),[2,3,4,5,6]) //b=np.arange(2*3*4*5*6).reshape(2,3,4,5,6)
// printArr(b,[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(b,[[0,1],[1,2],slice(None),[2,3]])))
// printArr(indexing(b,[[0,1],[1,2],slice(None),[2,3]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(b,[slice(None),[0,2,1,1,0],slice(None),[1,2,0,3,1],[2,3,5,1,4]])))
// printArr(indexing(b,[slice(None),[0,2,1,1,0],slice(None),[1,2,0,3,1],[2,3,5,1,4]]),[],(res)=>{
//     console.log(res.value)
// })

// let c = reshape(arange(2*3*4*5*6*7),[2,3,4,5,6,7]) //c=np.arange(2*3*4*5*6*7).reshape(2,3,4,5,6,7)
// printArr(c,[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(c,[slice(None),slice(None),[[1]],slice(None),[[2]],[[3]]])))
// printArr(indexing(c,[slice(None),slice(None),[[1]],slice(None),[[2]],[[3]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(c,[slice(None),slice(None),[[1,3]],slice(None),[[2,4]],[[3,5]]])))
// printArr(indexing(c,[slice(None),slice(None),[[1,3]],slice(None),[[2,4]],[[3,5]]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(c,[slice(None),slice(None),[[1]],[[2]],[[3]]])))
// printArr(indexing(c,[slice(None),slice(None),[[1]],[[2]],[[3]]]),[],(res)=>{
//     console.log(res.value)
// })

// let a = reshape(arange(2*3*4*5),[2,3,4,5]) //a=np.arange(2*3*4*5).reshape(2,3,4,5)
// printArr(a,[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[slice(None),[1,2],None,[1,2]])))
// printArr(indexing(a,[slice(None),[1,2],None,[1,2]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(indexing(a,[slice(None),slice(None),None]),[slice(None),[1,2],slice(None),[1,2]])))
// printArr(indexing(indexing(a,[slice(None),slice(None),None]),[slice(None),[1,2],slice(None),[1,2]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[None,[0,1],None,[1,2]])))
// printArr(indexing(a,[None,[0,1],None,[1,2]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(indexing(a,[None,slice(None),None]),[slice(None),[0,1],slice(None),[1,2]])))
// printArr(indexing(indexing(a,[None,slice(None),None]),[slice(None),[0,1],slice(None),[1,2]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[[0,1],None,None,[1,2],None])))
// printArr(indexing(a,[[0,1],None,None,[1,2],None]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(indexing(a,[slice(None),None,None,slice(None),None]),[[0,1],slice(None),slice(None),[1,2],slice(None)])))
// printArr(indexing(indexing(a,[slice(None),None,None,slice(None),None]),[[0,1],slice(None),slice(None),[1,2],slice(None)]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(a,[None,slice(None,None,-1),[1,2],slice(1,4,2),[1,2]])))
// printArr(indexing(a,[None,slice(None,None,-1),[1,2],slice(1,4,2),[1,2]]),[],(res)=>{
//     console.log(res.value)
// })
// console.log(shape(indexing(indexing(a,[None,slice(None,None,-1),slice(None),slice(1,4,2),slice(None)]),[slice(None),slice(None),[1,2],slice(None),[1,2]])))
// printArr(indexing(indexing(a,[None,slice(None,None,-1),slice(None),slice(1,4,2),slice(None)]),[slice(None),slice(None),[1,2],slice(None),[1,2]]),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[1,0],None,slice(None,None,-2),slice(2,3,1),[3,3]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [slice(None),None,slice(None,None,-2),slice(2,3,1),slice(None)]
// let index2 = [[1,0],slice(None),slice(None),slice(None),[3,3]]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None,None,-1),[1,2],None,slice(2,4,1),[2,2]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [slice(None,None,-1),slice(None),None,slice(2,4,1),slice(None)]
// let index2 = [slice(None),[1,2],slice(None),slice(None),[2,2]]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None,None,-1),None,[1,2],None,slice(2,4,1),[2,2]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [slice(None,None,-1),None,slice(None),None,slice(2,4,1),slice(None)]
// let index2 = [slice(None),slice(None),[1,2],slice(None),slice(None),[2,2]]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None,None,-1),None,slice(0,2,1),None,[1,2],None,[2,2]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [slice(None,None,-1),None,slice(0,2,1),None,slice(None),None,slice(None)]
// let index2 = [slice(None),slice(None),slice(None),slice(None),[1,2],slice(None),[2,2]]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None,None,-1),1,None,slice(2,4,1),[2,2]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [slice(None,None,-1),slice(None),None,slice(2,4,1),slice(None)]
// let index2 = [slice(None),[1,1],slice(None),slice(None),[2,2]]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,True,False],[True,True,False]],slice(1,3)]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [slice(None),slice(None),slice(1,3)]
// let index2 = [[[True,True,False],[True,True,False]],slice(None)]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [slice(None),slice(None),slice(1,3)]
// let index2 = [[0,0,1,1],[0,1,0,1]]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index = [None,[[True,True,False],[True,True,False]],slice(1,3),None,[1,2,2,0]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [None,slice(None),slice(None),slice(1,3),None]
// let index2 = [slice(None),[[True,True,False],[True,True,False]],slice(None),slice(None),[1,2,2,0]]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [None,slice(None),slice(None),slice(1,3),None]
// let index2 = [slice(None),[0,0,1,1],[0,1,0,1],slice(None),slice(None),[1,2,2,0]]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[False,False,False],[False,False,False]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[],[]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[False,False,False,False],[False,False,False,False],[False,False,False,False]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[],[]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[False,False,False,False],[False,False,False,False],[False,False,False,False]],slice(1,2)]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[],[],slice(1,2)]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [None,[1,1],Ellipsis,slice(1,2),[1,2]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [None,slice(None),Ellipsis,slice(1,2),slice(None)]
// let index2 = [slice(None),[1,1],Ellipsis,slice(None),[1,2]]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [None,slice(None),slice(None),slice(1,2),slice(None)]
// let index2 = [slice(None),[1,1],slice(None),slice(None),[1,2]]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })

// let c = reshape(arange(2*3*4*5*6*7),[2,3,4,5,6,7]) //c=np.arange(2*3*4*5*6*7).reshape(2,3,4,5,6,7)
// printArr(c,[],(res)=>{
//     console.log(res.value)
// })
// let index = [None,[1,1],Ellipsis,None,[1,1],slice(1,2)]
// console.log(shape(indexing(c,index)))
// printArr(indexing(c,index),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [None,slice(None),Ellipsis,None,slice(None),slice(1,2)]
// let index2 = [slice(None),[1,1],Ellipsis,slice(None),[1,1],slice(None)]
// console.log(shape(indexing(indexing(c,index1),index2)))
// printArr(indexing(indexing(c,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [None,slice(None),slice(None),slice(None),slice(None),None,slice(None),slice(1,2)]
// let index2 = [slice(None),[1,1],slice(None),slice(None),slice(None),slice(None),[1,1],slice(None)]
// console.log(shape(indexing(indexing(c,index1),index2)))
// printArr(indexing(indexing(c,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index = [None,[[True,True,False],[True,True,False]],slice(1,2),Ellipsis,None,[1,2,2,1]]
// console.log(shape(indexing(c,index)))
// printArr(indexing(c,index),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [None,slice(None),slice(None),slice(1,2),Ellipsis,None,slice(None)]
// let index2 = [slice(None),[[True,True,False],[True,True,False]],slice(None),Ellipsis,slice(None),[1,2,2,1]]
// console.log(shape(indexing(indexing(c,index1),index2)))
// printArr(indexing(indexing(c,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [None,slice(None),slice(None),slice(1,2),slice(None),slice(None),None,slice(None)]
// let index2 = [slice(None),[[True,True,False],[True,True,False]],slice(None),slice(None),slice(None),slice(None),[1,2,2,1]]
// console.log(shape(indexing(indexing(c,index1),index2)))
// printArr(indexing(indexing(c,index1),index2),[],(res)=>{
//     console.log(res.value)
// })

// let a = reshape(arange(2*3*4*5),[2,3,4,5]) //a=np.arange(2*3*4*5).reshape(2,3,4,5)
// printArr(a,[],(res)=>{
//     console.log(res.value)
// })
// let index = [[1,0,1],[1]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[1,0,1],[1,1,1]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[1],[[1,1],[0,0]],[[1]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[1,1],[1,1]],[[1,1],[0,0]],[[1,1],[1,1]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[1],slice(None),[[1,1],[0,0]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[1,1],[1,1]],slice(None),[[1,1],[0,0]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[1,0,1],1]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[1,0,1],[1,1,1]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[1,2],None,1]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[1,2],None,[1,1]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [slice(None),slice(None),None,slice(None)]
// let index2 = [slice(None),[1,2],slice(None),1]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index1 = [slice(None),slice(None),None,slice(None)]
// let index2 = [slice(None),[1,2],slice(None),[1,1]]
// console.log(shape(indexing(indexing(a,index1),index2)))
// printArr(indexing(indexing(a,index1),index2),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[1,2],[2,0]],None,1]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[1,2],[2,0]],None,[[1,1],[1,1]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[]]
// console.log(indexing(a,index))
// let index = [[],[]]
// console.log(indexing(a,index))
// let index = [[],[],[]]
// console.log(indexing(a,index))
// let index = [[],[],[],[]]
// console.log(indexing(a,index))
// let index = [[[[]]]]
// console.log(indexing(a,index))
// let index = [[[[]]],[[[]]]]
// console.log(indexing(a,index))
// let index = [[[[]]],[[[]]],[]]
// console.log(indexing(a,index))
// let index = [[[[]]],[[[]]],[],[]]
// console.log(indexing(a,index))
// let index = [slice(None),[]]
// console.log(indexing(a,index))
// let index = [slice(None),[],[]]
// console.log(indexing(a,index))
// let index = [slice(None),[],[],[]]
// console.log(indexing(a,index))
// let index = [slice(None),[[[]]]]
// console.log(indexing(a,index))
// let index = [slice(None),[[[]]],[]]
// console.log(indexing(a,index))
// let index = [slice(None),[[[]]],[],[]]
// console.log(indexing(a,index))
// let index = [slice(None),[],slice(None),[]]
// console.log(indexing(a,index))

// let b = reshape(arange(2*3*4*5*6),[2,3,4,5,6]) //b=np.arange(2*3*4*5*6).reshape(2,3,4,5,6)
// printArr(b,[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[],slice(None),[],slice(None)]
// console.log(indexing(b,index))
// let index = [slice(None),[],slice(None),[],[]]
// console.log(indexing(b,index))
// let index = [slice(None),[[[]]],slice(None),[]]
// console.log(indexing(b,index))
// let index = [slice(None),[[[]]],slice(None),[[1],[1]]]
// console.log(indexing(b,index))

// let a = reshape(arange(2*3*4*5),[2,3,4,5]) //a=np.arange(2*3*4*5).reshape(2,3,4,5)
// printArr(a,[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[],[1]]
// console.log(indexing(a,index))
// let index = [slice(None),[],[1,2]]
// console.log(indexing(a,index)) //报错，说明是正确的
// let index = [slice(None),[],[1],[1,1]]
// console.log(indexing(a,index)) //报错，说明是正确的
// let index = [slice(None),[],[[1]]]
// console.log(indexing(a,index))
// let index = [slice(None),[],[[0],[1]]]
// console.log(indexing(a,index))

// let e = reshape(arange(5*5),[5,5]) //e=np.arange(5*5).reshape(5,5)
// console.log(e)
// console.log(indexing(e,[slice(1,2),slice(None)]))
// console.log(indexing(e,[slice(1,2),slice(None)],[[30],[40],[50],[60],[70]])) // 报错，说明是正确的

// let a = reshape(arange(2*3*4*5),[2,3,4,5]) //a=np.arange(2*3*4*5).reshape(2,3,4,5)
// printArr(a,[],(res)=>{
//     console.log(res.value)
// })
// printArr(indexing(a,[slice(None),[1,2],slice(None),[1]],[[11111,22222,33333,44444]]),[],(res)=>{
//     console.log(res.value)
// })

// --------------------------------------------------

// let a = reshape(arange(2*3*4*5),[2,3,4,5]) //a=np.arange(2*3*4*5).reshape(2,3,4,5)
// printArr(a,[],(res)=>{
//     console.log(res.value)
// })
// let index = [[True,False]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[0]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[True,False,True]] // 报错，说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[True,False],[True,False,True]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[0],[0,2]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[True,True],[True,False,True]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[0,1],[0,2]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[True,True],[True,True,True]] // 报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[0,1],[0,1,2]] // 报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[True,False],slice(None),[True,True,True,False]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[0],slice(None),[0,1,2]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[True,True],slice(None),[True,True,True,False]] // 报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[0,1],slice(None),[0,1,2]] // 报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[True,False,False],[True,True,True,False]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[0],[0,1,2]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[True,False,True],[True,True,True,False]] //报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[0,2],[0,1,2]] //报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[True,False,True],[True,True,False,False]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[0,2],[0,1]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[True,False,False],slice(None),[True,True,False,False,False]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[0],slice(None),[0,1]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[True,False,True],slice(None),[True,True,False,False,False]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[0,2],slice(None),[0,1]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[True,False,True],slice(None),[True,True,True,False,False]] //报错，说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[0,2],slice(None),[0,1,2]] //报错，说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[0,0,1,1],[0,2,0,2]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,True,False]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[0,0,1,1],[0,2,0,1]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,True,True]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[0,0,1,1,1],[0,2,0,1,2]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True,False],[True,True,True,False]]] //报错，说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[True,True,False,False],[True,True,False,False],[True,True,False,False]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[0,0,1,1,2,2],[0,1,0,1,0,1]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[True,True,False,False],[True,True,True,True],[True,True,False,False]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[0,0,1,1,1,1,2,2],[0,1,0,1,2,3,0,1]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),slice(None),[[True,True,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),slice(None),[0,0,3],[0,1,4]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[[True,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True]]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[0,2],[0,3],[0,4]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[True,True,False,False],[True,True,True,True],[True,True,False,False]],[True,True,True,True]] // 报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[True,True,False,False],[True,True,True,True],[True,True,False,False]],[0,1,2,3]] // 报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[True,True,False,False],[True,True,True,True],[True,True,False,False]],[True,True,True,True,True]] // 报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[True,True,False,False],[True,True,True,True],[True,True,False,False]],slice(None),[True,True,True,True,True]] // 报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]],[True,True,True,True]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]],[0,1,2,3]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]],[True,True,True,True]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [0,0]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [0,2]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [1,2]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]],[0,1,2,3]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]],[True,True,True,False]] //报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]],[0,1,2]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]],[0,1,2,3]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]],[0,1,2,3],[1,1,1,1]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]],[0,1,2,3]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[True,False,False,False],[True,False,False,False],[True,False,False,True]],[0,1,2,3]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[True,False,True],[True,False,True]],slice(None),[0,1,2,3]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[0,1,2],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,True]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[0,1],slice(None),[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[False,False,True],[True,False,False]],[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[False,False,True],[True,False,False]],slice(None),[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]]] //报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[False,True,True],[True,False,False]],slice(None),[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]]] //报错说明是正确的
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[False,False,True],[True,False,False]],[[1,2],[3,2]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[0,1],[2,0],[[1,2],[3,2]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[0,1],[1,0]],slice(None),[[False,False,False,False,False],[False,False,False,False,False],[False,False,False,False,True],[True,False,False,False,False]]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[0,1],[1,0]],slice(None),[2,3],[4,0]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [[[0,1],[1,0]],slice(None),[2,3],[4,0]]
// console.log(shape(indexing(a,index)))
// printArr(indexing(a,index),[],(res)=>{
//     console.log(res.value)
// })

// let b = reshape(arange(2*3*4*5*6),[2,3,4,5,6]) //b=np.arange(2*3*4*5*6).reshape(2,3,4,5,6)
// printArr(b,[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[2,1],[1,0]],slice(None),[[True,True,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False],[False,False,False,False,False,False]]]
// console.log(shape(indexing(b,index)))
// printArr(indexing(b,index),[],(res)=>{
//     console.log(res.value)
// })
// let index = [slice(None),[[2,1],[1,0]],slice(None),[0,0],[0,1]]
// console.log(shape(indexing(b,index)))
// printArr(indexing(b,index),[],(res)=>{
//     console.log(res.value)
// })

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------

/*
关于Ellipsis/numpy_slice.py
关于切片slice/numpy_slice.py
*/

// let b = reshape(arange(1*2*3*4*5*6*7),[1,2,3,4,5,6,7]) //b = np.arange(1*2*3*4*5*6*7).reshape(1,2,3,4,5,6,7)
// printArr(b,[],(res)=>{
//     console.log(res.value)
// })
//console.log(indexing(b,[Ellipsis,[1,2],Ellipsis])) //报错说明是正确的
//console.log(indexing(b,[Ellipsis,Ellipsis,[1,2]])) //报错说明是正确的

// --------------------------------------------------

// let x = arange(10) //x = np.arange(10)
// console.log(x)
// console.log(indexing(x,[slice(1,7,2)]))
// console.log(indexing(x,[slice(1,7,3)]))
// console.log(indexing(x,[slice(1,8,3)]))
// console.log(indexing(x,[slice(0,8,3)]))
// console.log(indexing(x,[slice(0,8,2)]))
// console.log(indexing(x,[slice(7,1,-2)]))
// console.log(indexing(x,[slice(7,1,-3)]))
// console.log(indexing(x,[slice(8,1,-3)]))
// console.log(indexing(x,[slice(8,0,-3)]))
// console.log(indexing(x,[slice(8,0,-2)]))
// console.log(indexing(x,[slice(8,-3,-2)]))
// console.log(indexing(x,[slice(8,7,-2)]))
// console.log(indexing(x,[slice(-10-2,100,3)]))
// console.log(indexing(x,[slice(100,-10-2,-3)]))
// console.log(indexing(x,[slice(100,-10-2,3)]))
// console.log(indexing(x,[slice(-10-2,100,-3)]))
// console.log(indexing(x,[slice(9,9,-3)]))
// console.log(indexing(x,[slice(10,10,-3)]))
// console.log(indexing(x,[slice(0,0,-3)]))
// console.log(indexing(x,[slice(-11,-11,-3)]))





















