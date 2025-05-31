// websocket server
const WebSocket = require("ws");

function initializeWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        ws.on('message', async raw => {
            let request;
            try {
                request = JSON.parse(raw);
            } catch {
                return ws.send(JSON.stringify({
                    type: 'error',
                    message: 'Invalid JSON Payload'
                }));
            }

            const { type, requestId, name, battleType } = request;

            switch (type) {
                case 'baseStats':
                    try {
                        const data = await getBaseStats(name);
                        ws.send(JSON.stringify({ requestId, type: 'baseStatsResponse', name, data }));
                    } catch (err) {
                        ws.send(JSON.stringify({ requestId, type: 'error', message: err.message }));
                    }
                    break;

                case 'holdItems':
                    {
                        const data = getHoldItems(name, battleType);
                        ws.send(JSON.stringify({ requestId, type: 'holdItemsResponse', name, data }));
                    }
                    break;

                case 'evProfile':
                    try {
                        const data = await getEVProfile(name);
                        ws.send(JSON.stringify({ requestId, type: 'evProfileResponse', name, data }));
                    } catch (err) {
                        ws.send(JSON.stringify({ requestId, type: 'error', message: err.message }));
                    }
                    break;

                default:
                    ws.send(JSON.stringify({ requestId, type: 'error', message: 'Invalid request type' }));
            }
        });
    });

    return wss;
}

module.exports = {
    initializeWebSocket,
};