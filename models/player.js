module.exports = function() {
	var publ 		= this,
		priv 		= {},
		inventory	= {},
		items		= ['goat', 'shoe'];
		
	publ.index = function() {
		
	}
		
	publ.addItem = function(item) {
		items.push(item);
		console.log(items);
	}
	
	publ.getInventory = function() {
		return items;
	}
};