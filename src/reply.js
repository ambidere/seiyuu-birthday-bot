var SearchFromData = require('./search');
var BirthdayStatus = require('./twitter/birthdaystatus');

var ReplyToTweet = function(tweet) {
	console.log('Tweet received from ' + tweet.user.screen_name);
	console.log('Tweet: ' + tweet.text);
	var text = tweet.text;
	var twit = this.twitter;

	var search = new SearchFromData(this.data);
	var birthdayData = search.search(text);
	if( birthdayData ) {
		console.log( birthdayData );
		var birthdayStatus = new BirthdayStatus(tweet, birthdayData, 'MMMM DD, YYYY');
		twit.doTweet( birthdayStatus.getTweet() );
	}
};

module.exports = ReplyToTweet;