module.exports = new function() {
	var publ			= this,
		priv			= {},
		thisLocation	= '',
		introText		= '',
		
		//modules
		location 	= new (require(process.cwd() + '/models/location')),
		
		db 			= require(process.cwd() + "/db"),
		promptly	= require("promptly"),
		
		interface 	= new (require(process.cwd() + "/view/interface")),
		player		= require(process.cwd() + "/models/staticplayer"),
		item		= new (require(process.cwd() + "/models/item"));
	
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
	
	//Returns current room object
	priv.getRoomFromDb = function(room, callback) {
		callback = callback || function () {};
		
		location.getLocation(room, function(locations) {
			callback(locations[0]);
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
	
	//Return current state of the room
	publ.getRoomState = function(room, callback) {
		callback = callback || function () {};
		
		publ.getAvalibleItem(room, function(roomHasItem, currentItem) {
			priv.getRoomFromDb(room, function(locations) {
				if(roomHasItem) {
					item.getItem(currentItem, function(itemObj) {
						callback(locations.intro + ' ' + itemObj[0].description);
					});
				} else {
					callback(locations.intro);
				}
			});			
		});
		
	}
	
	//Return item if not in player inventory
	publ.getAvalibleItem = function(room, callback) {
		callback = callback || function () {};
		
		var playerInventory = player.getInventory(),
			usedItems		= player.getUsedItems(),
			itemIsUsed		= false,
			itemInInventory = true;
		
		location.getItem(room, function(item) {
			for (var i in usedItems) {
				if(usedItems[i] === item) {
					itemIsUsed = true;
				}
			}
			
			if(itemIsUsed){
				itemInInventory = false;
			} else {
				for (var i in playerInventory) {
					if(playerInventory[i] === item) {
						itemInInventory = false;
					}
				}
			}
			callback(itemInInventory, item);
		});
	}
}