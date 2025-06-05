// Load .env variables
require("dotenv").config();

const WebSocket = require("ws");

// Establish WebSocket connection and retrieve pending requests from Service B
const { getWS, getPendingRequests } = require("../websockets/ServiceBConnection");

// Establish Database connection and load db config
// const db = require(process.env.DATABASE || "../database/my-config");

// Util to deep-compare two objects
const lodash = require("lodash");

// Returns Pokemon
const getPokeBody_MSB = async (req, res) => {
  const ws = getWS();
  const pendingRequests = getPendingRequests();

  if (ws.readyState !== WebSocket.OPEN) {
    return res.status(503).json({ error: 'Service C WebSocket not connected' });
  }

  const name = req.params.name;
  const requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

  // Send request to WebSocket server
  const requestPayload = JSON.stringify({
    type: 'pokeScan',
    requestId,
    name,
  });

  ws.send(requestPayload);

  // Wait for the WebSocket response and send it back to frontend
  const response = await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      pendingRequests.delete(requestId);
      reject(new Error('Timeout waiting for WebSocket response'));
    }, 5000); // 5 seconds timeout

    pendingRequests.set(requestId, (message) => {
      clearTimeout(timeout);
      resolve(message);
    });
  }).catch((err) => {
    res.status(504).json({ error: err.message });
  });

  if (response) {
    res.json(response);
  }
};

// Returns list of all zones in Zones
const getZoneList = async (req, res) => {
  try {
    
    // query dependent on the type of db in use
    const query = db.client === "mysql" 
    // Select all rows from the "Zones" table
    ? "SELECT  zoneTypeID,   typesOfZone  FROM Zones"
    : `SELECT "zoneTypeID", "typesOfZone" FROM Zones`;
    
    // Select all rows from the "Trainers" table
    const result = await db.pool.query(query);
    
    // For MySQL or Postgres Results
    const rows = result[0] || result.rows;
    
    // Send back the list to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching Pokemon Zones List from the database:", error);

    // Send error
    res.status(500).json({ error: "Error fetching Pokemon Zones List" });
  }
};

// Returns a single Zone by their unique ID from Zones
const getZonebyID = async (req, res) => {
  try {
    const zoneTypeID = req.params.zoneTypeID;

    // query dependent on the type of db in use
    const query = db.client === "mysql" 
    ? "SELECT * FROM Zones WHERE  zoneTypeID = ?"
    : `SELECT * FROM Zones WHERE "zoneTypeID"= $1`;

    // Looking for Zone by id
    const result = await db.pool.query(query, [zoneTypeID]);
    
    // For MySQL or Postgres Results
    const zone = result[0] || result.rows;

    // Check if Pokemon Trainer was found
    if (zone.length === 0) {
      return res.status(404).json({ error: "Pokemon Zone not found" });
    }

    res.json(zone[0]);
  } catch (error) {
    console.error("Error fetching Pokemon Zone from the database:", error);

    // Send error
    res.status(500).json({ error: "Error fetching Pokemon Zone" });
  }
};

// Returns status of creation of new Zone in the Zones table
const createZone = async (req, res) => {

  try {
    const { zoneTypeID, typesOfZone, populationOfZone, economicPotential, socialPotential, giniCoefficient, districtID} = req.body;
    
    console.log('Received request data:', req.body);

    // Check if districtID is valid District
    if ( districtID != null ) {
      // query dependent on the type of db in use
      const fk_check = db.client === "mysql" 
      ? "SELECT * FROM Districts WHERE districtID  = ?"
      : `SELECT * FROM Districts WHERE "districtID"= $1`;

      // Check if districtID is valid District
      const result = await db.pool.query(fk_check, [districtID]);

      // For MySQL or Postgres Results
      const district = result[0] || result.rows;
      console.log("1 = Valid FK:", district.length);
      
      // districtID is FK in Trainers, has to be valid INT FK ID and NOT NULL
      if (district.length == 0 ) {
        return res.json({ message: `Invalid District ID: ${districtID}. Not a Poke District` });
      }
    }
    
    if (!typesOfZone || !populationOfZone || !economicPotential || !socialPotential || !giniCoefficient || !districtID) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    // query dependent on the type of db in use
    const query = db.client === "mysql"
    ? "INSERT INTO Zones (zoneTypeID, typesOfZone, populationOfZone, economicPotential, socialPotential, giniCoefficient, districtID) VALUES(?, ?, ?, ?, ?, ?, ?)"
    : (zoneTypeID
        ? `INSERT INTO Zones ("zoneTypeID", "typesOfZone", "populationOfZone", "economicPotential", "socialPotential", "giniCoefficient", "districtID") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "zoneTypeID"`
        : `INSERT INTO Zones (              "typesOfZone", "populationOfZone", "economicPotential", "socialPotential", "giniCoefficient", "districtID") VALUES ($1, $2, $3, $4, $5, $6    ) RETURNING "zoneTypeID"`);    

    const create = [
      zoneTypeID         || null,
      typesOfZone, 
      populationOfZone,
      economicPotential,
      socialPotential,
      giniCoefficient,
      districtID         || null,
    ].slice(db.client !== "mysql" && !zoneTypeID ? 1 : 0);

    const result = await db.pool.query(query, create);

    // For MySQL or Postgres Results
    const response = result[0] || result.rows;

    res.status(201).json({ message: "Zone created successfully", zoneID: response.insertId });
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating Zone:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating Zone" });
  }
};

const updateZone = async (req, res) => {
  console.log("Request Body:", req.body);

  // Get the Zone ID
  const zoneTypeID = req.params.zoneTypeID;
  // Get the Zone Object
  const newZone = req.body;

  try {
    //Check for any null zone entries 
    if ( !newZone.typesOfZone || !newZone.populationOfZone || !newZone.economicPotential || !newZone.socialPotential || !newZone.giniCoefficient || !newZone.districtID ) {
      return res.status(300).json({ error: "Required fields are missing" });
    }

    // query dependent on the type of db in use
    const query = db.client === "mysql" 
    ? "SELECT * FROM Zones WHERE  zoneTypeID = ?"
    : `SELECT * FROM Zones WHERE "zoneTypeID"= $1`;

    // Get the current Pokemon Gym from the database
    const data = await db.pool.query(query, [zoneTypeID]);

    // For MySQL or Postgres Results
    const oldZone = data[0] || data.rows;

    // Remove zoneTypeID to match both objects
    delete oldZone[0].zoneTypeID;

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newZone, oldZone[0])) {
      
      // Check if districtID is valid District
      if ( newZone.districtID != null ) {

        // query dependent on the type of db in use
        const fk_check = db.client === "mysql" 
        ? "SELECT * FROM Districts WHERE  districtID = ?"
        : `SELECT * FROM Districts WHERE "districtID"= $1`;

        // Check if districtID is valid District
        const result = await db.pool.query(fk_check, [newZone.districtID]);

        // For MySQL or Postgres Results
        const district = result[0] || result.rows;
        console.log("1 = Valid FK:", district.length);
        
        // districtID is FK in Trainers, has to be valid INT FK ID and NOT NULL
        if (district.length == 0 ) {
          return res.json({ message: `Invalid District ID: ${newZone.districtID}. Not a Poke District` });
        }
      }
      
      // query dependent on the type of db in use
      const query = db.client === "mysql" 
      ? "UPDATE Zones SET  typesOfZone = ?,  populationOfZone = ?,  economicPotential = ?,  socialPotential = ?,  giniCoefficient = ?,  districtID = ? WHERE  zoneTypeID = ?"
      : `UPDATE Zones SET "typesOfZone"=$1, "populationOfZone"=$2, "economicPotential"=$3, "socialPotential"=$4, "giniCoefficient"=$5, "districtID"=$6 WHERE "zoneTypeID"=$7`;

      
      const values = [
        newZone.typesOfZone,
        newZone.populationOfZone,
        newZone.economicPotential,
        newZone.socialPotential,
        newZone.giniCoefficient,
        newZone.districtID,
        zoneTypeID,
      ];
      
      // Perform the update
      await db.pool.query(query, values);
      // Inform client of success and return 
      return res.status(200).json({ message: "Poke Zone updated successfully." });
    }
    res.json({ message: "Poke Zone details are the same, no update" });
  } catch (error) {
    console.log("Error updating Poke Zone", error);

    // Send error
    res.status(500).json({ error: `Error updating the Poke Zone with id ${zoneTypeID}` });
  }
};

// Endpoint to delete zone from the database
const deleteZone = async (req, res) => {
  console.log("Deleting Zone with id:", req.params.zoneTypeID);
  const zoneTypeID = req.params.zoneTypeID;

  try {
    // query dependent on the type of db in use
    const find = db.client === "mysql"
    ? "SELECT 1 FROM Zones WHERE  zoneTypeID = ?"
    : `SELECT 1 FROM Zones WHERE "zoneTypeID"= $1`;
    
    // Ensure the zone exitst
    const result = await db.pool.query(find, [zoneTypeID]);

    // For MySQL or Postgres Results
    const isExisting = result[0] || result.rows;

    // If the zoen doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Zone not found");
    }

    // query dependent on the type of db in use
    const remove = db.client === "mysql"
    ? "DELETE FROM Zones WHERE  zoneTypeID = ?"
    : `DELETE FROM Zones WHERE "zoneTypeID"= $1`;

    // Delete the zone from Pokemon Zones table
    await db.pool.query(remove, [zoneTypeID]);

    // Return the appropriate status code
    res.status(202).json({ message: "Zone deleted successfully" })
  } catch (error) {
    console.error("Error deleting Zone from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getPokeBody_MSB,
  getZoneList,
  getZonebyID,
  createZone,
  updateZone,
  deleteZone,
};
