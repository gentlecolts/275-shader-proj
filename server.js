const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static("."));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const shade=require("./ServeShaders");

app.listen(8080,function(){
	console.log("live");
});

app.post("/save",function(req,res){
	var code = req.body.code;
	var id = parseInt(req.body.id);
	try {
		shade.saveShader(id, code);
	} catch(err) {
		res.send("error saving shader");
	}
});

app.get("/new",function(req,res){
	var response = {
		"id" : shade.newShader()
	};
	res.send(JSON.stringify(response));
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
	res.send(shade.getAll());
});

app.get("/load",function(req,res){
	var id = parseInt(req.query.id);
	try {
		res.send(shade.getShader(id));
	} catch(err) {
		res.send("shader not found");
	}
});