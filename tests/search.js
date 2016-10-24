var _ = require('lodash');

var SearchFromData = function(data) {
	this.data = data;

	this.search = function(text) {
		var preProcessed = this.preprocessText( text );
		if ( _.isEmpty(preProcessed) ) {
			return null;
		}

		console.log(preProcessed)

		var foundValue = null;
		var matches = [];
		_.forEach( this.data, (dValue, dIndex) => {
			_.forEach( this.getCombinations(dValue), (combination) => {

				var rightMostIndexes = this.preProcessForBadCharacterShift(combination);
				var textLength = preProcessed.length;
				var patternLength = combination.length;
				var alignedAt = 0;

				while (alignedAt + (patternLength - 1) < textLength) {  
		            for (var indexInPattern = patternLength - 1; indexInPattern >= 0; indexInPattern--) {  
			            var indexInText = alignedAt + indexInPattern;  
			            var x = preProcessed.charAt(indexInText);  
			            var y = combination.charAt(indexInPattern);  
		                if (indexInText >= textLength) {
		                	break;
		                }
		                if (x != y) {  
		                    var r = rightMostIndexes.get(x);  
		                    if (r == null) {  
		                        alignedAt = indexInText + 1;  
		                    }  
		                    else {  
		                        var shift = indexInText - (alignedAt + r);  
		                        alignedAt += shift > 0 ? shift : 1;  
		                    }  
		                    break;  
		                }  
		                else if (indexInPattern == 0) {  
		                    matches.push(dIndex);
		                    alignedAt++;  
		                }
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
		var map = new Map();
		for (var i = pattern.length - 1; i >= 0 ; i--) {
			var c = pattern.charAt(i);
			if (!map.has(c)) {
				map.set(c, i);
			}
		}
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