const {
    getPokeBoday,
    getHoldItems,
    getEVProfile,
} = require("../controllers/serviceBController");

async function fetchgetPokeBoday(name) {
    return await getPokeBoday(name);
}

function fetchgetHoldItems(name, battleType) {
    return getHoldItems(name, battleType);
}

async function fetchgetEVProfile(name) {
    return await getEVProfile(name);
}

module.exports = {
    fetchgetPokeBoday,
    fetchgetHoldItems,
    fetchgetEVProfile
};