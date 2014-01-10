var databaseUrl = "nodetest1";
var collections = ["contacts", "items", "locations"]
var db = require("mongojs").connect(databaseUrl, collections);

module.exports = db;
//mongoimport --db nodetest1 --collection contacts --file contacts.json
//mongoexport --db nodetest1 --collection contacts --out contacts.json --journal