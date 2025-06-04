
require('dotenv').config();
const http = require("http");
const express = require("express");
const cors = require("cors");

const { initializeWebSocket } = require("./websockets/ServiceAConnection");

// Declare the HOST variable
const HOST = process.env.HOST || "localhost";
const NODE_ENV = process.env.NODE_ENV || "production";

// Bind the server to the localhost on port 2222
const app = express();
const PORT = process.env.PORT || 2121;

// Declare the FE_URL variable
const FE_URL = process.env.FE_URL || "http://localhost:3030"; 

// Middleware:
app.use(cors({ credentials: true, origin: FE_URL }));
app.use(express.json());

//confirm backend is working
app.get("/", (req, res) => {
    res.send("Austin's Microservice A is running.");
});

// Create HTTP server and attach Express
const server = http.createServer(app);
initializeWebSocket(server)

server.listen(PORT, () => {
    if (NODE_ENV === "production") {
        console.log(`Production server running at https://${HOST}:${PORT}`);
        console.log(`WebSocket Server running at wss://${HOST}:${PORT}`);
    } else {
        console.log(`HTTP Server running at http://${HOST}:${PORT}`);
        console.log(`WebSocket Server running at ws://${HOST}:${PORT}`);
    }
});

