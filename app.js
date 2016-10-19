//gets Twit package
var Twit = require('twit');
var MentionProcessor = require('./src/mentionprocessor')
var ErrorProcessor = require('./src/errorprocessor')

//gets twitter app credentials
var secret = require("./config/credentials")

var T = new Twit(secret)

var stream = T.stream('statuses/filter', { track: '@seiyuu_tanjoubi'});

stream.on('tweet', MentionProcessor.bind({ twitter: T }));
stream.on('error', ErrorProcessor);


console.log("Bot started...")