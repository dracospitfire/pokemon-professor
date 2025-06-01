// Get an instance of PostgreSQL we can use in the app
const { Pool } = require("pg");
require("dotenv").config();

// Create a 'connection pool' using the provided credentials
const pool = new Pool({
    host                : process.env.PDB_HOST     || "localhost",
    user                : process.env.PDB_USER     || "user",
    password            : process.env.PDB_PASSWORD || "password",
    database            : process.env.PDATABASE    || "database",
    ssl                 : { rejectUnauthorized: false }
})

const db = {
    client: "postgresql",  
    pool: pool,      
};

// Export it for use in our application
module.exports = db;

pool.connect()
    .then((client) => {
        console.log("Database connected successfully!");
        client.release();
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });
    
    console.log("Database Host:", process.env.PDB_HOST);
    console.log("Database User:", process.env.PDB_USER);
    console.log("Database Name:", process.env.PDATABASE);
