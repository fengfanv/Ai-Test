// node.js 运行python脚本
console.log('开始运行');
const spawn = require('child_process').spawn
const py = spawn('python', ['json_test.py'])

const data = {
    msg: "Hello Python scripts"
}
//node向python脚本发送数据
py.stdin.write(JSON.stringify(data))
py.stdin.end()

//node监听python脚本传来的数据
py.stdout.on('data', (res)=>{
    console.log('接收到python脚本发来的数据：');
    let data = res.toString(); //Buffer转字符串
    console.log(data)
})

