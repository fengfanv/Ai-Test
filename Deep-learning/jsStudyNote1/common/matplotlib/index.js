//打开浏览器
function open_browser(url) {
    const { exec } = require('child_process');
    //使用默认浏览器打开
    exec('start http://www.baidu.com');

    //使用指定浏览器打开
    exec('start firefox http://www.baidu.com');

    //使用指定浏览器打开
    exec('start chrome http://www.baidu.com');
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

const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
