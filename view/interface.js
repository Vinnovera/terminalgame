module.exports = function() {
	var publ 		= this,
		priv 		= {},
		currentView	= '',
		broken		= false,
		
		location 	= new (require(process.cwd() + '/models/location'));
		
		//room		= require(process.cwd() + "/controllers/intro");
	
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

		switch (response) {
			case 'i':
		   		callback('Inventory:');
		   		break;
	   		case 'o':
	   			callback(publ.displayOptions());
	   			break;
	   		case 'look':
	   			callback('looking');//get location description
	   			break;
	   		case 'examine':
	   			callback('examining'); //get item examine
	   			break;
	   		case 'use':
	   			callback('using'); //get item use
	   			break;
	   		case 'take':
	   			callback('taking'); //player save item
	   			break;
	   		case 'n':
	   		case 's':
	   		case 'w':
	   		case 'e':
	   			callback(priv.movement(response, currentView));
	   			break;
			default:
				callback("You're doing it wrong");
				break;
		}
	}
	
	publ.displayOptions = function() {
		var arr = 'Options: look, examine, use, take';
		return arr;
	}
	
	priv.movement = function(direction, currentView, callback) {
		callback = callback || function () {};
		
		var room = require(process.cwd() + "/controllers/room");
		//console.log(currentView);
		switch(direction) {
			case 'n':
				if(currentView == 'hallway') {
					currentView = 'basement';
					callback(room.init('basement'));
					break;
				} else {
					return 'staying put';
				}
				break;
			case 's':
				if(currentView == 'hallway') {
					return "The door is locked, you can't go that way.";
				} else if (currentView == 'basement') {
					currentView = 'hallway';
					callback(room.init('hallway'));
				} else {
					return 'staying put';
				}
				break;
			case 'w':
				if(currentView == 'hallway') {
					if(!broken) {
						broken = true;
						return "You walked into a wall and broke your nose.";
					} else {
						return "You smashed your nose again. Stop it.";
					}
				} else {
					return 'staying put';
				}
				break;
			case 'e':
				if(currentView == 'hallway') {
					return "Going to the kitchen"; //load kitchen
				} else {
					return 'staying put';
				}
				break;
		}
	}
};