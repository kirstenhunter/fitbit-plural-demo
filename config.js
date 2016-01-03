module.exports = {
        production: {
                db: 'mongodb://', 
			// MongoDB connection string, 
			// ex: mongodb://db-user:db-password@mongo.onmodulus.net:27017/1234567
                host: '', 
			// The hostname where this application is available publicly, 
			//ex: fitbitexample-9501.onmodulus.net

                fitbitClientKey: '', 
			// Your Fitbit application information found at https://dev.fitbit.com/apps
                fitbitClientSecret: '',

                twilioAccountSid: '', 
			// Found on your Twilio account page: https://www.twilio.com/user/account
                twilioAuthToken: '',
                twilioPhoneNumber: '' 
			// The Twilio number that SMS will be sent from, ex: +14152363281
        }
};

