'use strict'
//const express = require('express');
//const app = express();
//app.use(express.static("."));

const fs=require('fs');
const util = require('util');
const path = require('path');

var root="./shaders"

//make the root folder if it doesnt exist
if(!fs.existsSync(root)){
	fs.mkdirSync(root);
	console.log("root folder created");
}else{
	console.log("root folder exists, no need to re-make it");
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
	return getShadereList();//wif
}

exports.getShader=function(id){
	if(isNaN(parseInt(id))){
		throw "given id is not a number";
	}
	
	var fullpath=path.join(root,id)
	console.log("loading: "+fullpath);
	
	return fs.readFileSync(fullpath);
}
//console.log(exports.getShader("3"));

exports.newShader=function(){
}

exports.saveShader=function(id,contents){
}
