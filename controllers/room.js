module.exports = new function() {
	var publ			= this,
		priv			= {},
		thisLocation	= '',
		
		//modules
		location 	= new (require(process.cwd() + '/models/location')),
		
		db 			= require(process.cwd() + "/db"),
		promptly	= require("promptly"),
		
		interface 	= new (require(process.cwd() + "/view/interface")),
		player		= require(process.cwd() + "/models/staticplayer");
	
	//Constructor
	publ.init = function(room) {
		//First time running: default room Hallway
		if(typeof room == 'undefined')
			room = 'hallway';
			
		console.log('running ' + room);
		
		thisLocation = room;
		
		publ.start('initRoom');
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
   			state.func(value, thisLocation, function(response){
		    	if(typeof response != 'undefined') {
			    	if(response === 'quit') {
			    		process.exit(0);
			    	} else {
				    	console.log(response);
				    	priv.promt();
			    	}
		    	}
		    });		    
		});
	}
	
	//Capitalise
	priv.capitaliseFirstLetter = function(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	publ.getRoomState = function(room, callback) {
		callback = callback || function () {};
		
		priv.getAvalibleItem(room, function(roomHasItem) {
			console.log(roomHasItem);
			priv.promt();
		});
		
	}
	
	//Return item
	priv.getAvalibleItem = function(room, callback) {
		callback = callback || function () {};
		
		var playerInventory = player.getInventory(),
			locationItem	= '',
			itemInInventory = false;
		
		location.getItem(room, function(item) {
			locationItem = item;
			
			for (var i in playerInventory) {
				if(playerInventory[i] === locationItem) {
					itemInInventory = true;
				}
			}
			callback(itemInInventory);
		});
	}
}