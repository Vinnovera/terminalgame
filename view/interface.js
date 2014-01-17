module.exports = function() {
	var publ 		= this,
		priv 		= {},
		currentView	= '',
		broken		= false,
		smashed		= 0,
		
		location 	= new (require(process.cwd() + '/models/location')),
		player		= require(process.cwd() + '/models/staticplayer');
		
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

		var room = require(process.cwd() + "/controllers/room");
		
		switch (response) {
			case 'i':
		   		callback('Inventory:');
		   		break;
	   		case 'o':
	   			callback(publ.displayOptions());
	   			break;
	   		case 'look':
	   			//console.log(room.getAvalibleItem());
	   			callback(room.getAvalibleItem(currentView));//get location description
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
	   		case 'quit':
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
	
	priv.movement = function(direction, currentView, callback) {
		callback = callback || function () {};
		
		var room = require(process.cwd() + "/controllers/room");
	
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
						smashed++;
						if(smashed >= 4) {
							console.log('You died, I told you to stop it stupid <.<');
							return 'quit';
						} else {
							return "You smashed your nose again. Stop it.";
						}
					}
				} else if (currentView == 'kitchen') {
					currentView = 'hallway';
					callback(room.init('hallway'));
				} else {
					return 'staying put';
				}
				break;
			case 'e':
				if(currentView == 'hallway') {
					currentView = 'kitchen';
					callback(room.init('kitchen'));
				} else if (currentView == 'basement'){
					return 'quit';
				} else {
					return 'staying put';
				}
				break;
		}
	}
};