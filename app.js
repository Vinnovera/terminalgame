var express 	= require('express'),
	app 		= express(),
	room 	 	= require('./controllers/room'),
	db 			= require("./db"),
	promptly	= require("promptly");

room.init();
	
app.listen(8081);
//console.log("We are dating on port 8080");