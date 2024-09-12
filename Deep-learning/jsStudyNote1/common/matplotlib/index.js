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
        return new Promise((resolve, reject) => {
            var server = net.createServer().listen(port)
            server.on('listening', () => {
                server.close()
                resolve(port)
            });
            server.on('error', (err) => {
                if (err.code == 'EADDRINUSE') {
                    resolve(err)
                }
            })
        })
    }

    checkPort(port).then((res) => {
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