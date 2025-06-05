const {
    getEvoStats,
    getHoldItems,
    getEVProfile,
} = require("../controllers/serviceDController");

async function fetchgetEvoStats(name) {
    return await getEvoStats(name);
}

function fetchgetHoldItems(name, battleType) {
    return getHoldItems(name, battleType);
}

async function fetchgetEVProfile(name) {
    return await getEVProfile(name);
}

module.exports = {
    fetchgetEvoStats,
    fetchgetHoldItems,
    fetchgetEVProfile
};