var MentionProcessor = function(tweet) {
	removeUserMention = function(tweetText) {
		tweetText = tweetText.replace(/\s\s+/g, ' ');
		var split = tweetText.split(' ');
		console.log(split);
		var removedMention = "";
		for (var i = 0; i < split.length; i++) {
			if (!split[i].startsWith('@'))
			{
				removedMention += split[i] + " ";
			}
		};
		return removedMention;
	};

	var text = tweet.text;
	removeUserMention(text);

	var username = tweet.user.screen_name;
	this.twitter.post('statuses/update', { status: '@' + username + " 声優の誕生日bot is still under construction." }, function(error, data, response) {
		if (error) {
			console.log(error)
		}
	})
};

module.exports = MentionProcessor;