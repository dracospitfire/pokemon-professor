// Get an instance of mysql we can use in the app
const mysql = require("mysql2");
require("dotenv").config();

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    connectionLimit     : 10,
    waitForConnections  : true,
    host                : process.env.MDB_HOST     || "localhost",
    user                : process.env.MDB_USER     || "user",
    password            : process.env.MDB_PASSWORD || "password",
    database            : process.env.MDATABASE    || "database",
}).promise();

const db = {
    client: "mysql",  
    pool: pool,      
};

// Export it for use in our application
module.exports = db;

pool.getConnection()
    .then((connection) => {
        console.log("Database connected successfully!");
        connection.release();
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });
    
    console.log("Database Host:", process.env.MDB_HOST);
    console.log("Database User:", process.env.MDB_USER);
    console.log("Database Name:", process.env.MDATABASE);