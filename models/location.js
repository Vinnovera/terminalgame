module.exports = function() {
	var publ 			= this,
		priv 			= {},
		db 				= require("../db");
		
		publ.getLocation = function(locationName, callback) {
			callback = callback || function () {};
			
			priv.getFromDb(locationName, callback);
		}
		
		publ.getItem = function(locationName, callback) {
			callback = callback || function () {};
			
			priv.getFromDb(locationName, function(locations) {
				item = locations[0].item;
				
				callback(item);
			});
		}
		
		priv.getFromDb = function(locationName, callback) {
			callback = callback || function () {};
			
			db.locations.find({name: locationName}, function(err, locations) {
			  if( err || !locations)
			  	console.log("No location found");
			  
			  callback(locations);
			});
		}
};