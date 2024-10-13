const Sort = require('./sort.js')
var argsort = Sort.argsort;

const Reshape = require('./reshape.js')
var reshape = Reshape.reshape;

const Main = require('./main.js')
var shape = Main.shape;

const Axis = require('./axis.js')
var get_axis = Axis.get_axis;
var axisArrToOriginalArr = Axis.axisArrToOriginalArr;

const printTest = require('./print_test.js')
var toStr = printTest.toStr;

function unique(ar, return_index, return_inverse, return_counts, axis) {
    if (typeof ar == 'undefined') {
        throw new Error('ar不能为空')
    }

    if (!Array.isArray(ar)) {
        ar = [ar]
    }

    if (typeof return_index == 'undefined') {
        return_index = false
    }

    if (typeof return_inverse == 'undefined') {
        return_inverse = false
    }

    if (typeof return_counts == 'undefined') {
        return_counts = false
    }

    let only_arr = [];
    let return_index_list = [];
    let return_inverse_list = [];
    let return_counts_list = [];

    if (typeof axis == 'undefined') {
        let ar_flatten = reshape(ar, [-1])
        let ar_flatten_argsort = argsort(ar_flatten)
        let ar_flatten_sort = [];

        for (let i = 0; i < ar_flatten_argsort.length; i++) {
            let index = ar_flatten_argsort[i];
            let value = ar_flatten[index];
            ar_flatten_sort.push(value)
            if (only_arr.indexOf(value) == -1) {
                only_arr.push(value)
                return_index_list.push(index)

                let count = 0;
                for (let j = 0; j < ar_flatten.length; j++) {
                    if (ar_flatten[j] == value) {
                        count++;
                    }
                }
                return_counts_list.push(count)
            }
        }

        for (let i = 0; i < ar_flatten.length; i++) {
            return_inverse_list.push(only_arr.indexOf(ar_flatten[i]))
        }
        return_inverse_list = reshape(return_inverse_list, shape(ar))
    } else {
        // 目前是阉割版，暂时不支持axis处理
    }

    if (return_index == false && return_inverse == false && return_counts == false) {
        return only_arr
    } else {
        let data_list = [
            {
                status: return_index,
                list: return_index_list
            },
            {
                status: return_inverse,
                list: return_inverse_list
            },
            {
                status: return_counts,
                list: return_counts_list
            }
        ]
        let resultData = [only_arr];
        for (let i = 0; i < data_list.length; i++) {
            if (data_list[i].status) {
                resultData.push(data_list[i].list)
            }
        }
        return resultData;
    }
}
exports.unique = unique;

//let a = [[[70, 70, 1, 13], [3, 80, 80, 111], [9, 15, 2, 14]], [[8, 4, 111, 5], [18, 6, 19, 16], [0, 111, 17, 10]]];

// console.log(toStr(unique(a)))

// console.log(toStr(unique(a,true)))

// console.log(toStr(unique(a,true,true)))

// console.log(toStr(unique(a,true,true,true)))

// console.log(toStr(unique(a,false,true,true)))

// console.log(toStr(unique(a,true,false,true)))

// console.log(toStr(unique(a,true,true,false)))

// console.log(toStr(unique(a,false,true,false)))

// console.log(toStr(unique([1, 1, 2, 2, 3, 3])))

// console.log(toStr(unique([[1, 1], [2, 3]])))

// console.log(toStr(unique([[1, 0, 0], [1, 0, 0], [2, 3, 4]])))

// console.log(toStr(unique([[1, 0, 0], [1, 0, 0], [2, 3, 4]],false,false,false,1)))