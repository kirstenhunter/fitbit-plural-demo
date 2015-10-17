module.exports = {
        production: {
                db: 'mongodb://synedra:carbon8ed@apollo.modulusmongo.net:27017/ev4aQade', // MongoDB connection string, ex: mongodb://db-user:db-password@mongo.onmodulus.net:27017/1234567
                fitbitClientKey: '229WL6', // Your Fitbit application information found at https://dev.fitbit.com/apps
                fitbitClientSecret: 'e43aebbc9472c593f95f63679cd537b1',
                host: 'fitbitpluralsight-53387.onmodulus.net', // The hostname where this application is available publicly, ex: fitbitexample-9501.onmodulus.net
                twilioAccountSid: 'ACcb0346ffae5c8cb8181961f761f84e54', // Found on your Twilio account page: https://www.twilio.com/user/account
                twilioAuthToken: 'bd0e1ac7a8ba5167a2b1251431b58a2f',
                twilioPhoneNumber: '+18315080377' // The Twilio number that SMS will be sent from, ex: +14152363281
        }
};

