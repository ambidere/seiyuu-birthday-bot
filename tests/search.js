var _ = require('lodash');

var SearchFromData = function(data) {
	this.data = data;

	this.search = function(text) {
		var preProcessed = this.preprocessText( text );
		console.log(preProcessed);
		if ( _.isEmpty(preProcessed) ) {
			return null;
		}

		var foundValue = null;
		_.forEach( this.data, (dValue) => {
			// var index = _.indexOf(
			// 	this.getCombinations(value), 
			// 	preProcessed
			// );

			_.forEach( this.getCombinations(dValue), (cValue) => {
				
				console.log("index: " + preProcessed.indexOf(cValue) + " p: " + preProcessed + " c: " + cValue);
				if (preProcessed.indexOf(cValue) > -1)
				{
					foundValue = dValue;
				}

				if (foundValue) {
					return false;
				}
			});

			if(foundValue) {
				return false;
			}
			// if ( index > -1 )
			// {
			// 	foundValue = value;
			// 	return false;
			// }
		});
		return foundValue;
	}

	this.getCombinations = function(value) {
		return _.map([
			value.kanjifamily + value.kanjigiven,
			value.kanjigiven + value.kanjifamily,
			value.kanjifamily,
			value.kanafamily + value.kanagiven,
			value.kanagiven + value.kanafamily,
			value.kanafamily,
			value.rofamily + value.rogiven,
			value.rogiven + value.rofamily
		], function(value) {
			return _.toLower(value);
		});
	}

	this.preprocessText = function(text) {
		return _.lowerCase(text.trim()).replace(/\s+/g, '');
	}
};

module.exports = SearchFromData;