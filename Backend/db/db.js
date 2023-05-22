const mongoose = require('mongoose')
require('dotenv').config();

// Connection URL
// const url = 'mongodb://localhost:27017/mydb';
const url = process.env.DBURL;

async function connectToDb(){
      try {
            await mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
            console.log(`DB connected`)
            return mongoose
      } catch (error) {
            console.log(`DB connection err: ${error}`)
      }
}

module.exports = { connectToDb }
