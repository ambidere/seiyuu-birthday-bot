var NameMatcher = require('./namechecker');

var SearchFromTweet = function(tweet, data) {
	this.tweet = tweet;
	this.data = data;
}

SearchFromTweet.prototype.onItemFound = function( onItemFound ) {
	this.onItemFound = onItemFound;
	if ( typeof onItemFound === 'undefined' ) {
		this.onItemFound = function(value) {
			console.log('Result from tweet: ' + value);
		}
	}
	return this;
}

SearchFromTweet.prototype.getData = function() {
	var sTweet = this.tweet;
	var preProcessedTexts = sTweet.text.trim().replace(/\s\s+/g, ' ').split(' ');
	var sData = this.data;
	var nameMatcher = new NameMatcher();

	sData.forEach(function(value) {
		var resultIndex = -1;
		for (var index = 0; index < preProcessedTexts.length; index++) {
			var tweetWord = preProcessedTexts[index].toLowerCase();
			if ( tweetWord.indexOf( '@' ) != 0) {
				resultIndex = nameMatcher.getMatchedIndex(preProcessedTexts, index, value);
				if ( resultIndex > -1 )
				{
					break;
				}
			}
		}

		if ( resultIndex > -1 ) {
			console.log("Item found.");
			this.onItemFound( value );
			return;
		}
	}.bind( this ));
};


module.exports = SearchFromTweet;