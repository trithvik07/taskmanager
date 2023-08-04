const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1/inotebook";
//connecting to mongo using url
const connectToMongo = async()=>{
    await mongoose.connect(mongoURI);
    console.log("connected to mongodb");
}

module.exports = connectToMongo