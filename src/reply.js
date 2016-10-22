var SearchFromTweet = require('./search');
var BirthdayStatus = require('./twitter/birthdaystatus');

var ReplyToTweet = function(tweet) {
	console.log('Tweet received from ' + tweet.user.screen_name);
	var text = tweet.text;
	var twit = this.twitter;

	var search = new SearchFromTweet(tweet, this.data);
	search.onItemFound( function( birthdayData ) {
		var birthdayStatus = new BirthdayStatus(tweet, birthdayData, 'MMMM DD, YYYY');
		twit.doTweet( birthdayStatus.getTweet() );
	}).getData();
};

module.exports = ReplyToTweet;