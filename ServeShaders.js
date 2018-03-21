'use strict'
//const express = require('express');
//const app = express();
//app.use(express.static("."));

const request=require('request');
const fs=require('fs');
const util = require('util');

var root="./shaders"

//make the root folder if it doesnt exist
if(!fs.existsSync(root)){
	fs.mkdirSync(root);
	console.log("root folder created");
}else{
	console.log("root folder exists :)");
}

function getShaderList(){
	var filelist=[]
	
	var files=fs.readdirSync(root);
	for(var i in files){
		if (!files.hasOwnProperty(i)) continue;
		var name = files[i];
		if (!fs.statSync(root+"/"+name).isDirectory()){
			filelist.push(name);
		}
	}
	return filelist;
}
//console.log(getShaderList());

exports.getAll=function(){
	return getShadereList();//fs.readFileSync("./weather.html");
}

exports.getShader=function(id){
}

exports.newShader=function(){
}

exports.saveShader=function(id,contents){
}
