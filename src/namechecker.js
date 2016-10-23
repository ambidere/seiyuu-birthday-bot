var NameMatcher = function() {
	this.kanjiNameFamilyOnly = function(tweetWords, currentIndex, value) {
		if ( value.kanjifamily != undefined && value.kanjigiven === undefined ){
			var family = tweetWords[currentIndex];
			if ( family === value.kanjifamily )
			{
				return true;
			}
		}
		return false;
	};

	this.kanjiNameNoSpaces = function(tweetWords, currentIndex, value) {
		if ( value.kanjifamily === undefined && value.kanjigiven === undefined ) {
			return false;
		}
		
		var word = tweetWords[currentIndex];
		if ( word.indexOf( value.kanjifamily ) == 0 ) {
			if ( value.kanjifamily + value.kanjigiven === word ) {
				return true;
			}
			else {
				if ( value.kanjigiven === undefined ) {
					return true;
				}
			}
		}
		return false;
	};

	this.kanjiNameWithSpaces = function(tweetWords, currentIndex, value) {
		if ( value.kanjifamily === undefined && value.kanjigiven === undefined ) {
			return false;
		}

		var word = tweetWords[currentIndex]
		if ( word === value.kanjifamily ) {
			var nextIndex = currentIndex + 1;
			if ( nextIndex < tweetWords.length ) {
				var nextWord = tweetWords[nextIndex];
				var kanjigiven = value.kanjigiven;
				if ( nextWord === kanjigiven ) {
					return true;
				}
				else {
					if ( typeof kanjigiven === undefined ) {
						return true;
					}
				}
			}
		}
		return false;
	};

	this.kanaNameFamilyOnly = function(tweetWords, currentIndex, value) {
		if ( value.kanafamily != undefined && value.kanagiven === undefined ){
			var family = tweetWords[currentIndex];
			if ( family === value.kanagiven )
			{
				return true;
			}
		}
		return false;
	};

	this.kanaNameNoSpacesFamilyFirst = function(tweetWords, currentIndex, value) {
		if ( value.kanafamily === undefined && value.kanagiven === undefined ) {
			return false;
		}

		var word = tweetWords[currentIndex];
		if ( word.indexOf( value.kanafamily ) == 0 ) {
			return value.kanafamily + value.kanagiven === word;
		}
		else {
			return false;
		}
	};

	this.kanaNameWithSpacesFamilyFirst = function(tweetWords, currentIndex, value) {
		if ( value.kanafamily === undefined && value.kanagiven === undefined ) {
			return false;
		}

		var word = tweetWords[currentIndex];
		if ( word === value.kanafamily ) {
			var nextIndex = currentIndex + 1;
			if ( nextIndex < tweetWords.length ) {
				var nextWord = tweetWords[nextIndex];
				var kanagiven = value.kanagiven;
				if ( nextWord === kanagiven ) {
					return true;
				}
				else if ( kanagiven === undefined ) {
					return true;
				}
			}
		}
		return false;
	};

	this.kanaNameNoSpacesGivenFirst = function(tweetWords, currentIndex, value) {
		if ( value.kanafamily === undefined && value.kanagiven === undefined ) {
			return false;
		}

		var word = tweetWords[currentIndex];
		if ( value.kanagiven != undefined && word.indexOf( value.kanagiven ) == 0 ) {
			return value.kanagiven + value.kanafamily === word;
		}
		else {
			return false;
		}
	};

	this.kanaNameWithSpacesGivenFirst = function(tweetWords, currentIndex, value) {
		if ( value.kanafamily === undefined && value.kanagiven === undefined ) {
			return false;
		}

		var word = tweetWords[currentIndex];
		if ( word === value.kanagiven ) {
			var nextIndex = currentIndex + 1;
			if ( nextIndex < tweetWords.length ) {
				var nextWord = tweetWords[nextIndex];
				var kanafamily = value.kanafamily;
				if ( nextWord === kanafamily ) {
					return true;
				}
				else {
					if ( kanafamily === undefined ) {
						return true;
					}
				}
			}
		}
		return false;
	};

	this.roNameFamilyOnly = function(tweetWords, currentIndex, value) {
		if ( value.rofamily != undefined && value.rogiven === undefined ){
			var family = tweetWords[currentIndex];
			if ( family === value.rogiven )
			{
				return true;
			}
		}
		return false;
	};

	this.roNameWithFamilyFirst = function(tweetWords, currentIndex, value) {
		if ( value.rofamily === undefined && value.rogiven === undefined ) {
			return false;
		}

 		var word = tweetWords[currentIndex].toLowerCase();
 		if ( word === value.rofamily.toLowerCase() ) {
 			var nextIndex = currentIndex + 1;
 			if ( nextIndex < tweetWords.length ) {
 				var nextWord = tweetWords[nextIndex].toLowerCase();
 				var rogiven = value.rogiven.toLowerCase();
 				if ( nextWord === rogiven ) {
 					return true;
 				}
 				else {
 					if ( rogiven === undefined ) {
 						return true;
 					}
 				}
 			}
 		}
 		return false;
 	};

	this.roNameWithGivenFirst = function(tweetWords, currentIndex, value) {
		if ( value.rofamily === undefined && value.rogiven === undefined ) {
			return false;
		}

		var word = tweetWords[currentIndex].toLowerCase();
		if ( word === value.rogiven.toLowerCase() ) {
			var nextIndex = currentIndex + 1;
			if ( nextIndex < tweetWords.length ) {
				var nextWord = tweetWords[nextIndex].toLowerCase();
				var rofamily = value.rofamily.toLowerCase();
				if ( nextWord === rofamily ) {
					return true;
				}
				else {
					if ( rofamily === undefined ) {
						return true;
					}
				}
			}
		}
		return false;
	};

	this.getMatchedIndex = function(tweetWords, index, value) {
		resultIndex = -1;
		if ( this.kanjiNameFamilyOnly( tweetWords, index, value ) ) {
			resultIndex = index;
		}
		else if ( this.kanaNameFamilyOnly( tweetWords, index, value ) ) {
			resultIndex = index;
		}
		else if ( this.roNameFamilyOnly( tweetWords, index, value ) ) {
			resultIndex = index;
		}
		else if ( this.kanjiNameNoSpaces( tweetWords, index, value ) ) {
			resultIndex = index;
		}
		else if ( this.kanjiNameWithSpaces( tweetWords, index, value ) ) {
			resultIndex = index;
		}
		else if ( this.kanaNameNoSpacesFamilyFirst( tweetWords, index, value ) ) {
			resultIndex = index;
		}
		else if ( this.kanaNameWithSpacesFamilyFirst( tweetWords, index, value ) ) {
			resultIndex = index;
		}
		else if ( this.kanaNameNoSpacesGivenFirst( tweetWords, index, value ) ) {
			resultIndex = index;
		}
		else if ( this.kanaNameWithSpacesGivenFirst( tweetWords, index, value ) ) {
			resultIndex = index;
		}
		else if ( this.roNameWithFamilyFirst( tweetWords, index, value ) ) {
			resultIndex = index;
		}
		else if ( this.roNameWithGivenFirst( tweetWords, index, value ) ) {
			resultIndex = index;
		}
		return resultIndex;
	}
}

module.exports = NameMatcher;