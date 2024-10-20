const fs = require('fs');
const zlib = require('zlib');
const np = require('../common/numpy');
const matplotlib = require('../common/matplotlib');

var key_file = {
    'train_img': '../../studyNote1/dataset/train-images-idx3-ubyte.gz',
    'train_label': '../../studyNote1/dataset/train-labels-idx1-ubyte.gz',
    'test_img': '../../studyNote1/dataset/t10k-images-idx3-ubyte.gz',
    'test_label': '../../studyNote1/dataset/t10k-labels-idx1-ubyte.gz'
}

var train_num = 60000
var test_num = 10000
var img_dim = [1, 28, 28]
var img_size = 784
var num = 5000 //获取，训练5000条，测试5000条，合计10000条

function _load_label(file_name) {
    try {
        const gzipData = fs.readFileSync(file_name);

        //解压.gz文件内容
        data = zlib.gunzipSync(gzipData);

        let buf = Buffer.alloc(data.length - 8);
        data.copy(buf, 0, 8, data.length);

        return Array.from(new Uint8Array(buf).slice(0, num))
    } catch (err) {
        console.error('读取或解压.gz文件时出错:', err);
    }
}

function _load_img(file_name) {
    try {
        const gzipData = fs.readFileSync(file_name);

        //解压.gz文件内容
        data = zlib.gunzipSync(gzipData);

        let buf = Buffer.alloc(data.length - 16);
        data.copy(buf, 0, 16, data.length);

        return np.reshape(Array.from(new Uint8Array(buf).slice(0, num * 28 * 28)), [-1, img_size])
    } catch (err) {
        console.error('读取或解压.gz文件时出错:', err);
    }
}

function _change_one_hot_label(X) {
    let T = np.zeros([np.size(X), 10])
    for (let i = 0; i < T.length; i++) {
        T[i][X[i]] = 1
    }
    return T
}

function _convert_numpy() {
    let dataset = {}
    dataset['train_img'] = _load_img(key_file['train_img'])
    dataset['train_label'] = _load_label(key_file['train_label'])
    dataset['test_img'] = _load_img(key_file['test_img'])
    dataset['test_label'] = _load_label(key_file['test_label'])
    return dataset
}

function load_mnist(normalize, flatten, one_hot_label) {
    /*
    读入MNIST数据集
    
    Parameters
    ----------
    normalize : 将图像的像素值正规化为0.0~1.0
    flatten : 是否将图像展开为一维数组
    one_hot_label : 
        one_hot_label为True的情况下，标签作为one-hot数组返回
        one-hot数组是指[0,0,1,0,0,0,0,0,0,0]这样的数组
    
    Returns
    -------
    [训练图像,   训练标签,     测试图像,  测试标签]
    [train_img, train_label, test_img, test_label]
    */

    if (typeof normalize == 'undefined') {
        normalize = true;
    }
    if (typeof flatten == 'undefined') {
        flatten = true;
    }
    if (typeof one_hot_label == 'undefined') {
        one_hot_label = false;
    }

    let dataset = _convert_numpy();

    console.time('耗时')
    if (normalize) {
        let keyArr = ['train_img', 'test_img']
        for (let i in keyArr) {
            let key = keyArr[i];
            dataset[key] = np.expr(dataset[key], '/', 255)
        }
    }

    if (flatten == false) {
        let keyArr = ['train_img', 'test_img']
        for (let i in keyArr) {
            let key = keyArr[i];
            dataset[key] = np.reshape(dataset[key], [-1, 1, 28, 28])
        }
    }

    if (one_hot_label) {
        dataset['train_label'] = _change_one_hot_label(dataset['train_label'])
        dataset['test_label'] = _change_one_hot_label(dataset['test_label'])
    }
    console.timeEnd('耗时')

    return [dataset['train_img'], dataset['train_label'], dataset['test_img'], dataset['test_label']]
}

let [train_img, train_label, test_img, test_label] = load_mnist(true, false, true);
console.log(np.shape(train_img), np.shape(train_label), np.shape(test_img), np.shape(test_label))

//使用console.log展示第一张图片
let trainFirstImage = consoleShowImage(train_img[9])
let trainFirstLabel = train_label[9]
console.log(trainFirstImage)
console.log(trainFirstLabel)

console.log('-------------------')

let testFirstImage = consoleShowImage(test_img[9])
let testFirstLabel = test_label[9]
console.log(testFirstImage)
console.log(testFirstLabel)

function consoleShowImage(arr) {
    arr = np.reshape(arr, [-1])
    let imageStr = ''
    for (let i = 0; i < arr.length; i++) {
        if (i % 28 == 0) {
            imageStr += '\r\n'
        }

        // let value = String(arr[i]);
        let value = String(arr[i] * 255);
        if (value.length < 3) {
            let gap = '';
            for (let j = 0; j < 3 - value.length; j++) {
                gap += '0'
            }
            value = gap + value;
        }
        imageStr += value;
    }
    return imageStr
}

matplotlib.imshow(test_img[500][0])