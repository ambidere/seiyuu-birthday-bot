var TextSearchAlgorithm = function() {
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
};

module.exports = TextSearchAlgorithm;