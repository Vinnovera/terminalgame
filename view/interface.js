module.exports = function() {
	var publ 		= this,
		priv 		= {},
		value 		= '',
		currentView	= '',
		broken		= false,
		
		location 	= new (require(process.cwd() + '/models/location')),
		
		basement	= require(process.cwd() + "/controllers/basement");
	
	publ.getState = function() {
		if(value == 'anything') {
			return {'str' : '>', 'func' : publ.getResponse}
		} else {
			value = 'anything';
			return {'str': 'Location', 'func': location.getLocation};
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
		
		switch(direction) {
			case 'n':
				if(currentView == 'intro') {
					callback(basement.init()); //load basement
				} else {
					return 'staying put';
				}
				break;
			case 's':
				if(currentView == 'intro') {
					return "The door is locked, you can't go that way.";
				} else {
					return 'staying put';
				}
				break;
			case 'w':
				if(currentView == 'intro') {
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
				if(currentView == 'intro') {
					return "Going to the kitchen"; //load kitchen
				} else {
					return 'staying put';
				}
				break;
		}
	}
};