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
		   	case 'h':
	   			callback('display help');
	   			break;
	   		case 'o':
	   			var test = publ.displayOptions();
	   			callback(test);
	   			break;
			default:
				callback(response);
				break;
		}
	}
	
	publ.displayOptions = function() {
		var arr = 'Options: look, examine, use, take';
		return arr;
	}
};