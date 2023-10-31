
let arr = [0,1,2,3,4,5,6]

function slice(i,j,k,arr){
    let index = i;
    let newArr = [];
    while(index>=0 && index<arr.length){
        newArr.push(arr[index])
        index = index + k;
    }
    console.log('newArr：',newArr);
}

// slice(6,1,-1,arr)
// newArr： [ 6, 5, 4, 3, 2, 1, 0]

// slice(1,6,2,arr)
// newArr： [ 1, 3, 5 ]

// slice(6,1,-2,arr)
// newArr： [ 6, 4, 2, 0 ]