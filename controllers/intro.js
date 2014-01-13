module.exports = new function() {
	var publ			= this,
		priv			= {},
		firstLocation	= 'hallway',
		
		//modules
		location 	= new (require(process.cwd() + '/models/location')),
		
		db 			= require(process.cwd() + "/db"),
		promptly	= require("promptly"),
		
		interface 	= new (require(process.cwd() + "/view/interface")),
		player		= require(process.cwd() + "/models/staticplayer");
	
	//Constructor
	publ.init = function() {
		console.log('running Intro');
		priv.start();
		//priv.promt();
	}
	
	priv.start = function() {
		var state = interface.getState();
		state.func(firstLocation, function(response){
			var introText 	= response[0].intro,
				name		= priv.capitaliseFirstLetter(response[0].name);
				
			console.log('\n' + name + '\n' + introText);
			priv.promt();
		});
	}

	priv.promt = function() {
		var state = interface.getState();
		
		promptly.prompt(state.str, function (err, value) {
   			state.func(value, function(response){
		    	console.log(response);
		    	priv.promt();
		    });		    
		});
	}
	
	priv.capitaliseFirstLetter = function(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	/*priv.validator = function (value) {
	    if (value.length < 2) {
	        throw new Error('Min length of 2');
	    }
	
	    return value;
	};*/
}