var fs = require('fs')
var _ = require('lodash');
var GoogleSpreadsheet = require('google-spreadsheet');

var doc = new GoogleSpreadsheet('1TH2QZEIZRodFHF-tfwMKtdi-WIwOegSYnSaGbKUSKKY');
doc.getInfo( (err, info) => {
	sheet = info.worksheets[0];
	console.log('Compilation started...')
});

var entries = []
doc.getRows(1, { offset: 1 } ,(err, rows) => {
	console.log('Reading ' + rows.length + ' rows...');
	_.forEach(rows, (row, rowIndex) => {
		entry = {
			"kanjifamily" : row.kanjifamily,
			"kanjigiven" : row.kanjigiven,
			"kanafamily" : row.kanafamily,
			"kanagiven" : row.kanagiven,
			"rofamily" : row.rofamily,
			"rogiven" : row.rogiven,
			"year" : row.year,
			"month" : row.month,
			"day" : row.day
		}
		entries.push( entry )
	})
	console.log('Writing to file...')
	fs.writeFileSync('./src/data/test.json', JSON.stringify(entries))
})


