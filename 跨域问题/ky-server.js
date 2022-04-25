const express = require('express');
const app = express();
//创建路由规则
app.all('/home',(request,response)=>{
    response.sendFile(__dirname+'/home.html');

})

app.all('/data',(request,response)=>{
    const data = {
        name:'m3'
    }
    //将数据转换为字符串
    let str = JSON.stringify(data);
    //使用模板字符串拼接
    response.send(`console.log(${str})`);
})

//jQuery发送Jsonp服务
app.all('/jq-jsonp-server',(request,response)=>{
    const data = {
        name:'mck',
        content:'好好学习前端'
    }
    //将数据转换为字符串
    let str = JSON.stringify(data);

    //接收callback参数
    let callback = request.query.callback;

    //使用模板字符串拼接
    response.send(`${callback}(${str})`);
})

app.listen(9000,()=>{
    console.log('服务已启动 9000端口监听中...')
})