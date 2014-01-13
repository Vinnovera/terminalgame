module.exports = new function() {
	var Player = require(process.cwd() + '/models/player');
	
	return new Player;
};