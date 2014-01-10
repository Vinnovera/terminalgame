module.exports = function() {
	var publ 		= this,
		priv 		= {},
		inventory	= {},
		i = 0;
		//action		= ['walk', 'eat', 'examine'];
		
		publ.index = function() {
			var item 	= new require(process.cwd() + '/models/staticitem'),
				action 	= new require(process.cwd() + '/models/action');
				
				item.getItem(function(item) {
					//console.log(item);
				});
		}
};