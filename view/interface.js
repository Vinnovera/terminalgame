module.exports = function() {
	var publ 	= this,
		priv 	= {},
		value 	= '',
		
		location 	= new (require(process.cwd() + '/models/location'));
	
	publ.getState = function() {
		if(value == 'anything') {
			return {'str' : '>', 'func' : publ.getResponse}
		} else {
			value = 'anything';
			return {'str': 'Location', 'func': location.getLocation};
		}
	}
	
	publ.getResponse = function(response, callback) {
		callback = callback || function () {};
		
		switch (response) {
			case 'i':
		   		callback('Inventory:');
		   		break;
	   		case 'o':
	   			var test = publ.displayOptions();
	   			callback(test);
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
			default:
				callback("You're doing it wrong");
				break;
		}
	}
	
	publ.displayOptions = function() {
		var arr = 'Options: look, examine, use, take';
		return arr;
	}
};