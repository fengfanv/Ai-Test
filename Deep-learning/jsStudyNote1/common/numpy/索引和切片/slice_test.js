
let arr = [0, 1, 2, 3, 4, 5, 6]

function slice(arr, i, j, k) {
    if(k==0){
        throw new Error('slice:error slice(i,j,k) k不能是0')
    }
    let n = arr.length;
    if (typeof k != 'number') {
        k = 1;
    }
    if (typeof i != 'number') {
        i = k>0?0:n-1;
    }
    if (typeof j != 'number') {
        j = k>0?n:-n-1;
    }

    
    





    let index = i;
    let newArr = [];
    while (index >= 0 && index < arr.length) {
        newArr.push(arr[index])
        index = index + k;
    }
    console.log('newArr：', newArr);
}

// slice(arr,6,1,-1)
// newArr： [ 6, 5, 4, 3, 2, 1, 0]

// slice(arr,1,6,2)
// newArr： [ 1, 3, 5 ]

// slice(arr,6,1,-2)
// newArr： [ 6, 4, 2, 0 ]

// slice(arr,6,1,-3)
// newArr： [6, 3, 0]