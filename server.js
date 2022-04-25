const express = require('express');

const app = express();

// get-page
app.get('/server',(request,response)=>{
    //设置响应头 设置允许跨域↓
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置响应体
    response.send('get请求成功啦！');
});

// IE缓存问题、延迟响应
app.get('/ie',(request,response)=>{
    //设置响应头 设置允许跨域↓
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置响应体（延迟响应）
    setTimeout(()=>{
        response.send('ie缓存问题解决 - 1');
    },3000)
});

//post-page
app.post('/server',(request,response)=>{
    // 这里是post请求的路由规则，当客户端发送post请求并且URL路径为/server，运行该函数↓
    //设置响应头 设置允许跨域↓
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置响应
    response.send('post请求成功啦！')
});

// JSON响应
// 接收所有类型响应头 .all()
app.all('/json-server',(request,response)=>{
    // 这里是post请求的路由规则，当客户端发送post请求并且URL路径为/server，运行该函数↓
    //设置响应头 设置允许跨域↓
    response.setHeader('Access-Control-Allow-Origin','*');
    // 响应一个数据
    const data = {
        name : "mck",
        age : 22
    };
    let str = JSON.stringify(data);
    response.send(str);
});

//jQuery服务
// app.get('/jQuery-server',(request,response)=>{
//     //设置响应头 设置允许跨域↓
//     response.setHeader('Access-Control-Allow-Origin','*');
//     // 设置响应体
//     response.send('jQuery get请求 完成！');
    
// });
// app.post('/jQuery-server',(request,response)=>{
//     //设置响应头 设置允许跨域↓
//     response.setHeader('Access-Control-Allow-Origin','*');
//     // 设置响应体
//     response.send('jQuery post请求 完成！');
// });
app.all('/jQuery-server',(request,response)=>{
    //设置响应头 设置允许跨域↓
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置响应体
    // const data = JSON.stringify('JSON字符串？')
    const data = {
        name:'mck',
        value:'666666'
    }
    response.send(JSON.stringify(data));
});

//axios服务
app.all('/axios-server',(request,response)=>{
    //设置响应头 设置允许跨域↓
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    const data = {
        name:'axios',
        value:'axios服务端返回的数据'
    }
    response.send(JSON.stringify(data));
});

//fetch服务
app.all('/fetch-server',(request,response)=>{
    //设置响应头 设置允许跨域↓
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    const data = {
        name:'fetch',
        value:'fetch服务端返回的数据'
    }
    response.send(JSON.stringify(data));
});

app.listen(8000,()=>{
    console.log("服务已启动，8000端口监听中...")
});
