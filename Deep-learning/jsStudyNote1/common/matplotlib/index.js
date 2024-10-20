

//打开浏览器
function openBrowser(url) {
    const { exec } = require('child_process');
    //使用默认浏览器打开
    exec('start ' + url);

    //使用指定浏览器打开
    // exec('start firefox http://www.baidu.com');

    //使用指定浏览器打开
    // exec('start chrome http://www.baidu.com');
}

//检查端口号，是否可用，如果不可用，返回可用端口号
//Netstat -ano
function getPort(port, callback) {
    const net = require('net');

    //检测端口号是否可用
    function checkPort(port) {
        return new Promise(function (resolve, reject) {
            var server = net.createServer().listen(port)
            server.on('listening', function () {
                server.close()
                resolve(port)
            });
            server.on('error', function (err) {
                if (err.code == 'EADDRINUSE') {
                    resolve(err)
                }
            })
        })
    }

    checkPort(port).then(function (res) {
        if (res instanceof Error) {
            console.log(`${port}已被占用`);
            port++;
            getPort(port, callback);
        } else {
            callback(port);
        }
    })
}

// getPort(7680, function (port) {
//     console.log(`端口${port}可用`);
// });

function openHttp(port, indexData, callback) {
    const http = require('http');
    const url = require('url');
    const path = require('path');
    const fs = require('fs');
    const server = http.createServer((request, response) => {
        var pathname = url.parse(request.url).pathname;
        if (pathname == "/") {
            pathname = '/index.html';
        }
        var filepath = path.join(__dirname, decodeURI(pathname));
        fs.stat(filepath, (err, stat) => {
            if (err) {
                if (pathname == '/index.html') {
                    response.writeHead(200, { 'Content-Type': 'text/html' })
                    response.end(indexData);
                } else if (pathname == '/page_loading_completed') {
                    callback && callback('page_loading_completed', server)
                    response.writeHead(200, { 'Content-Type': 'text/plain' })
                    response.end('success');
                } else {
                    response.writeHead(404, { 'Content-Type': 'text/html' })
                    response.end('状态：404，没有这样的文件或目录！');
                    console.log(err);
                }
            } else {
                let file_type = pathname.split('.')[1];
                var MIME = ''
                if (file_type == 'html' || file_type == 'htm') {
                    MIME = 'text/html'
                } else if (file_type == 'css') {
                    MIME = 'text/css'
                } else if (file_type == 'js') {
                    MIME = 'text/javascript'
                } else if (file_type == 'png') {
                    MIME = 'image/png'
                } else if (file_type == 'jpg' || file_type == 'jpeg') {
                    MIME = 'image/jpeg'
                } else if (file_type == 'gif') {
                    MIME = 'image/gif'
                } else {
                    MIME = 'text/plain'
                }
                fs.readFile(filepath, function (err, fileData) {
                    if (err) {
                        console.log(err);
                    }
                    response.writeHead(200, { 'Content-Type': MIME })
                    response.end(fileData);
                })
            }
        })
    });

    server.listen(port, 'localhost', () => {
        console.log('Listening on localhost:' + port);
        callback && callback('server_open_success', server)
    });
}

//图表--------------------------------------------------

//柱状图
function chartBar(data) {
    // data = [
    //     {
    //         label: 'xxx',
    //         x: [1, 2, 3, 4],
    //         y: [1, 2, 3, 4]
    //     }
    // ]

    if (data == undefined) {
        throw new Error('data不能为空')
    }

    if (Array.isArray(data) == false) {
        data = [data]
    }

    let legend = [];
    let xAxis = [];
    let series = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].label == undefined) {
            throw new Error('label不能为空')
        }
        legend.push(data[i].label)

        if (data[i].x == undefined) {
            throw new Error('x不能为空')
        }
        xAxis = data[i].x

        if (data[i].y == undefined) {
            throw new Error('y不能为空')
        }
        series.push(
            {
                name: data[i].label,
                type: 'bar',
                data: data[i].y
            }
        )
    }

    const fs = require('fs');
    fs.readFile(__dirname + '/chart_bar.html', 'utf8', (err, data) => {
        if (err) throw err;

        data = data.replace(/'start-legend-legend-legend-legend-legend-legend-end'/, JSON.stringify(legend))
        data = data.replace(/'start-xAxis-xAxis-xAxis-xAxis-xAxis-xAxis-end'/, JSON.stringify(xAxis))
        data = data.replace(/'start-series-series-series-series-series-series-end'/, JSON.stringify(series))
        // console.log(data);

        getPort(3000, (port) => {
            openHttp(port, data, (type, server) => {
                if (type == 'server_open_success') {
                    openBrowser('http://localhost:' + port)
                }
                if (type == 'page_loading_completed') {
                    server.close();
                    process.exit(0);
                }
            })
        })
    });
}

//折线图
function chartLine(data) {
    // data = [
    //     {
    //         label: 'xxx',
    //         x: [1, 2, 3, 4],
    //         y: [1, 2, 3, 4]
    //     }
    // ]

    if (data == undefined) {
        throw new Error('data不能为空')
    }

    if (Array.isArray(data) == false) {
        data = [data]
    }

    let legend = [];
    let xAxis = [];
    let series = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].label == undefined) {
            throw new Error('label不能为空')
        }
        legend.push(data[i].label)

        if (data[i].x == undefined) {
            throw new Error('x不能为空')
        }
        xAxis = data[i].x

        if (data[i].y == undefined) {
            throw new Error('y不能为空')
        }
        series.push(
            {
                name: data[i].label,
                type: 'line',
                data: data[i].y
            }
        )
    }

    const fs = require('fs');
    fs.readFile(__dirname + '/chart_line.html', 'utf8', (err, data) => {
        if (err) throw err;

        data = data.replace(/'start-legend-legend-legend-legend-legend-legend-end'/, JSON.stringify(legend))
        data = data.replace(/'start-xAxis-xAxis-xAxis-xAxis-xAxis-xAxis-end'/, JSON.stringify(xAxis))
        data = data.replace(/'start-series-series-series-series-series-series-end'/, JSON.stringify(series))
        // console.log(data);

        getPort(3000, (port) => {
            openHttp(port, data, (type, server) => {
                if (type == 'server_open_success') {
                    openBrowser('http://localhost:' + port)
                }
                if (type == 'page_loading_completed') {
                    server.close();
                    process.exit(0);
                }
            })
        })
    });
}

exports.chart = {
    bar: chartBar,
    line: chartLine,
}

//图片--------------------------------------------------

function image(path, other) {
    if (path == undefined) {
        throw new Error('path不能为空')
    }

    if (other != undefined) {
        if (Array.isArray(other) == false) {
            throw new Error('other必须是array')
        }
    }

    let file_type = path.slice(path.lastIndexOf('.')).replace('.', '')
    let MIME = ''
    if (file_type == 'png') {
        MIME = 'image/png'
    } else if (file_type == 'jpg' || file_type == 'jpeg') {
        MIME = 'image/jpeg'
    } else if (file_type == 'gif') {
        MIME = 'image/gif'
    } else if (file_type == 'bmp') {
        MIME = 'image/bmp'
    } else if (file_type == 'ico') {
        MIME = 'image/vnd.microsoft.icon'
    } else if (file_type == 'svg') {
        MIME = 'image/svg+xml'
    } else if (file_type == 'webp') {
        MIME = 'image/webp'
    } else {
        MIME = 'image/jpeg'
    }

    const fs = require('fs');
    let imageData = fs.readFileSync(path, { encoding: "binary" });
    imageData = 'data:' + MIME + ';base64,' + Buffer.from(imageData, 'binary').toString('base64');

    fs.readFile(__dirname + '/image.html', 'utf8', (err, data) => {
        if (err) throw err;

        data = data.replace(/'start-path-path-path-path-path-path-end'/, '"' + imageData + '"')
        data = data.replace(/'start-other-other-other-other-other-other-end'/, JSON.stringify(other))
        // console.log(data);

        getPort(3000, (port) => {
            openHttp(port, data, (type, server) => {
                if (type == 'server_open_success') {
                    openBrowser('http://localhost:' + port)
                }
                if (type == 'page_loading_completed') {
                    server.close();
                    process.exit(0);
                }
            })
        })
    });
}

exports.image = image;

//imshow--------------------------------------------------

//获取数组形状的方法
//来自numpy.main.getArrShape
function getArrShape(arr, shape) {
    if (Array.isArray(arr)) {
        shape.push(arr.length);
        if (arr.length > 0) {
            return getArrShape(arr[0], shape)
        } else {
            return shape
        }
    } else {
        return shape
    }
}

function imshow(X, cmap) {
    if (X == undefined) {
        throw new Error('X不能为空')
    }

    let X_shape = getArrShape(X, [])

    if (X_shape.length < 2 || X_shape.length > 3) {
        throw new Error(`图像数据的形状X.shape(${X_shape.join()})无效`)
    }

    if (X_shape.length == 3 && (X_shape[2] == 0 || X_shape[2] == 2 || X_shape[2] > 4)) {
        throw new Error(`图像数据的形状X.shape(${X_shape.join()})无效`)
    }

    const fs = require('fs');
    fs.readFile(__dirname + '/imshow.html', 'utf8', (err, data) => {
        if (err) throw err;

        data = data.replace(/'start-X-X-X-X-X-X-end'/, JSON.stringify(X))
        data = data.replace(/'start-X_shape-X_shape-X_shape-X_shape-X_shape-X_shape-end'/, JSON.stringify(X_shape))
        data = data.replace(/'start-cmap_type-cmap_type-cmap_type-cmap_type-cmap_type-cmap_type-end'/, `'${cmap}'`)
        // console.log(data);

        getPort(3000, (port) => {
            openHttp(port, data, (type, server) => {
                if (type == 'server_open_success') {
                    openBrowser('http://localhost:' + port)
                }
                if (type == 'page_loading_completed') {
                    server.close();
                    process.exit(0);
                }
            })
        })
    });
}
exports.imshow = imshow;

