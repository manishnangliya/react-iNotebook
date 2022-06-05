const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://manishnangliya:Manish123@cluster0.ewsiorv.mongodb.net/inotebook?retryWrites=true&w=majority";

const connectToMongo = () =>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo succesfully");
    })
}

module.exports = connectToMongo;