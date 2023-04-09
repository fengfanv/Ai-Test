
//乘法
function multiply(value, arr, index) {
    if (index >= arr.length) {
        return value
    } else {
        let newValue = value * arr[index];
        let newIndex = index + 1;
        return multiply(newValue, arr, newIndex)
    }
}
exports.multiply = multiply;