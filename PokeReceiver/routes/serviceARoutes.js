const {
    getBaseStats,
    getHoldItems,
    getEVProfile,
} = require("../controllers/serviceAController");

async function fetchgetBaseStats(name) {
    return await getBaseStats(name);
}

function fetchgetHoldItems(name, battleType) {
    return getHoldItems(name, battleType);
}

async function fetchgetEVProfile(name) {
    return await getEVProfile(name);
}

module.exports = {
    fetchgetBaseStats,
    fetchgetHoldItems,
    fetchgetEVProfile
};