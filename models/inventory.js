module.exports = function() {
	var publ 		= this,
		priv 		= {},
		isOpen		= false,
		
		db 			= require("../db");
		
		publ.getInventory = function(callback) {
			callback = callback || function () {};
			
			priv.getFromDb(callback);
		}
		
		priv.getFromDb = function(callback) {
			callback = callback || function () {};

			db.playerInventory.find(function(err, inventory) {
			  if( err || !inventory) console.log("Error in inventory");
			  
			  callback(inventory);
			});
		}
};