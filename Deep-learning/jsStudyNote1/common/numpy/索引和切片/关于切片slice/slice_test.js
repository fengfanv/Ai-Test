
function slice(d, i, j, k) {
    if (k == 0) return console.log(`k不能是0`);
    console.log(`before d=${d} i=${i} j=${j} k=${k}`);

    //1、如果i或j是numpy负索引，则转成正常索引
    i = i < 0 ? d + i : i;
    j = j < 0 ? d + j : j;

    //2、如果i或j超越了数组范围，将超越范围的值，进行正常化处理
    if (k > 0) {
        i = i <= 0 ? 0 : i;
        j = j >= d ? d : j;
    } else if (k < 0) {
        i = i >= (d - 1) ? (d - 1) : i;
        j = j <= -1 ? -1 : j;
    }

    //3、使用(j-i)/k 和 (j-i)%k进行计算
    let q = Math.floor((j - i) / k);
    let r = (j - i) % k;
    let m = r == 0 ? (q + r) : (q + 1);
    m = m <= 0 ? 0 : m;

    console.log(`after d=${d} i=${i} j=${j} k=${k} q=${q} r=${r} m=${m}`);
    console.log(`j-i==q*k+r ${j - i == q * k + r}`);
    console.log(`i+(m-1)*k<j ${i + (m - 1) * k < j}`);
    console.log(`i+(m-1)*k ${i + (m - 1) * k}`);

    let indexArr = [];
    let index = i;
    while (indexArr.length != m) {
        indexArr.push(index)
        index = index + k;
    }
    console.log('indexArr', indexArr);
}

// slice(10,1,7,2)
// before d=10 i=1 j=7 k=2
// after d=10 i=1 j=7 k=2 q=3 r=0 m=3
// j-i==q*k+r true
// i+(m-1)*k<j true
// i+(m-1)*k 5
// indexArr [ 1, 3, 5 ]

// slice(10,1,7,3)
// before d=10 i=1 j=7 k=3
// after d=10 i=1 j=7 k=3 q=2 r=0 m=2
// j-i==q*k+r true
// i+(m-1)*k<j true
// i+(m-1)*k 4
// indexArr [ 1, 4 ]

// slice(10,1,8,3)
// before d=10 i=1 j=8 k=3
// after d=10 i=1 j=8 k=3 q=2 r=1 m=3
// j-i==q*k+r true
// i+(m-1)*k<j true
// i+(m-1)*k 7
// indexArr [ 1, 4, 7 ]

// slice(10,0,8,3)
// before d=10 i=0 j=8 k=3
// after d=10 i=0 j=8 k=3 q=2 r=2 m=3
// j-i==q*k+r true
// i+(m-1)*k<j true
// i+(m-1)*k 6
// indexArr [ 0, 3, 6 ]

// slice(10,0,8,2)
// before d=10 i=0 j=8 k=2
// after d=10 i=0 j=8 k=2 q=4 r=0 m=4
// j-i==q*k+r true
// i+(m-1)*k<j true
// i+(m-1)*k 6
// indexArr [ 0, 2, 4, 6 ]

//----------------------------------

// 以下是 slice(i,j,k) 里k是负值时

//----------------------------------

// slice(10,7,1,-2)
// before d=10 i=7 j=1 k=-2
// after d=10 i=7 j=1 k=-2 q=3 r=0 m=3
// j-i==q*k+r true
// i+(m-1)*k<j false
// i+(m-1)*k 3
// indexArr [ 7, 5, 3 ]

// slice(10,7,1,-3)
// before d=10 i=7 j=1 k=-3
// after d=10 i=7 j=1 k=-3 q=2 r=0 m=2
// j-i==q*k+r true
// i+(m-1)*k<j false
// i+(m-1)*k 4
// indexArr [ 7, 4 ]

// slice(10,8,1,-3)
// before d=10 i=8 j=1 k=-3
// after d=10 i=8 j=1 k=-3 q=2 r=-1 m=3
// j-i==q*k+r true
// i+(m-1)*k<j false
// i+(m-1)*k 2
// indexArr [ 8, 5, 2 ]

// slice(10,8,0,-3)
// before d=10 i=8 j=0 k=-3
// after d=10 i=8 j=0 k=-3 q=2 r=-2 m=3
// j-i==q*k+r true
// i+(m-1)*k<j false
// i+(m-1)*k 2
// indexArr [ 8, 5, 2 ]

// slice(10,8,0,-2)
// before d=10 i=8 j=0 k=-2
// after d=10 i=8 j=0 k=-2 q=4 r=0 m=4
// j-i==q*k+r true
// i+(m-1)*k<j false
// i+(m-1)*k 2
// indexArr [ 8, 6, 4, 2 ]

//----------------------------------

// slice(10,8,-3,-2)
// before d=10 i=8 j=-3 k=-2
// after d=10 i=8 j=7 k=-2 q=0 r=-1 m=1
// j-i==q*k+r true
// i+(m-1)*k<j false
// i+(m-1)*k 8
// indexArr [ 8 ]

// slice(10,-10-2,100,3)
// before d=10 i=-12 j=100 k=3
// after d=10 i=0 j=10 k=3 q=3 r=1 m=4
// j-i==q*k+r true
// i+(m-1)*k<j true
// i+(m-1)*k 9
// indexArr [ 0, 3, 6, 9 ]

// slice(10,100,-10-2,-3)
// before d=10 i=100 j=-12 k=-3
// after d=10 i=9 j=-1 k=-3 q=3 r=-1 m=4
// j-i==q*k+r true
// i+(m-1)*k<j false
// i+(m-1)*k 0
// indexArr [ 9, 6, 3, 0 ]

//----------------------------------

// slice(10, 100, -10-2, 3)
// indexArr []

// slice(10, -10-2, 100, -3)
// indexArr []

// slice(10, 9, 9, -3)
// indexArr []

// slice(10, 10, 10, -3)
// indexArr []

// slice(10, 0, 0, -3)
// indexArr []

// slice(10, -11, -11, -3)
// indexArr []

// slice(4, 4,-11,-1)
// indexArr [ 3, 2, 1, 0 ]

// slice(4, -11, 100, 1)
// indexArr [ 0, 1, 2, 3 ]
