var fs = require('fs');

var DB = function(jsonFile) {
	this.jsonFile = jsonFile;
	this.data = null;
}

DB.prototype.read = function(callback) {
	fs.readFile(this.jsonFile, function(error, data){
		if ( error ) {
			console.log(error);
		}

		parsedData = JSON.parse(data);
		console.log("File successfully read...");
		callback(parsedData);
	});
	console.log("Reading file...");
};

module.exports = DB;