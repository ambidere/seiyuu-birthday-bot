var fs = require('fs');

var JSONParser = function(jsonFile) {
	this.jsonFile = jsonFile;
}

JSONParser.prototype.onError = function(onError) {
	this.onError = onError;
	return this;
}

JSONParser.prototype.onSuccess = function(onSuccess) {
	this.onSuccess = onSuccess;
	return this;
}

JSONParser.prototype.parse = function() {
	fs.readFile(this.jsonFile, function(error, data){
		if ( error ) {
			this.onError(error);
		}
		else {
			parsedData = JSON.parse(data);
			console.log("File successfully read...");
			this.onSuccess(parsedData);
		}		
	}.bind(this));
	console.log("Reading file...");
};

module.exports = JSONParser;