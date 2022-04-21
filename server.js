const express = require('express');

const app = express();

app.get('/server',(request,response)=>{
    //设置响应头 设置允许跨域↓
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置响应体
    response.send('get请求成功啦！');
});

app.post('/server',(request,response)=>{
    // 这里是post请求的路由规则，当客户端发送post请求并且URL路径为/server，运行该函数↓
    //设置响应头 设置允许跨域↓
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置响应
    response.send('post请求成功啦！')
});

app.listen(8000,()=>{
    console.log("服务已启动，8000端口监听中...")
});
