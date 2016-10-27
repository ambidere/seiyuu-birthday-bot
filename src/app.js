//gets Twit package
var Twitter = require('./twitter');
var ReplyToTweet = require('./reply');
var JSONParser = require('./parser');
var TweetScheduler = require('./scheduler');

// //gets twitter app credentials
var secret = require(__dirname + "/config/credentials");
var T = new Twitter(secret, { track: '@seiyu_tanjoubi' });

var AppListener = function() {
	var initiateTwitterStream = function(data) {
		T.setData(data)
		 .onTweetReceived(ReplyToTweet)
		 .onErrorReceived( (error, code) => {
			console.log("Error " + code + ":");
			console.log(error);
		}).startStream();
	}

	var initiateTwitterScheduler = function(data) {
		var scheduler = new TweetScheduler(T, data);
		scheduler.start();
	}

	this.onSuccessfulParse = function(data) {
		initiateTwitterStream(data);
		initiateTwitterScheduler(data);
		console.log("Bot started...");
	}
}

appListener = new AppListener();
var parser = new JSONParser( __dirname + '/data/data.json');
parser.onError( error => {
		console.log(error);
	  })
	  .onSuccess(appListener.onSuccessfulParse)
      .parse();