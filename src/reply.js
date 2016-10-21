var Moment = require('moment');
var MomentTz = require('moment-timezone');

var ReplyToTweet = function(tweet) {
	var text = tweet.text;
	var terms = removeUserMention(text);
	var twit = this.twitter;
	this.data.forEach(function(value){
		for (var i = 0; i < terms.length; i++)
		{
			var term = terms[i];
			if ( value.kanjifamily + value.kanjigiven === term) {
				var nameID = tweet.id_str;
				var username = tweet.user.screen_name;
				var status = value.year + "/" + value.month + "/" + value.day;
				console.log(status);
				twit.post('statuses/update', { status: '@' + username + " " + status, in_reply_to_status_id: nameID }, function(error, data, response) {
					if (error) {
						console.log(error)
					}
				});
				break;
			}
		}
	});
};

removeUserMention = function(tweetText) {
	var split = tweetText.replace(/\s\s+/g, ' ').split(' ');
	var removedMention = "";
	var items = [];
	for (var i = 0; i < split.length; i++) {
		if (!split[i].startsWith('@'))
		{
			items.push( split[i] );
		}
	};
	return items;
}

module.exports = ReplyToTweet;