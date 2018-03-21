'use strict'
const express = require('express');
const request=require('request');
const app = express();
app.use(express.static("."));
const fs=require('fs');

const util = require('util');

var EventEmitter=require('events').EventEmitter;

const key=fs.readFileSync("../apikey.txt","utf8").trim();
const geturl="https://api.wunderground.com/api/"+key+"/hourly/q/";
//console.log(geturl);

exports.render=function(){
	return fs.readFileSync("./weather.html");
}

function escapeXML(unsafe) {
	return unsafe.replace(/[<>&'"]/g, function (c) {
		switch (c) {
			case '<': return '&lt;';
			case '>': return '&gt;';
			case '&': return '&amp;';
			case '\'': return '&apos;';
			case '"': return '&quot;';
		}
	});
}

class Weather extends EventEmitter{
	constructor(){
		super();
	}
	
	fetchWeather(zip){
		request({
			url:geturl+zip+".json",
			json:true
		},(err,response,data)=>{
			//store hourly conveniently
			var hourly=data.hourly_forecast;
			
			try{
				//make the table
				var str="<table data-role='table' class='ui-responsive'><tbody>";
			
				//add content to table
				for(var i=0;i<hourly.length;i++){
					//make row and cell
					str+="<tr><td>";
				
					//add text and icon, then close
					str+=escapeXML(hourly[i].FCTTIME.pretty);
					str+="<img src='"+encodeURI(hourly[i].icon_url)+"'></img></td></tr>";
				}
			
				//close tags
				str+="</tbody></table>";
				this.emit("done",str);
			}catch(e){
				this.emit("done","Error: bad response from wunderground, maybe bad zipcode?");
			}
		});
	}
}

exports.getWeather=function(zip,callback){
	var w=new Weather();
	w.once('done',callback);
	w.fetchWeather(zip);
}
