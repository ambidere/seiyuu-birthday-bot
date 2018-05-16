var fs = require('fs')
var _ = require('lodash');

var Moment = require('moment');
var GoogleSpreadsheet = require('google-spreadsheet');

var doc = new GoogleSpreadsheet('1TH2QZEIZRodFHF-tfwMKtdi-WIwOegSYnSaGbKUSKKY');
doc.getInfo( (err, info) => {
	sheet = info.worksheets[0];
	console.log('Compilation started...')
});

var entries = []
doc.getRows(1, { offset: 1 } ,(err, rows) => {
	console.log('Creating entries from ' + rows.length + ' rows...');
	_.forEach(rows, (row, rowIndex) => {
		entries.push( createEntry(row) )
	})
	console.log('Writing to file...')
	fs.writeFileSync('./src/data/test.json', JSON.stringify(entries))
})

function createEntry(row) {
	entry = {
		"japaneseNames" : getJapaneseName(row),
		"englishNames" : getEnglishNames(row),
		"birthdate" : getBirthdate(row)
	};
	return entry;
}

function getJapaneseName(row) {
	if ( _.isEmpty(row.kanjigiven) ) {
		return row.kanjifamily
	}
	kanjiName = row.kanjifamily + row.kanjigiven;
	kanjiNameWithSpace = row.kanjifamily + ' ' + row.kanjigiven;
	return kanjiName + ',' + kanjiNameWithSpace;
}

function getEnglishNames(row) {
	if ( _.isEmpty(row.rogiven) ) {
		return row.rofamily;
	}
	lastFirst = row.rofamily + ' ' + row.rogiven;
	givenFirst = row.rogiven + ' ' + row.rofamily;
	return lastFirst + ',' + givenFirst;
}

function getBirthdate(row) {
	var year = row.year
	if ( _.isEmpty( row.year ) ) {
		year = Moment().year()
	}
	var month = row.month
	if (month.length === 1)
	{
		month = '0' + month
	}
	var day = row.day
	if (day.length === 1)
	{
		day = '0' + day
	}
	return year + '-' + month + '-' + day
}
