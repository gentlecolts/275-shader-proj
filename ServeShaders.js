'use strict'
const express = require('express');
const request=require('request');
const app = express();
app.use(express.static("."));
const fs=require('fs');

const util = require('util');

var EventEmitter=require('events').EventEmitter;
var root="./shaders"

exports.getAll=function(){
	return fs.readFileSync("./weather.html");
}

exports.getShader=function(id){
}

exports.newShader=function(){
}

exports.saveShader=function(id,contents){
}
