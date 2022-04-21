ajax实验

1.使用express框架 编写一个服务器端脚本 server.js

```js
const express = require('express');
const app = express();
app.get('/server',(request,response)=>{
    //设置响应头 设置允许跨域↓
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置响应体
    response.send('AJAX Done');
});
app.listen(8000,()=>{
    console.log("服务已启动，8000端口监听中...")
});
```

2.打开项目终端 node server.js 运行脚本，此时8000端口启用。

3.实验前端页面 需求：不刷新页面 点击按钮 收到并在div中展示来自server的响应

页面写好按钮、div样式。在script中获取DOM元素，为按钮设置onclick点击事件。

```js
<script>
        // 获取button元素
        const click_send = document.getElementById('click_send');
        // 获取div元素
        const res = document.getElementById('res');
        // 点击获取响应
        click_send.onclick = ()=>{
            const xhr = new XMLHttpRequest();
            xhr.open('GET','http://localhost:8000/server');
            xhr.send();
            xhr.onreadystatechange = function(){
                // 判断readyState状态
                if(xhr.readyState === 4){
                    // 判断响应状态码 200~299表示请求成功 得到响应response
                    if(xhr.status >= 200 && xhr.status <300){
                        console.log(xhr.status);//状态码
                        console.log(xhr.statusText);//状态字符串 OK
                        console.log(xhr.getAllResponseHeaders);//获取响应头
                        console.log(xhr.response);//响应体
                    //把响应体展示在div元素中↓  实现了不刷新页面 从服务器得到响应结果
                        res.innerHTML = xhr.response;
                    }
                }
            }
       }
    </script>
```

点击按钮后实现ajax请求，向本地8000端口发送请求。



js回文数思路：
3位数 取前2 后2反转     取parseInt(3/2)
4位数 取前2 后2反转     取parseInt(4/2)
5位数 取前2 后2反转     取parseInt(5/2)
6位数 取前3 后3反转     取parseInt(6/2)
...
转换字符串i = x.toString()，取parseInt(i.length/2) 位数i.length
for(var j = 0;j<parseInt(i.length/2)-1,j++) 
