module.exports = new function() {
	var publ			= this,
		priv			= {},
		thisLocation	= 'hallway',
		
		//modules
		location 	= new (require(process.cwd() + '/models/location')),
		
		db 			= require(process.cwd() + "/db"),
		promptly	= require("promptly"),
		
		interface 	= new (require(process.cwd() + "/view/interface")),
		player		= require(process.cwd() + "/models/staticplayer");
	
	//Constructor
	publ.init = function() {
		console.log('running Intro');
		publ.start('startup');
	}
	
	//Print location name + intro text and promt
	publ.start = function(init) {
		var state = interface.getState(init);
		
		state.func(thisLocation, function(response){
			var introText 	= response[0].intro,
				name		= priv.capitaliseFirstLetter(response[0].name);
				
			console.log('\n' + name + '\n' + introText);
			priv.promt();
		});
	}
	
	//Promt and send input + active location
	//Log response
	priv.promt = function() {
		var state = interface.getState();
		
		promptly.prompt(state.str, function (err, value) {
   			state.func(value, 'intro', function(response){
		    	if(typeof response != 'undefined') {
			    	console.log(response);
			    	priv.promt();
		    	}
		    });		    
		});
	}
	
	//Capitalise
	priv.capitaliseFirstLetter = function(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
}