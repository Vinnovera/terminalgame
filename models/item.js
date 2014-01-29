module.exports = function() {
	var publ 	= this,
		priv 	= {},
		db 		= require("../db"),
		player	= require(process.cwd() + '/models/staticplayer'),
		
		playerInventory = [],
		isInInventory	= false;
	
	publ.examine = function(response, callback) {
		callback = callback || function () {};
		
		var item = '';
		
		for (var i in response) {
			if(response[i] !== 'examine') {
				item = response[i];
			}
		}
		
		playerInventory = player.getInventory();
		for (var i in playerInventory) {
			if(playerInventory[i] == item) {
				publ.getItem(item, function(items) {
					callback(items[0].examine);
				});
			}
		}
	}
	
	publ.getItem = function(itemType, callback) {
		callback = callback || function () {};
		
		priv.getFromDb(itemType, callback);
	}
	
	priv.getFromDb = function(itemType, callback) {
		callback = callback || function () {};
		
		db.items.find({name: itemType}, function(err, items) {
		  if( err || !items) console.log("No item found");
		  
		  callback(items);
		});
	}
};