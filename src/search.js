var _ = require('lodash');

var SearchFromData = function(data) {
	this.data = data;

	this.search = function(text) {
		var preProcessed = this.preprocessText( text );
		if ( _.isEmpty(preProcessed) ) {
			return null;
		}

		var foundValue = null;
		_.forEach( this.data, (dValue, dIndex) => {
			_.forEach( this.getCombinations(dValue), (combination) => {
				if ( this.checkIfCombinationsMatchesWithText(combination, preProcessed) ) {
					foundValue = dValue;
					return false;
				}
			});
			if ( foundValue !== null ) {
				return false;
			}
		});
        return foundValue;
	}

	this.checkIfCombinationsMatchesWithText = function(pattern, text) {
		var rightMostIndexes = this.preProcessForBadCharacterShift(pattern);
		var patternLength = pattern.length;
		var textLength = text.length;
		var alignedAt = 0;

		for ( var indexInPattern = 0; indexInPattern <= textLength - patternLength; indexInPattern += alignedAt ) {
            alignedAt = 0;
            for ( var indexInText = patternLength - 1; indexInText >= 0; indexInText-- ) {
                var textChar = text.charAt( indexInPattern + indexInText );
                if ( pattern.charAt(indexInText) != textChar ) {
                    alignedAt = Math.max(1, indexInText - rightMostIndexes.get( textChar ) );
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
			map.set(pattern.charAt(indexInPattern), indexInPattern);
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
		// var newText = text.replace(/\b@\w+/, '');
		// console.log(newText)
		var newText = '';
		//THIS IS A WORKAROUND FIND SOLUTION WHEN THERE IS TIME
		var split = text.trim().replace(/\s\s+/g, ' ').toLowerCase().split(' ');
		console.log(split)
		for (var i = 0; i < split.length; i++) {
			if (split[i].indexOf('@') === -1) {
				newText += split[i] + ' ';
			}
		};
		return newText;
		// return _.lowerCase(newText.trim().replace(/\s\s+/g, ' '));
	}
};

module.exports = SearchFromData;