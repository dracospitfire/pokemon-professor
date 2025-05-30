import "./NewsUpdates.css";
const Updates = ({ cancelForm }) => {
  
  const recentNews = {
    "New feature" : "WIP: Trainers will be able to customize Pokéball throw animation.",
    "Bug fix" : "WIP: Wild Pokémon now properly scale with player level in open areas.",
    "Map update" : "WIP: Johto routes expanded with new hidden caves and dynamic weather.",
    "New system:" : "WIP: Battle AI now adapts to team's move history for more challenge.",
    "UI update:" : "WIP: Pokédex entries now support 3D model previews and voice narration.",
    "Rebalance patch:" : "WIP: XP gain from transfered Pokémon reduced slightly for better game progression.",
    "Multiplayer" : "WIP: lobby now supports up to 12 trainers with improved match stability.",
    "Inventory system" : "WIP: Sort and filter by move compatibility, effect type, and multiplier.",
};

  return (
    <section className="updates">
      <h2 className="recentnews">Recent Updates</h2>
      <ul className="updates">
        {Object.entries(recentNews).map(([title, detail], index) => (
          <li key={index}>
            <strong>{title}</strong> {detail}
          </li>
        ))}
      </ul>
      <button type="button" onClick={cancelForm}>Cancel</button>
    </section>
  ); 
}

export default Updates;