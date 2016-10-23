var _ = require('lodash');

var SearchFromData = function(data) {
	this.data = data;

	this.search = function(text ) {
		var preProcessed = this.preprocessText( text );
		if ( _.isEmpty(preProcessed) ) {
			return null;
		}

		var foundValue = null;
		_.forEach( this.data, (value) => {
			var index = _.indexOf(
				this.getCombinations(value), 
				preProcessed
			);
			if ( index > -1 )
			{
				foundValue = value;
				return false;
			}
		});
		return foundValue;
	}

	this.getCombinations = function(value) {
		return [
			value.kanjifamily + value.kanjigiven,
			value.kanjifamily + ' ' + value.kanjigiven,

			value.kanjigiven + value.kanjifamily,
			value.kanjigiven + ' ' + value.kanjifamily,

			value.kanjifamily,

			value.kanafamily + value.kanagiven,
			value.kanafamily + ' ' + value.kanagiven,

			value.kanagiven + value.kanafamily,
			value.kanagiven + ' ' + value.kanafamily,

			value.kanafamily,

			value.rofamily + ' ' + value.rogiven,
			value.rogiven + ' ' + value.rofamily
		];
	}

	this.preprocessText = function(text) {
		return text.trim().replace(/\s\s+/g, ' ');
	}
};

module.exports = SearchFromData;