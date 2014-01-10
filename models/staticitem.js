module.exports = new function() {
	var Item = require(process.cwd() + '/models/item');
	
	return new Item;
};