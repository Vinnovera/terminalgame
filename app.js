var express 	= require('express'),
	app 		= express(),
	intro 	 	= require('./controllers/intro'),
	db 			= require("./db"),
	promptly	= require("promptly");

//modules
/*var item = require('./models/staticitem'),
	player = new (require(process.cwd() + '/models/player')),
	location = new (require(process.cwd() + '/models/location'));
	
db.contacts.find({username: "testuser1"}, function(err, users) {
  if( err || !users) console.log("No user found");
  else users.forEach( function(test) {
  	//console.log(test.email);
  } );
});

promptly.prompt('Location: ', function (err, value) {
    // err is always null in this case, because no validators are set
    location.getLocation(value);
});
*/
//Controller
//var index = require('./controllers/index');
intro.init();
//console.log(player.index);
//player.index();
	
app.listen(8080);
//console.log("We are dating on port 8080");