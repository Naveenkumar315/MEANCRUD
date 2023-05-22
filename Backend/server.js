const express = require("express");
const cors = require("cors");
require('dotenv').config();
const appRoutes = require('./routes/router');
const { connectToDb } = require('./db/db')
const server = express();
const port = process.env.PORT || 5000;

console.log('********************'+process.env.PORT2)
console.log('********************'+process.env.ORIGIN)

connectToDb().then(()=>{
      console.log('db connected...')
}).catch((err)=>{
      console.log('db not connected' + err);
})

// Configure CORS middleware
server.use(cors({
      origin: process.env.ORIGIN,
      optionsSuccessStatus: 200,
      allowedHeaders: ['Content-Type'],
      exposedHeaders: ['Content-Type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
      preflightContinue: true,
 }));


// Parse incoming JSON requests
server.use(express.json());

// Add server routes
server.use('/', appRoutes);

// Start the server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
