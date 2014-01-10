module.exports = new function() {
	var publ		= this,
		priv		= {},
		
		//modules
		location 	= new (require(process.cwd() + '/models/location')),
		
		db 			= require(process.cwd() + "/db"),
		promptly	= require("promptly");
	
	//Constructor
	publ.init = function() {
		console.log('running Intro');
		priv.promt('Location');
	}

	priv.promt = function(str) {
		if(str !== '') {
		smth = str.getState;
			promptly.prompt(smth.str, { validator: priv.validator, retry: false }, function (err, value) {
			    if (err) {
		            console.error('Invalid name:', err.message);
		            // Manually call retry
		            // The passed error has a retry method to easily prompt again.
		            return err.retry();
		        } else {
		   
		   			smth.func(value, function(response){
				    	console.log(response);
				    	priv.promt(smth);
				    });
				    
			    }
			    
			});
		}
	}
	
	
	priv.validator = function (value) {
	    if (value.length < 2) {
	        throw new Error('Min length of 2');
	    }
	
	    return value;
	};
}