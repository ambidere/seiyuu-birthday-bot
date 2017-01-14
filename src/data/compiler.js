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
	fs.writeFileSync('./src/data/data.json', JSON.stringify(entries))
})

function createEntry(row) {
	entry = {
		"birthdate" : getBirthdate(row),
		"kanjifamily" : row.kanjifamily,
		"kanjigiven" : row.kanjigiven,
		"kanafamily" : row.kanafamily,
		"kanagiven" : row.kanagiven,
		"rofamily" : row.rofamily,
		"rogiven" : row.rogiven
	};
	return entry;
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
