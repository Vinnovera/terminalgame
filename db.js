var databaseUrl = "nodetest1";
var collections = ["contacts", "items", "locations"]
var db = require("mongojs").connect(databaseUrl, collections);

module.exports = db;
//mongoimport --db nodetest1 --collection items --file items.json
//mongoexport --db nodetest1 --collection contacts --out contacts.json --journal