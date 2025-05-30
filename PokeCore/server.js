require("dotenv").config();
const { connectWebSocket } = require("./websockets/ServiceAConnection");
const express = require("express");
const WebSocket = require('ws');
const cors = require("cors");

// Declare the HOST variable
const HOST = process.env.HOST || "localhost";
const NODE_ENV = process.env.NODE_ENV || "production";

const app = express();
const PORT = process.env.PORT || 2020;

// Declare the FE_URL variable
const FE_URL = process.env.FE_URL || "http://localhost:3030"; 

// Declare the MSA_URL variable
const MSA_URL = process.env.MS_A_URL || "http://localhost:5050"; 

// Declare the WS_URL Service A
const SERVICE_A_WS_URL = process.env.MS_A_WS_URL || 'ws://localhost:5050';
connectWebSocket(SERVICE_A_WS_URL);

// Middleware:
app.use(cors({ credentials: true, origin: FE_URL }));
app.use(express.json());

// Keep-Alive
setInterval(() => {
  console.log(FE_URL)
  fetch(`${FE_URL}/health`)
    .then(res => res.text())
    .then(data => console.log(`Message: ${data}`))
    .catch(err => console.error("Failed to Ping:", err.message));
}, 1 * 1000);

// API Routes
app.use("/api/baseStats", require("./routes/serviceARoutes"));

// Adding "Help World" to base URL to confrim backend is working
app.get("/", (req, res) => {
  res.send("Austin's PokeCore Service is running.");
});

app.listen(PORT, () => {
  if (NODE_ENV === "production") {
    console.log(`Production server running at https://${HOST}:${PORT}`);
  } else {
    console.log(`Local server running at http://${HOST}:${PORT}`);
  }
});
