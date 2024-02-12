const { slice, Ellipsis, None, True, False, indexing } = require('./index.js');
const { shape, arange, reshape } = require('./index.js');
const { printArr } = require('./common.js');

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
