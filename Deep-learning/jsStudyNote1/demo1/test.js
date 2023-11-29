const np = require('../common/numpy');
const { printArr } = require('../common/numpy/common')

console.log('np', np)

a = np.reshape(np.arange(2 * 3 * 4), [2, 3, 4]);

printArr(a, [], (res) => {
    console.log(res.index,res.value)
})
/*
[0, 0, 0] 0
[0, 0, 1] 1
[0, 0, 2] 2
[0, 0, 3] 3
[0, 1, 0] 4
[0, 1, 1] 5
[0, 1, 2] 6
[0, 1, 3] 7
[0, 2, 0] 8
[0, 2, 1] 9
[0, 2, 2] 10
[0, 2, 3] 11
[1, 0, 0] 12
[1, 0, 1] 13
[1, 0, 2] 14
[1, 0, 3] 15
[1, 1, 0] 16
[1, 1, 1] 17
[1, 1, 2] 18
[1, 1, 3] 19
[1, 2, 0] 20
[1, 2, 1] 21
[1, 2, 2] 22
[1, 2, 3] 23
*/