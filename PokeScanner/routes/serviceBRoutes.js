const {
    getPokeBody,
    getHoldItems,
    getEVProfile,
} = require("../controllers/serviceBController");

async function fetchgetPokeBody(name) {
    return await getPokeBody(name);
}

function fetchgetHoldItems(name, battleType) {
    return getHoldItems(name, battleType);
}

async function fetchgetEVProfile(name) {
    return await getEVProfile(name);
}

module.exports = {
    fetchgetPokeBody,
    fetchgetHoldItems,
    fetchgetEVProfile
};