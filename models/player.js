module.exports = function() {
	var publ 		= this,
		priv 		= {},
		items		= ['flashlight'],
		itemsUsed	= [],
		
		inventory	= require(process.cwd() + "/models/staticInventory"),
		room		= require(process.cwd() + "/controllers/room"),
		db 			= require("../db");
		
	//check if room has item and add it to player items
	//Add later: check if item is in response
	publ.addItem = function(room, currentView, response, callback) {
		callback = callback || function () {};
		//var splitResponse = response.split(" "),
		//response = splitResponse[0];
		
		var found = false;		
		
		room.getAvalibleItem(currentView, function(roomHasItem, item) {
			inventory.getInventory(function(playerInventory) {
				
				for(var y in playerInventory) {
					if(playerInventory.hasOwnProperty(y)) {
						for(var u in playerInventory[y]) {
							if(playerInventory[y].hasOwnProperty(u)) {
								if(playerInventory[y][u] == item){
									found = true;
								}
							}
						}
					}
				}
				
				if(!found) {
					/*db.playerInventory.insert( { item: item}, function() {
						callback(item + ' added to inventroy');
					});*/
				} else {
					callback("There's nothing for you to take");
				}
			});
		});
	}
	
	publ.removeItem = function(item) {
		// Find and remove item from an array
		var i = items.indexOf(item);
		if(i != -1) {
			items.splice(i, 1);
			itemsUsed.push(item);
		}
	}
	
	publ.getUsedItems = function() {
		return itemsUsed;
	}
	
	publ.getInventory = function(callback) {
		callback = callback || function () {};
		
		inventory.getInventory(function(playerInventory) {
			for(var y in playerInventory) {
				if(playerInventory.hasOwnProperty(y)) {
					for(var u in playerInventory[y]) {
						if(playerInventory[y].hasOwnProperty(u)) {
							if(u == 'item')
								items.push(playerInventory[y].item);
						}
					}
				}
			}
			callback(items);
		});
	}
};