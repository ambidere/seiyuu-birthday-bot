var _ = require('lodash');
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
		//checks match in combinations
		_.forEach( this.data, (dValue, dIndex) => {
			_.forEach( this.getCombinations(dValue), (combination) => {
				if ( algorithm.checkIfCombinationsMatchesWithText(preProcessed, combination) ) {
					matches.push( dIndex );
					return false;
				}
			});
		});

		if ( matches.length == 0 ) {
			_.forEach( this.data, (dValue, dIndex) => {
				_.forEach( this.getCombinations(dValue), (combination) => {
					var splitPreprocessed = preProcessed.split(" ");
					for (var i = 0; i < splitPreprocessed.length; i++) {
						if ( algorithm.checkIfCombinationsMatchesWithText(combination, splitPreprocessed[i]) ) {
							matches.push( dIndex );
						}
					};
				});
			});
		}

		if ( matches.length > 0 ) {
			return this.data[ Math.min.apply( null, matches ) ];
		}
        return null;
	}

	this.getCombinations = function(value) {
		toLower = function(value) {
			return _.toLower(value);
		}
		combinations = [];
		if (value.kanjigiven === undefined && 
			value.kanagiven === undefined && 
			value.rogiven === undefined ) {
			combinations = [
				value.kanjifamily,
				value.kanafamily,
				value.rofamily
			];
		}
		else {
			combinations = [
				value.kanjifamily + value.kanjigiven,
				value.kanjigiven + value.kanjifamily,
				value.kanjifamily + ' ' + value.kanjigiven,
				value.kanjigiven + ' ' + value.kanjifamily,
				value.kanafamily + value.kanagiven,
				value.kanagiven + value.kanafamily,
				value.kanafamily + ' ' + value.kanagiven,
				value.kanagiven + ' ' + value.kanafamily,
				value.rofamily +　' ' + value.rogiven,
				value.rogiven + ' ' + value.rofamily
			];
		}
		return _.map( combinations, toLower );
	}

	this.preprocessText = function(text) {
		removedMention = text.replace(/\B@[a-z0-9_-]+/gi, '');
		removedSpecial = removedMention.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
		return removedSpecial.trim().replace(/\s\s+/g, ' ').toLowerCase();
	}
};

module.exports = SearchFromData;