const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(8080,function(){
	console.log("live");
});

app.post("/save",function(req,res){
	var code = req.body.code;
	var id = parseInt(req.body.id);
	if (id == 0) {
		//new shader
	} else {
		//old shader with id
	}
});

app.get("/home",function(req,res){
	var html = fs.readFileSync('./homepage.html', 'utf8');
	res.send(html);
});

app.get("/editor",function(req,res){
	var html = fs.readFileSync('./editorpage.html', 'utf8');
	res.send(html);
});

app.get("/populate",function(req,res){
	
});

app.get("/load",function(req,res){
	
});