// 其实这算是一个Express脚本文件

const express = require('express');

const app = express();

// 创建路由规则 ↓
// request是对请求报文的封装
// response是对响应报文的封装
app.get('/',(request,response)=>{
    // 这里是get请求的路由规则，当客户端发送get请求并且URL路径为/server，运行该函数↓
    // 设置响应
    response.send('First Express Done!!!')
});

app.post('/',(request,response)=>{
    // 这里是post请求的路由规则，当客户端发送post请求并且URL路径为/server，运行该函数↓
    // 设置响应
    response.send('First Express Done!!!')
});

app.listen(8000,()=>{
    console.log("服务已启动，8000端口监听中...")
});
