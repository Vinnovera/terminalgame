module.exports = function() {
	var publ 		= this,
		priv 		= {},
		inventory	= {},
		items		= ['flashlight'],
		itemsUsed	= [],
		
		room		= require(process.cwd() + "/controllers/room");
		
	//check if room has item and add it to player items
	//Add later: check if item is in response
	publ.addItem = function(room, currentView, response, callback) {
		callback = callback || function () {};
		//var splitResponse = response.split(" "),
		//response = splitResponse[0];
		for(var i in itemsUsed) {
			
		}		
		
		room.getAvalibleItem(currentView, function(roomHasItem, item) {
			var i = items.indexOf(item);
			
			if(i == -1) {
				items.push(item);
				callback(item + ' added to inventroy');
			} else {
				callback("There's nothing for you to take");
			}
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
	
	publ.getInventory = function() {
		return items;
	}
};