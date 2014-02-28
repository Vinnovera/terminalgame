module.exports = function() {
	var publ 	= this,
		priv 	= {},
		db 		= require("../db"),
		player	= require(process.cwd() + '/models/staticplayer'),
		
		playerInventory = [],
		isInInventory	= false;
	
	publ.examine = function(response, callback) {
		callback = callback || function () {};
		
		var item  = '',
			found = false;
		
		for (var i in response) {
			if(response[i] !== 'examine') {
				item = response[i];
			}
		}
		
		playerInventory = player.getInventory();
		for (var i in playerInventory) {
			if(playerInventory[i] == item) {
				found = true;
				publ.getItem(item, function(items) {
					if(typeof items[0].examine !== 'undefined')
						callback(items[0].examine);
					else 
						callback("Can't examine that item");
				});
			}
		}
		if (!found) {
			callback(item + ' is not in your inventory');
		}
	}
	
	publ.use = function(response, callback) {
		callback = callback || function () {};
		
		var item  = '',
			found = false;
		
		for (var i in response) {
			if(response[i] !== 'use') {
				item = response[i];
			}
		}
		
		playerInventory = player.getInventory();
		for (var i in playerInventory) {
			if(playerInventory[i] == item) {
				found = true;
			}
		}
		if(found) {
			if(item == "battery") {
				for (var i in playerInventory) {
					if(playerInventory[i] == 'flashlight') {
						player.removeItem(item);
						callback('The battery is now placed in the flashlight.');
					}
				}
			}
		} else {
			callback(item + ' is not in your inventory');
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