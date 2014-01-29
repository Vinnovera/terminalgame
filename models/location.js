module.exports = function() {
	var publ 			= this,
		priv 			= {},
		db 				= require("../db");
		
		//Returns location object
		publ.getLocation = function(locationName, callback) {
			callback = callback || function () {};
			
			priv.getFromDb(locationName, callback);
		}
		
		//Returns location item
		publ.getItem = function(locationName, callback) {
			callback = callback || function () {};
			
			priv.getFromDb(locationName, function(locations) {
				item = locations[0].item;
				
				callback(item);
			});
		}
		
		//Returns locations from DB
		priv.getFromDb = function(locationName, callback) {
			callback = callback || function () {};
			
			db.locations.find({name: locationName}, function(err, locations) {
			  if( err || !locations)
			  	console.log("No location found");
			  
			  callback(locations);
			});
		}
};