// Load .env variables
require("dotenv").config();

// Establish Database connection and load db config
// const db = require(process.env.DATABASE || "../database/my-config");

// Util to deep-compare two objects
const lodash = require("lodash");

async function getBaseStats(name) {    
    try {
        const pokename = name.toLowerCase().trim();
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokename}`);

        if (!res.ok) {
            const errText = await res.text();
            console.error("API responded with error body:", errText);
            throw new Error(`Pokemon "${pokename}" not found (Status: ${res.status})`);
        }
        
        const json = await res.json();

        // Extract stats into snake_case format
        const stats = {};
        json.stats.forEach(s => {
            const key = s.stat.name.replace(/-/g, '_');
            stats[key] = s.base_stat;
        });

        // Add name, type, and official artwork image
        const nameFormatted = json.name;
        const type = json.types[0]?.type?.name || "unknown";
        const image = json.sprites?.other?.["official-artwork"]?.front_default || "";

        return {
            name: nameFormatted,
            type,
            image,
            ...stats,
        };

    } catch (err) {
        console.error("Error in getBaseStats:", err.message);
        throw err;
    }
}

function getHoldItems(name, battleType) {
    return [
        { item: 'Leftovers', justification: 'Provides passive healing each turn' },
        { item: 'Choice Scarf', justification: 'Increases speed but locks into one move' }
    ];
}

async function getEVProfile(name) {
    const slug = name.toLowerCase().trim();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
    if (!res.ok) throw new Error(`Pokemon "${name}" not found`);
    const json = await res.json();

    const evProfile = {};
    json.stats.forEach(s => {
        const key = s.stat.name.replace(/-/g, '_');
        evProfile[key] = s.effort;
    });
    return evProfile;
}

// Export the functions as methods of an object
module.exports = {
    getBaseStats,
    getHoldItems,
    getEVProfile,
};
