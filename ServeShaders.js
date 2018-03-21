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
	//get the ids
	var ids=getShaderList();
	
	//convert all to int and remove any non-ints, in case there's bad files
	ids=ids.map(x=>parseInt(x)).filter(x=>!isNaN(x));
	
	//new id is max id + 1
	var newid=Math.max.apply(null,ids)+1;
	
	//if we didnt get 
	if(ids.length==0){
		newid=0;
	}
	
	newid=newid+"";
	fs.writeFileSync(path.join(root,newid),"");
	
	return newid;
}
//for(var i=0;i<10;i++){console.log(exports.newShader());}

exports.saveShader=function(id,contents){
}
