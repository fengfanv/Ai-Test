var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
const PUBLIC_PATH = path.join(__dirname, "/\public\/");
http.createServer(function (request, response) {

    var pathname = url.parse(request.url).pathname;
    var file_address = path.join(PUBLIC_PATH, decodeURI(pathname));
    var method = request.method;
    console.log(pathname);
    fs.stat(file_address, function (err, stat) {
        if (err) {
            if (pathname == '/api/getNumber' && method == 'POST') {
                getNumber(request, response)
            } else {
                response.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
                response.end('状态：404，没有这样的文件或目录！');
                // console.log(err);
            }
        } else {
            let file_type = pathname.split('.')[1];
            var MIME = ''
            if (file_type == 'html' || file_type == 'htm') {
                MIME = 'text/html'
            }
            fs.readFile(file_address, function (err, fileData) {
                if (err) {
                    console.log(err);
                } response.writeHead(200, { 'Content-Type': MIME })
                response.end(fileData);
            })
        }
    })
}).listen(8080);

//获取数字识别
function getNumber(request, response) {
    console.log('request来到这里');
    var header = request.headers;
    var contentType = typeof header['content-type'] != 'undefined' ? header['content-type'] : null;
    var postData = '';
    request.on('data', function (chunk) {
        postData += chunk;//这种方式接收数据有1gb左右的限制
    });
    request.on('end', async function () {
        let data = null;
        if (new RegExp('^{[^]*}$', 'i').test(postData.trim())) {
            //json字符串
            data = JSON.parse(postData);
        } else {
            //key1=val1&key2=val2,兼容jquery设置content-type不准确的bug
            data = qs.parse(postData);
        }

        // console.log(data);

        //请求python
        const spawn = require('child_process').spawn
        const py = spawn('python', [__dirname + '/cnn/api.py'])

        console.log(__dirname + '/cnn/api.py');

        //node向python脚本发送数据
        py.stdin.write(JSON.stringify(data))
        py.stdin.end()

        //node监听python脚本传来的数据
        py.stdout.on('data', (res) => {
            console.log('接收到python脚本发来的数据：');
            let data = res.toString(); //Buffer转字符串
            console.log('接收python传回来的数据', data)
        })

        py.stdout.on('error', (err) => {
            console.log('启动子进程失败。', err);
        });

        response.writeHead(200, { 'Content-Type': 'text/plain' })
        response.end('1');
    })
}