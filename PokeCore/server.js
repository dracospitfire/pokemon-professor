require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connectWebSocket: ServiceA } = require("./websockets/ServiceAConnection");
const { connectWebSocket: ServiceB } = require("./websockets/ServiceBConnection");
const { connectWebSocket: ServiceC } = require("./websockets/ServiceCConnection");
const { connectWebSocket: ServiceD } = require("./websockets/ServiceDConnection");

// Declare the HOST variable
const HOST = process.env.HOST || "localhost";
const NODE_ENV = process.env.NODE_ENV || "production";

const app = express();
const PORT = process.env.PORT || 2020;

// Declare the FE_URL variable
const FE_URL = process.env.FE_URL || "http://localhost:3030"; 

// Middleware:
app.use(cors({ credentials: true, origin: FE_URL }));
app.use(express.json());

// Declare the WebSocket URL Services 
const SERVICE_A_WS_URL = process.env.MSA_WS_URL || 'ws://localhost:2121';
ServiceA(SERVICE_A_WS_URL);
const SERVICE_B_WS_URL = process.env.MSB_WS_URL || 'ws://localhost:2222';
ServiceB(SERVICE_B_WS_URL);
const SERVICE_C_WS_URL = process.env.MSC_WS_URL || 'ws://localhost:2323';
ServiceC(SERVICE_C_WS_URL);
const SERVICE_D_WS_URL = process.env.MSD_WS_URL || 'ws://localhost:2424';
ServiceD(SERVICE_D_WS_URL);

// MSA API Routes
app.use("/api/baseStats_MSA", require("./routes/serviceARoutes"));
// MSB API Routes
app.use("/api/getPokeBody_MSB", require("./routes/serviceBRoutes"));
// MSC API Routes
app.use("/api/baseStats_MSC", require("./routes/serviceCRoutes"));
// MCD API Routes
app.use("/api/baseStats_MSD", require("./routes/serviceDRoutes"));

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