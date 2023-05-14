let mongoose = require('mongoose');

let mongoURI = "mongodb://localhost:27017/iNotebook?readPreference=primary&directConnection=true&tls=false";

let connectToMongo = async () => {

    mongoose.connect(mongoURI, () => {

        console.log("Connected to Mongo Successfully");

    });

};

module.exports = connectToMongo;