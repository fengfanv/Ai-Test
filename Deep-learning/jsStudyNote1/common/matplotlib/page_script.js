//关闭窗口
function close_page() {
    window.opener = null;
    window.open('', '_self');
    window.close();
}

window.onload = function () {
    setTimeout(() => {
        //创建一个ajax实例
        let xhr = new XMLHttpRequest()
        //配置请求
        xhr.open('GET', location.href + 'page_loading_completed', true)
        //监听请求过程
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText)
            }
        }
        //发送请求
        xhr.send()
    }, 2000)
}