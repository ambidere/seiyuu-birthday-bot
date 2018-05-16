var _ = require('lodash');
var emojiRegex = require('emoji-regex');
var TextSearchAlgorithm = require( __dirname + '/algorithm/textsearch');

var SearchFromData = function(data) {
	this.data = data;

	this.search = function(text) {
		var preProcessed = this.preprocessText( text );
		console.log('search.js: preprocessText -> ' + preProcessed)
		if ( _.isEmpty(preProcessed) ) {
			return null;
		}

		var matches = [];
		var algorithm = new TextSearchAlgorithm();

		_.forEach( this.data, (dValue, dIndex) => {
			englishNameSplit = dValue.englishNames.toLowerCase().split(',');
			japaneseNameSplit = dValue.japaneseNames.toLowerCase().split(',');

			if (_.includes(englishNameSplit[0], preProcessed) || _.includes(englishNameSplit[1], preProcessed)) {
				matches.push( dIndex );
			}
			else if (_.includes(japaneseNameSplit[0], preProcessed) || _.includes(japaneseNameSplit[1], preProcessed)) {
				matches.push( dIndex );
			}
			
		});

		if ( matches.length > 0 ) {
			return this.data[ Math.min.apply( null, matches ) ];
		}
        return null;
	}

	this.preprocessText = function(text) {
		removedMention = text.replace(/\B@[a-z0-9_-]+/gi, '');
		removedSpecial = removedMention.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
		removedEmoji = removedSpecial.replace(emojiRegex(), '');
		return removedEmoji.trim().replace(/\s\s+/g, ' ').toLowerCase();
	}
};

module.exports = SearchFromData;