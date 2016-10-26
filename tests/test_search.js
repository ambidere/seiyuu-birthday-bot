var SearchFromData = require(__dirname + '/../src/search');
var MockData = require(__dirname + '/data/data');

//chai 
var chai = require('chai');
var assert = chai.assert;


describe('SearchFromData', () => {
	var searcher = new SearchFromData(MockData);

	it( 'initializes', () => {
		assert.isNotNull(new SearchFromData(MockData));
	});

	it( 'empty tweet', () => {
		var emptyTweet = "   ";
		assert.isNull(searcher.search(emptyTweet));
	});

	it( 'mentions only', () => {
		var mentionTweet = "@user123 @user456";
		assert.isNull(searcher.search(mentionTweet));
	});

	it( 'romaji tweet only contains proper entry, family name first', () => {
		var mentionTweet = "Taneda Risa";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1988);
		assert.strictEqual(returnedValue.month,7);
		assert.strictEqual(returnedValue.day,12);
	});

	it( 'romaji tweet only contains proper entry, family name first with multiple spaces', () => {
		var mentionTweet = "          Taneda      Risa     ";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1988);
		assert.strictEqual(returnedValue.month,7);
		assert.strictEqual(returnedValue.day,12);
	});

	it( 'romaji tweet only contains proper entry, given name first', () => {
		var mentionTweet = "Risa Taneda";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1988);
		assert.strictEqual(returnedValue.month,7);
		assert.strictEqual(returnedValue.day,12);
	});

	it( 'romaji tweet only contains proper entry, given name first with multiple spaces', () => {
		var mentionTweet = "         Risa    Taneda ";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1988);
		assert.strictEqual(returnedValue.month,7);
		assert.strictEqual(returnedValue.day,12);
	});

	it( 'kanji tweet only contains proper entry, family name first no spaces', () => {
		var mentionTweet = "種田梨沙";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1988);
		assert.strictEqual(returnedValue.month,7);
		assert.strictEqual(returnedValue.day,12);
	});

	it( 'kanji tweet only contains proper entry, family name first with spaces in middle', () => {;
		var mentionTweet = "種田      梨沙";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1988);
		assert.strictEqual(returnedValue.month,7);
		assert.strictEqual(returnedValue.day,12);
	});

	it( 'kanji tweet only contains proper entry, family name first with multiple spaces before and after', () => {
		var mentionTweet = "  種田梨沙       ";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1988);
		assert.strictEqual(returnedValue.month,7);
		assert.strictEqual(returnedValue.day,12);
	});

	it( 'kana tweet only contains proper entry, family name first no spaces', () => {
		var mentionTweet = "たねだりさ";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1988);
		assert.strictEqual(returnedValue.month,7);
		assert.strictEqual(returnedValue.day,12);
	});

	it( 'kana tweet only contains proper entry, family name first with spaces in middle', () => {;
		var mentionTweet = "たねだ　　　　　りさ";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1988);
		assert.strictEqual(returnedValue.month,7);
		assert.strictEqual(returnedValue.day,12);
	});

	it( 'kana tweet only contains proper entry, family name first with multiple spaces before and after', () => {
		var mentionTweet = "  たねだりさ      ";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1988);
		assert.strictEqual(returnedValue.month,7);
		assert.strictEqual(returnedValue.day,12);
	});

	it( 'tweet has two proper entries, returns alphabetically first entry', () => {
		var mentionTweet = "種田梨沙 愛美";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1991);
		assert.strictEqual(returnedValue.month,12);
		assert.strictEqual(returnedValue.day,25);
	});

	it( 'tweet has proper entry family name only, no spaces', () => {
		var mentionTweet = "愛美";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1991);
		assert.strictEqual(returnedValue.month,12);
		assert.strictEqual(returnedValue.day,25);
	});

	it( 'tweet has proper entry family name only, with spaces', () => {
		var mentionTweet = "愛美      ";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1991);
		assert.strictEqual(returnedValue.month,12);
		assert.strictEqual(returnedValue.day,25);
	});

	it( 'tweet has proper entry family name only, with spaces between kanji', () => {
		var mentionTweet = "愛   美      ";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNull(returnedValue);
	});

	it( 'tweet at user then proper entry', () => {
		var mentionTweet = "@seiyu_tanjoubi 種田梨沙";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1988);
		assert.strictEqual(returnedValue.month,7);
		assert.strictEqual(returnedValue.day,12);
	});
});