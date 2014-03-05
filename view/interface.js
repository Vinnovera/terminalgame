module.exports = function() {
	var publ 			= this,
		priv 			= {},
		currentView		= '',
		broken			= false,
		smashed			= 0,
		splitResponse	= '',
		
		location 		= new (require(process.cwd() + '/models/location')),
		player			= require(process.cwd() + '/models/staticplayer'),
		item			= new (require(process.cwd() + "/models/item"));
	
	//First time send location {}
	//Otherwise send getResponse
	publ.getState = function(value) {
		if(value == 'initRoom') {
			return {'str': 'Location', 'func': location.getLocation};
		} else {
			return {'str' : '>', 'func' : publ.getResponse}
		}
	}
	
	publ.getResponse = function(response, currentView, callback) {
		callback = callback || function () {};
		
		if (response.indexOf("take") != -1 || response.indexOf("examine") != -1 || response.indexOf("use") != -1) {
			splitResponse = response.split(" ");
			response = splitResponse[0];
		}
		var room = require(process.cwd() + "/controllers/room");
		
		switch (response) {
			case 'i'://list player inventory items
		   		player.getInventory(function(inventory) {
		   			callback('Inventory: ' + inventory);
		   		});
		   		break;
	   		case 'o'://list user options
	   			callback(publ.displayOptions());
	   			break;
	   		case 'look'://get avalible item + location description
	   			room.getRoomState(currentView, function(desc) {
	   				callback(desc);
	   			});
	   			break;
	   		case 'examine': //call item.examine return examine text
	   			item.examine(splitResponse, function(item) {
	   				callback(item);
	   			});
	   			break;
	   		case 'use'://get item use
	   			item.use(splitResponse, function(using) {
	   				callback(using); 
	   			});
	   			break;
	   		case 'take'://add item to player inventory
	   			player.addItem(room, currentView, splitResponse, function(itemAdded) {
	   				callback(itemAdded);
	   			});
	   			break;
	   		case 'n':
	   		case 's':
	   		case 'w':
	   		case 'e'://move around
	   			priv.movement(room, response, currentView, function(roomDesc) {
	   				callback(roomDesc);
	   			});
	   			break;
	   		case 'quit'://terminate game
	   			callback(response);
			default:
				callback("You're doing it wrong");
				break;
		}
	}
	
	publ.displayOptions = function() {
		var arr = 'Options: look, examine, use, take';
		return arr;
	}
	
	priv.movement = function(room, direction, currentView, callback) {
		callback = callback || function () {};
		
		switch(direction) {
			case 'n':
				if(currentView == 'hallway') {
					currentView = 'basement';
					callback(room.init('basement'));
					break;
				} else {
					callback('staying put');
				}
				break;
			case 's':
				if(currentView == 'hallway') {
					callback("The door is locked, you can't go that way.");
				} else if (currentView == 'basement') {
					currentView = 'hallway';
					callback(room.init('hallway'));
				} else {
					callback('staying put');
				}
				break;
			case 'w':
				if(currentView == 'hallway') {
					if(!broken) {
						broken = true;
						callback("You walked into a wall and broke your nose.");
					} else {
						smashed++;
						if(smashed >= 4) {
							console.log('You died, I told you to stop it stupid <.<');
							callback('quit');
						} else {
							callback("You smashed your nose again. Stop it.");
						}
					}
				} else if (currentView == 'kitchen') {
					currentView = 'hallway';
					callback(room.init('hallway'));
				} else {
					callback('staying put');
				}
				break;
			case 'e':
				if(currentView == 'hallway') {
					currentView = 'kitchen';
					callback(room.init('kitchen'));
				} else if (currentView == 'basement'){
					callback('quit');
				} else {
					callback('staying put');
				}
				break;
		}
	}
};