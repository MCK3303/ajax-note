### ajax实验

1.使用express框架 编写一个服务器端脚本 server.js

```js
const express = require('express');
const app = express();
// 创建路由规则 ↓
// request是对请求报文的封装
// response是对响应报文的封装
app.get('/server',(request,response)=>{
    // 这里是get请求的路由规则，当客户端发送get请求并且URL路径为/server，运行该函数↓
    //设置响应头 设置允许跨域↓
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置响应体
    response.send('get请求成功啦！');
});
app.listen(8000,()=>{
    console.log("服务已启动，8000端口监听中...")
});
```

2.打开项目终端 node server.js 运行脚本，此时8000端口启用。

### GET请求

实验前端页面 需求：不刷新页面 点击按钮 收到并在div中展示来自server的响应

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

### POST请求：

需求：把鼠标移入div时 发送post请求 并把请求得到的结果展示在div中 

需要在server.js中，创建post请求的路由规则↓

```js
app.post('/server',(request,response)=>{
    // 这里是post请求的路由规则，当客户端发送post请求并且URL路径为/server，运行该函数↓
    //设置响应头 设置允许跨域↓
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置响应
    response.send('post请求成功啦！')
});
```

post-page的script标签↓

```js
    <script>
        const box = document.getElementById('box');
        // 绑定事件
        box.addEventListener('mouseover',function(){
            const xhr = new XMLHttpRequest();
            //请求方式为post
            xhr.open('post','http://localhost:8000/server');
            xhr.send();
            xhr.onreadystatechange =()=>{
                if(xhr.readyState === 4){
                    if(xhr.status >=200 && xhr.status <300){
                        box.innerHTML = xhr.response;
                    }
                }
            }
        })
    </script>
```

post发送请求的参数 可以在send()中传递↓

```js
//比如传递一个参数a=30 只需要↓
xhr.send('a=30');
```

打开浏览器的开发者工具--Network中 点开post请求响应得到的server文件，点击Payload，就可以看到发送的参数了。

### 设置请求头信息：

在xhr.open()后面，新增一个语句

```js
xhr.setRequestHeader('key','value');
```

### 服务器端响应JSON：

server.js中新建一个路由规则

```js
//可以接收任意类型的请求 .all()
app.all('/json-server',(request,response)=>{
    // 设置响应头
    response.setHeader('Access-Control-Allow-Origin','*');
    // 响应一个数据
    const data = {
        name : "mck",
        age : 22
    };
    //把data对象转换为字符串
    let str = JSON.stringify(data);
    //因为send()只能接收字符串和buffer
    response.send(str);
});
```

前端页面 json-page：
通过ajax请求得到response，把数据==手动转换==为对象↓

```js
let data = JSON.parse(xhr.response);
```

自动转换：添加一行以下代码

```js
//设置响应体数据的类型
xhr.responseType = 'json'
```

### nodemon自动重启工具

修改服务端代码需要重启时，使用这个工具能够方便许多。
安装指令：npm install -g nodemon

### 解决ie浏览器缓存问题：

在ie浏览器中向服务端发送的请求，第一次会发送向服务端，但之后的发送，如果浏览器都判定为请求是相同的，就不会发送请求到服务端，而是发向本地的缓存。
因此，解决“==判定请求相同==”这个问题，可以在请求URL后面加上时间戳参数↓

```js
 // 添加时间戳参数↓
    xhr.open('get','http://localhost:8000/server?t='+Date.now());
```

### AJAX请求超时与网络异常处理：

```js
// 在ajax请求代码里添加↓
// 网络超时秒数设置↓
            xhr.timeout = 2000;
            // 网络超时的时候会触发↓
            xhr.ontimeout = function(){
                alert('网络超时');
            }
```

网络异常提醒：↓

```js
//网络异常、断开连接等情况会触发↓
xhr.onerror = function(){
	alert('网络异常');
}
```

### AJAX取消请求：

在'网络超时'当中，超时后浏览器自动取消了请求。
手动取消请求：用到XMLHttpRequest对象中的方法 abort()

### 请求重复问题：

当用户重复频繁发送同样的请求时，服务器的压力会变大，因此可以采取如下的方式减轻频繁发送请求↓

```js
<script>
        //设置标识
        let isSending = false;
        let xhr = null;
        const btn = document.getElementById('btn');
        // 绑定事件
        btn.addEventListener('click',function(){
            //如果请求在发送中，就取消该请求，发送一个新的请求↓
            if(isSending){
                xhr.abort();
            }
            xhr = new XMLHttpRequest();
            // 向延迟服务器发送请求
            xhr.open('get','http://localhost:8000/ie?t='+Date.now());
            xhr.send();
            //请求发送中↓
            isSending = true;
            xhr.onreadystatechange =()=>{
                if(xhr.readyState === 4){
                   isSending = false;
                }
            }
        })
    </script>
```

设置isSending标识，当isSending为true时表示有请求正在发送当中，取消/中断该发送中的请求并发送一个新的请求，为false则没有。
当readyState状态码为4表示请求完成，重置isSending的状态为false。

### jQuery发送请求：

先通过script标签引入jQuery：

```Js
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
```

页面代码：

```js
<h3>jQuery发送ajax请求↓</h3>
    <hr>
    <button class="get">get</button>
    <button class="post">post</button>
    <button class="ajax">通用型ajax</button>
    <script>
        $('button').eq(0).click(function(){
            //jQuery发送get请求
            //URL,{要发送的参数},回调函数(响应体),响应体的类型
            $.get('http://127.0.0.1:8000/jQuery-server',{},function(data){
                console.log(data);
            },'json')
            //加了'json' 得到的就是数据内容 不加'json' 得到的是字符串
        })
        $('button').eq(1).click(function(){
            //jQuery发送post请求
            $.post('http://127.0.0.1:8000/jQuery-server',{},function(data){
                console.log(data);
            })
        })
        //通用发送 ajax
        $('button').eq(2).click(function(){
            $.ajax({
                //url
                url:'http://127.0.0.1:8000/jQuery-server',
                //参数
                data:{},
                //请求类型
                type:'GET',
                //响应体结果
                dataType:'json',
                //成功的回调
                success:function(data){
                    console.log(data);
                },
                //超时时间设置
                timeout:2000,
                //失败的回调
                error:function(){
                    alert('可能出了一些小问题~刷新一下吧');
                    console.log('可能出了一些小问题~刷新一下吧');
                },
                //头信息
                headers:{
                    
                }
            })
        })
    </script>
```

如果只需要发送简单的请求，那么只调用get方法或post方法即可。如果希望发送的请求更加具体，可以选择配置项更完整的$.ajax通用型发送。

### Axios：目前最热门的ajax工具库(Vue/React推荐）

引入axios：

```js
<script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/axios/0.26.1/axios.js">
</script>
```

Axios的数据返回和处理主要是基于Promise的，而jQuery是回调函数。

```js
axios.defaults.baseURL = 'http://localhost:8000';

        btns[0].onclick = function(){
            //axios get请求
            axios.get('/axios-server',{
                //URL参数
               params:{
                   id:100
               },
                //请求头信息
               headers:{
                  name:'mmm'
               }
            //请求成功后 调用then处理数据（基于Promise）
            }).then(response =>{
                console.log(response);
            });
        }
```

当设置了请求头信息，出现了如下报错：
Request header field Content-Type is not allowed by Access-Control-Allow-Headers
原因：服务器端还没有设置对请求头的应答。包含自定义header字段的跨域请求，浏览器会先向服务器发送OPTIONS请求，探测该服务器是否允许自定义的跨域字段。 
解决↓：

```js
//server.js
//在对应的服务路由规则中，加上这么一句↓
response.setHeader('Access-Control-Allow-Headers','*');
```

### fetch发送ajax：

```js
       const btns = document.querySelectorAll('button');
        btns[0].onclick = function(){
            fetch('http://localhost:8000/fetch-server',{
                //请求方法
                method:'post',
                //请求头
                headers:{
                    qingqiutou:'111'
                },
                //请求体
                body:'username=fetch&&password=fetch111'
            })
            //调用then处理接收的数据
            .then(response =>{
                //返回的是一个promise对象 转为json格式
                return response.json()
            })
            //对上一个返回的promise json数据处理
            .then(response =>{
                console.log(response);
            });
        }
```

fetch是浏览器原生支持的api。

### fetch 与 axios 的对比：

fetch是一个底层的 api 浏览器原生支持的 axios是一个封装好的框架

axios 1）支持浏览器和nodejs发请求 前后端发请求，
2）支持promise语法
3）支持自动解析json
4）支持中断请求
5） 支持拦截请求
6） 支持请求进度监测
7） 支持客户端防止csrf

一句话总结： 封装比较好

fetch
优点： 

1. 浏览器级别原生支持的api

2. 原生支持promise api
3. 语法简洁 符合 es 标准规范
4. 是由whatwg 组织提出的 现在已经是w3c规范

缺点：
1. 不支持文件上传进度监测

2. 使用不完美 需要封装

3. 不支持请求中止

4. 默认不带cookie
  一句话总结： 缺点是需要封装 优点 底层原生支持

  转载自：
  原文链接：https://blog.csdn.net/qq_44621848/article/details/120217391

？跨域是什么
浏览器从一个域名的网页去请求另一个域名的资源时，域名、端口、协议任一不同，都是跨域。 

同源策略：最早由网景Netscape公司提出，是浏览器的一种安全策略。
ajax是默认支持同源策略的。

### Jsonp(JSON with Padding) 跨域解决方案：

只支持get请求

jsonp原理：返回结果的形式是函数调用，而函数的参数就是返回给客户端的结果数据（函数提前在script标签中声明）。

原生jsonp过程大概如下↓

```js
//1.创建script标签元素
const script = document.createElement('script');
//2.设置script标签的src属性(发送请求的URL地址)
script.src = 'http://127.0.0.1:8000/jsonp';
//3.将创建的script标签插入到文档中(插入后就相当于向URL发送请求了)
document.body.appendChild(script);
```

```
//server.js

```

### 通过jQuery发送jsonp请求：

引入jQuery.js
页面样式：一个按钮 id="btn"，一个方框容器div id="box"

```js
//jQuery发送jsonp.html script标签
<script>
        //点击按钮 jQuery发送请求
        $('#btn').click(function(){
            //URL后要跟callback=?参数，function(data)对接收数据进行处理
            $.getJSON('http://127.0.0.1:9000/jq-jsonp-server?callback=?',function(data){
                //在box容器中显示接收的数据内容
                $('#box').html(`
                名称:${data.name}<br>
                内容:${data.content}
                `)
            })
        })
 </script>
```

写法 $.getJSON('URL?callback=?'),function(){}
这里的callback参数是固定写法。

```js
//ky-server.js
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
```

在服务端脚本中，let定义一个变量接收callback参数(callback是一种回调函数)。



