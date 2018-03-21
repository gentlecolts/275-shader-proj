const express = require('express');
const app = express();
app.use(express.static("."));
const shade=require("./ServeShaders");

app.listen(8080,function(){
	console.log("live");
});

app.get("/calc",function(req,res){
	res.send(calc.render());
});

app.get("/sum",function(req,res){
	res.send(calc.sum(req.query.n));
});

app.get("/fact",function(req,res){
	res.send(calc.factorial(req.query.n));
});

app.get("/weather",function(req,res){
	res.send(weather.render());
});

app.get("/hourly",function(req,res){
	weather.getWeather(req.query.zip,function(data){
		//console.log(data);
		res.send(data);
	});
});
