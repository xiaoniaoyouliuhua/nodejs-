/*
* @Author: 1
* @Date:   2017-04-07 19:51:42
* @Last Modified by:   1
* @Last Modified time: 2017-04-07 21:52:41
*/

'use strict';
const http=require("http");
const fs=require("fs");
const path=require("path");
const xtpl=require("xtpl");
const musics=require(path.join(__dirname,"musics.json"));//获取json
const querystring=require("querystring");//处理getpost的参数 unescape 解决了URL的中文问题

//创建服务
const server=http.createServer();

//响应 请求处理
server.on("request",(req,res)=>{
	let urlString=req.url;
	// if(urlString.includes("list11.html")||urlString=="/"){
	// 	xtpl.renderFile(path.join(__dirname,"list11.html"),{
	// 		musics:musics
	// 	},(error,content)=>{
	// 		res.setHeader("Content-Type","text/html;charset=utf-8");
	// 		res.end(content);
	// 		console.log(content);
	// 	})
	// }
	if (urlString=='/' || urlString.includes('list11.html')) {
      //使用xtpl，利用数据去动态替换 list.html中的占位符，然后生成一个完整的html
      xtpl.renderFile(path.join(__dirname,'list11.html'),{
        musics:musics
      },(err,content)=>{
        res.setHeader("Content-Type","text/html;charset=utf-8")
        res.end(content);
        console.log(content)
      })
  }else if(urlString.includes("site.css")){
  	fs.readFile(path.join(__dirname,"statics/css/site.css"),(err,data)=>{
  		res.setHeader("Content-Type","text/css;charset=utf-8");
  		res.end(data);
  	});
  }else if(urlString.includes("jquery.min.js")){
  	fs.readFile(path.join(__dirname,"statics/js/jquery.min.js"),(err,data)=>{
  		res.setHeader("Content-Type","text/javascript;charset=utf-8");
  		res.end(data);
  	})
  }else if(urlString.includes(".mp3")){
  	urlString=querystring.unescape(urlString);//处理getpost的参数 unescape 解决了URL的中文问题
  	console.log(urlString);
  	fs.readFile(path.join(__dirname,urlString),(err,data)=>{
  		res.setHeader("Content-Type","audio/mpeg;charset=utf-8");//告诉浏览器处理的格式 网上找
  		res.end(data);
  	})
  }
})
//监听开启浏览器
server.listen(3000,"127.0.0.1",(err)=>{
	if(err){
		console.log(err);
	}
	console.log("success");
})