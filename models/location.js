module.exports = function() {
	var publ 	= this,
		priv 	= {},
		items	= '',
		db 		= require("../db");
		
		publ.getLocationItem = function(locationName, callback) {
			callback = callback || function () {};
			
			priv.getFromDb(locationName, callback);
		}
		
		priv.getFromDb = function(locationName, callback) {
			callback = callback || function () {};
			
			db.locations.find({name: locationName}, function(err, locations) {
			  if( err || !locations) console.log("No location found");
			  
			  //console.dir(locations);
			  for (var i in locations) {
			  	if(locations[i].name != "" && locations[i].name == locationName) {
			  		//console.log('Item avalible: ' + locations[i].item);
			  		items = locations[i].item;
			  		
			  	}
			  }
			  callback('Avalible item: ' + items);
			});
		}
};