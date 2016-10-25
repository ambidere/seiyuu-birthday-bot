var _ = require('lodash');

var SearchFromData = function(data) {
	this.data = data;

	this.search = function(text) {
		var preProcessed = this.preprocessText( text );
		if ( _.isEmpty(preProcessed) ) {
			return null;
		}

		var foundValue = null;
		var matches = [];
		_.forEach( this.data, (dValue, dIndex) => {
			_.forEach( this.getCombinations(dValue), (combination) => {

				var rightMostIndexes = this.preProcessForBadCharacterShift(combination);
				var patternLength = combination.length;
				var textLength = preProcessed.length;
				var alignedAt = 0;

				for ( var indexInPattern = 0; indexInPattern <= patternLength - textLength; indexInPattern += alignedAt ) {
		            alignedAt = 0;
		            for ( var indexInText = textLength - 1; indexInText >= 0; indexInText-- ) {
		                var preProcessedChar = preProcessed.charAt( indexInPattern + indexInText );
		                if ( combination.charAt(indexInText) != preProcessedChar ) {
		                    alignedAt = Math.max(1, indexInText - rightMostIndexes.get( preProcessedChar ) );
		                    break;
		                }
		            }

		            if (alignedAt == 0) {
		            	foundValue = dValue;
		            	matches.push( dIndex );
		            	return false;
		            }
		        }
			});

		});
		
		if ( matches.length > 0 )
        {
        	console.log(matches);
        	foundValue = this.data[matches[0]]
        }
        return foundValue;
	}

	this.preProcessForBadCharacterShift = function(pattern) {
		var radix = 256;
		var map = new Map();

		for (var indexInPattern = 0; indexInPattern < pattern.length; indexInPattern++) {
			map.set(pattern.charAt(indexInPattern), indexInPattern);
		}
		// for (var i = pattern.length - 1; i >= 0 ; i--) {
		// 	var c = pattern.charAt(i);
		// 	if (!map.has(c)) {
		// 		map.set(c, i);
		// 	}
		// }
		return map;
	}

	this.getCombinations = function(value) {
		toLower = function(value) {
			return _.toLower(value);
		}
		combinations = [];
		if (value.kanjigiven === 'undefined' || 
			value.kanagiven === 'undefined' || 
			value.rogiven === 'undefined' ) {
			return _.map([
				value.kanjifamily,
				value.kanafamily,
				value.rofamily
			], toLower);
		}

		return _.map([
			value.kanjifamily + value.kanjigiven,
			value.kanjigiven + value.kanjifamily,
			value.kanjifamily + ' ' + value.kanjigiven,
			value.kanjigiven + value.kanjifamily,
			value.kanjifamily,
			value.kanafamily + value.kanagiven,
			value.kanagiven + value.kanafamily,
			value.kanafamily + ' ' + value.kanagiven,
			value.kanagiven + ' ' + value.kanafamily,
			value.kanafamily,
			value.rofamily +　' ' + value.rogiven,
			value.rogiven + ' ' + value.rofamily
		], toLower);
	}

	this.preprocessText = function(text) {
		return _.lowerCase(text.trim().replace(/\s\s+/g, ' '));
	}
};

module.exports = SearchFromData;