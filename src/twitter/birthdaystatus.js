var Moment = require('moment');
var MomentTz = require('moment-timezone');

var BirthdayStatus = function(tweet, birthdayData, dateFormat) {
	this.tweet = tweet;
	this.birthdayData = birthdayData;
	this.dateFormat = dateFormat;
	this.noBirthYear = false;
	if ( birthdayData.year === undefined ) {
		this.noBirthYear = true;
	}

	this.getDateString = function() {
		var bData = this.birthdayData;
		this.birthdayDate = Moment(this.getYear(birthdayData) + '-' + bData.month + '-' + bData.day, 'YYYY-MM-DD');
		return this.birthdayDate.format(this.dateFormat);
	}

	this.getYear = function(birthdayData) {
		var year = '';
		if ( this.noBirthYear) {
			year = Moment().year();
		}
		else {
			year = birthdayData.year;
		}
		return year;
	}

	this.getAgeString = function () {
		var now = Moment();
		var bDate = this.birthdayDate;
		if ( this.noBirthYear ) {
			return '';
		}
		else {
			return now.diff( bDate, 'years' ) + " years old";
		}
	}

	this.getStatus = function() {
		var username = this.tweet.user.screen_name;
		var mentionToUser = "@" +  username;
		return mentionToUser + " " + this.getDateString() + ". " + this.getAgeString();
	}
}

BirthdayStatus.prototype.getTweet = function() {
	var replyTo = this.tweet.id_str;
	return {
		status: this.getStatus(), 
		in_reply_to_status_id: replyTo
	};
};

module.exports = BirthdayStatus;