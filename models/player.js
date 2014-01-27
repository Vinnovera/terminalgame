module.exports = function() {
	var publ 		= this,
		priv 		= {},
		inventory	= {},
		items		= [],
		room		= require(process.cwd() + "/controllers/room");
		
	publ.index = function() {
		
	}
	
	//check if room has item and add it to player items
	publ.addItem = function(room, currentView, callback) {
		callback = callback || function () {};
		//items.push(item);
		room.getAvalibleItem(currentView, function(roomHasItem, item) {
			items.push(item);
			console.log(item + ' added to inventroy');
			room.promt();
			callback();
		});
	}
	
	publ.getInventory = function() {
		return items;
	}
};