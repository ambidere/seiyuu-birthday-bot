var _ = require('lodash');

var SearchFromData = function(data) {
	this.data = data;

	this.search = function(text) {
		var preProcessed = this.preprocessText( text );
		if ( _.isEmpty(preProcessed) ) {
			return null;
		}

		var matches = [];
		_.forEach( this.data, (dValue, dIndex) => {
			_.forEach( this.getCombinations(dValue), (combination) => {
				if ( this.checkIfCombinationsMatchesWithText(combination, preProcessed) ) {
					matches.push( dIndex );
				}
			});
		});
		if ( matches.length > 0 ) {
			return this.data[ Math.min.apply( null, matches ) ];
		}
        return null;
	}

	this.checkIfCombinationsMatchesWithText = function(pattern, text) {
		var rightMostIndexes = this.preProcessForBadCharacterShift(pattern);
		var patternLength = pattern.length;
		var textLength = text.length;
		var alignedAt = 0;
		var matches = [];

		for ( var indexInPattern = 0; indexInPattern <= textLength - patternLength; indexInPattern += alignedAt ) {
            alignedAt = 0;
            for ( var indexInText = patternLength - 1; indexInText >= 0; indexInText-- ) {
                var textChar = text.charCodeAt( indexInPattern + indexInText );
                var possibleShift = rightMostIndexes.get( textChar );
                if ( isNaN( possibleShift ) ) {
                	possibleShift = -1;
                }

                if ( pattern.charCodeAt(indexInText) != textChar ) {
                    alignedAt = Math.max(1, indexInText -  possibleShift);
                    break;
                }
            }

            if (alignedAt == 0) {
            	return true;
            }
        }
        return false;
	}

	this.preProcessForBadCharacterShift = function(pattern) {
		var map = new Map();
		for (var indexInPattern = 0; indexInPattern < pattern.length; indexInPattern++) {
			map.set(pattern.charCodeAt(indexInPattern), indexInPattern);
		}
		return map;
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
		return text.trim().replace(/\s\s+/g, ' ').toLowerCase();
	}
};

module.exports = SearchFromData;