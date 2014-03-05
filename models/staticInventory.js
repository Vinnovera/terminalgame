module.exports = new function() {
	var Inventory = require(process.cwd() + '/models/inventory');
	
	return new Inventory;
};