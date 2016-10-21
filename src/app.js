//gets Twit package
var Twitter = require('./twitter');
var Reply = require('./reply');
var PrintErrorCode = require('./error/errorcode');
var DB = require('./db');

//gets twitter app credentials
var secret = require("../config/credentials");
var database = new DB( __dirname + '/data/data.json');
database.read(function(data){
	var T = new Twitter(secret, { track: '@seiyuu_tanjoubi' }, data);
	T.onTweet(Reply)
	 	.onError(PrintErrorCode)
	 	.startStream();
	console.log("Bot started...")
});

