module.exports = function() {
	var publ 		= this,
		priv 		= {},
		inventory	= {},
		items		= ['flashlight'],
		room		= require(process.cwd() + "/controllers/room");
		
	//check if room has item and add it to player items
	//Add later: check if item is in response
	publ.addItem = function(room, currentView, response, callback) {
		callback = callback || function () {};
		//items.push(item);
		//var splitResponse = response.split(" "),
		//response = splitResponse[0];
		
		room.getAvalibleItem(currentView, function(roomHasItem, item) {
			items.push(item);
			callback(item + ' added to inventroy');
		});
	}
	
	publ.getInventory = function() {
		return items;
	}
};