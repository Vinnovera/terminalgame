/*var databaseUrl = "nodetest1",
	collections = ["contacts", "items", "locations", "playerInventory"],
	db 			= require("mongojs").connect(databaseUrl, collections),*/
	
var mongoose = require('mongoose'),
	db		 = mongoose.connection;
	mongoose.connect('mongodb://localhost/nodetest1');

module.exports = mongoose;
//mongoimport --db nodetest1 --collection items --file items.json
//mongoexport --db nodetest1 --collection contacts --out contacts.json --journal