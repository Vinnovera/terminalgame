module.exports = function() {
	var publ 	= this,
		priv 	= {},
		db 		= require("../db"),
		itemType= 'bottle';
	
	
	publ.getItem = function(callback) {
		callback = callback || function () {};
		
		priv.getFromDb(callback, itemType);
	}
	
	priv.getFromDb = function(callback, itemType) {
		callback = callback || function () {};
		
		db.items.find({name: itemType}, function(err, items) {
		  if( err || !items) console.log("No item found");
		  
		  callback(items);
		});
	}
};