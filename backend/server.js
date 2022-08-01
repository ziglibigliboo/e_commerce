const app = require('./app.js');

const dotenv = require('dotenv');


// Config
dotenv.config({path: "backend/config/config.env"}); 

// Connecting to DB
const connectDatabase = require('./config/database')
connectDatabase()




app.listen(process.env.PORT, ()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})