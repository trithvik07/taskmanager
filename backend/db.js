const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://trithvik:rithvik@taskmanager.y7krray.mongodb.net/?retryWrites=true&w=majority";
//connecting to mongo using url
const connectToMongo = async()=>{
    await mongoose.connect(mongoURI);
    console.log("connected to mongodb");
}

module.exports = connectToMongo