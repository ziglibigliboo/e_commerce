const app = require('./app.js');

const dotenv = require('dotenv');

// handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})


// Config
dotenv.config({ path: "backend/config/config.env" });

// Connecting to DB
const connectDatabase = require('./config/database')
connectDatabase()




const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})


// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to unhandled promise rejection")

    server.close(() => {
        process.exit(1);
    })
})