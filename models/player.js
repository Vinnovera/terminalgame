module.exports = function() {
	var publ 		= this,
		priv 		= {},
		inventory	= {};
		//action		= ['walk', 'eat', 'examine'];
		
		publ.index = function() {
			var item 	= new require(process.cwd() + '/models/staticitem'),
				action 	= new require(process.cwd() + '/models/action');
		}
};