// websocket client
const WebSocket = require("ws");

let ws;
const pendingRequests = new Map();

function connectWebSocket(url) {
  ws = new WebSocket(url);

  ws.on("open", () => {
      console.log("Connected to Service B WebSocket.");
      // Request Charmander's baseStats every 10 seconds
      setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            const requestMessage = {
              type: "baseStats",
              name: "Charmander"
            };
            ws.send(JSON.stringify(requestMessage));
            console.log(`[${new Date().toISOString()}] Requested Charmander baseStats`);
          }
        }, 10 * 1000);
    });

  ws.on("message", (data) => {
    try {
      const message = JSON.parse(data);
      const { requestId } = message;

      if (pendingRequests.has(requestId)) {
        pendingRequests.get(requestId)(message);
        pendingRequests.delete(requestId);
      }
      console.log("From Service B:", message);
    } catch (err) {
      console.error("Failed to parse WebSocket message:", err);
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed, reconnecting in 5s...");
    setTimeout(() => connectWebSocket(url), 5000);
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err.message);
  });
}

function getWS() {
  return ws;
}

function getPendingRequests() {
  return pendingRequests;
}

module.exports = {
  connectWebSocket,
  getWS,
  getPendingRequests,
};