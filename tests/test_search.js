var SearchFromData = require(__dirname + '/search');
var MockData = require(__dirname + '/data/data');

//chai 
var chai = require('chai');
var assert = chai.assert;


describe('SearchFromData', () => {
	var searcher;
	before( () => {
		searcher = new SearchFromData(MockData);
	});

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
		var mentionTweet = "          Risa    Taneda ";
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

	it( 'tweet has two proper entries, returns first entry', () => {
		var mentionTweet = "種田梨沙 愛美";
		var returnedValue = searcher.search(mentionTweet);
		assert.isNotNull(returnedValue);
		assert.strictEqual(returnedValue.year,1988);
		assert.strictEqual(returnedValue.month,7);
		assert.strictEqual(returnedValue.day,12);
	});
});