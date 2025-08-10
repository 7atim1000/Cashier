require('dotenv').config();

const config = Object.freeze({
    
    port: process.env.PORT || 8000,
    databaseURI: process.env.MONGODB_URI || "mongodb+srv://7atim1000:U3W9MSjltr7xG5ww@cluster0.vebmvec.mongodb.net/Restaurant",
    nodeEnv : process.env.NODE_ENV || "development",

    accessTokenSecret : process.env.JWT_SECRET,



   // RAZORPAY_KEY_ID:RAZORPYSECRET,
   //
   //  RAZORPAY_KEY_SECRET:RAZORPYSECRET

});

module.exports = config ;