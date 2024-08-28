// var data = {
//     "code": 200,
//     "msg": "操作成功",
//     "data": {
//         "projectMonths": [
//             {
//                 "month": "05",
//                 "approach_count": undefined,
//                 "retreat_count": null
//             },
//             {
//                 "month": "06",
//                 "approach_count": {},
//                 "retreat_count": [2, { b: 2 }, 1]
//             },
//             {
//                 "month": "07",
//                 "approach_count": function (a, b) { return 'xxx' },
//                 "retreat_count": 0
//             },
//             {
//                 "month": "08",
//                 "approach_count": [],
//                 "retreat_count": [{ a: 1 }, 1]
//             },
//             {
//                 "month": "09",
//                 "approach_count": [1, 2, 3, 4, 5],
//                 "retreat_count": [
//                     [0, 1, 2, 3],
//                     [4, 5, 6, 7],
//                     [8, 9, 10, 11]
//                 ]
//             },
//             {
//                 "month": "10",
//                 "approach_count": [1, [[1, 2]]],
//                 "retreat_count": 0
//             }
//         ],
//         "approachCount": 6,
//         "contractCount": 2,
//         "retreatCount": 0,
//         "customerCount": 2
//     }
// }

/**
 * 格式化数组或对象（用于解决JSON.stringify会把undefined和function忽略的问题）
 * @param {Array | Object} data 将被格式化的数组或对象
 * @param {Number} num 本级(层)的空格数量（基于父级的空格数量）
 * @param {Boolean} parentIsArr 父级是否是数组
 * @param {Boolean} isLast 当前数据(arr|obj)是否是，父级内最后一个元素
 * @returns String
 */
function print(data, num, parentIsArr, isLast) {
    if (Array.isArray(data) == false && Object.prototype.toString.call(data) != '[object Object]') {
        return String(data);
    }

    let space = 2;
    if (num == undefined) {
        num = 0;
    }

    if (parentIsArr == undefined) {
        parentIsArr = false;
    }

    if (isLast == undefined) {
        isLast = true;
    }

    let blankSpace = '';
    for (let i = 0; i < num; i++) {
        blankSpace += ' ';
    }

    let textSpace = '';
    for (let i = 0; i < space; i++) {
        textSpace += ' ';
    }

    let lineBreak = '\r\n';

    let isArr = Array.isArray(data);

    let start = isArr ? '[' : '{';
    if (parentIsArr) {
        start = blankSpace + start + lineBreak;
    } else {
        start = start + lineBreak;
    }

    let end = isArr ? ']' : '}';
    if (isLast) {
        end = blankSpace + end + lineBreak;
    } else {
        end = blankSpace + end + ',' + lineBreak;
    }

    let content = '';
    if (isArr) {
        //是数组
        let haveChild = false;
        for (let i = 0; i < data.length; i++) {
            let value = data[i];
            let last = i + 1 == data.length;
            if (Array.isArray(value) && value.length > 0) {
                content += print(value, num + space, isArr, last)
                haveChild = true
            } else if (Object.prototype.toString.call(value) == '[object Object]' && Object.keys(value).length > 0) {
                content += print(value, num + space, isArr, last)
                haveChild = true
            } else {
                if (Array.isArray(value)) {
                    value = '[]'
                } else if (Object.prototype.toString.call(value) == '[object Object]') {
                    value = '{}'
                } else if (typeof value == 'string') {
                    value = '"' + value + '"'
                } else {
                    value = String(value)
                }
                content += blankSpace + textSpace + value
                if (last) {
                    content += lineBreak
                } else {
                    content += ',' + lineBreak
                }
            }
        }
        if (haveChild == false) {
            start = start.replace(new RegExp(lineBreak, 'g'), '')
            content = content.replace(new RegExp(lineBreak, 'g'), '')
            content = content.replace(new RegExp(' ', 'g'), '')
            end = end.replace(new RegExp(' ', 'g'), '')
        }
    } else {
        //是对象
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = data[key];
            let last = i + 1 == keys.length;
            if (Array.isArray(value) && value.length > 0) {
                content += blankSpace + textSpace + key + ':' + print(value, num + space, isArr, last)
            } else if (Object.prototype.toString.call(value) == '[object Object]' && Object.keys(value).length > 0) {
                content += blankSpace + textSpace + key + ':' + print(value, num + space, isArr, last)
            } else {
                if (Array.isArray(value)) {
                    value = '[]'
                } else if (Object.prototype.toString.call(value) == '[object Object]') {
                    value = '{}'
                } else if (typeof value == 'string') {
                    value = '"' + value + '"'
                } else {
                    value = String(value)
                }
                content += blankSpace + textSpace + key + ':' + value
                if (last) {
                    content += lineBreak
                } else {
                    content += ',' + lineBreak
                }
            }
        }
    }
    return start + content + end;
}
exports.toStr = print;

// console.log(data)
// console.log(JSON.stringify(data, null, 2))
// console.log(print(data))

//-------------------------------------------------

// var b = [
//     [
//         [
//             [0, 1, 2, 3],
//             [4, 5, 6, 7],
//             [8, 9, 10, 11]
//         ],
//         [
//             [12, 13, 14, 15],
//             [16, 17, 18, 19],
//             [20, 21, 22, 23]
//         ]
//     ]
// ]

// console.log(b)
// console.log(JSON.stringify(b, null, 2))
// console.log(print(b))
