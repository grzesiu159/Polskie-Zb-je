import { podhaleEnemies } from "../data/enemies";

function RegionPodhale({ fight, player }) {
  return (
    
    <div className="page">
      <h1>Podhale</h1>
      {player.completedRegions.includes(
  "podhale"
) && (
  <h2>
    👑 Region ukończony
  </h2>
)}
    

      <h2>Góralska Ferajna</h2>

      {podhaleEnemies.map((enemy, index) => {
        const unlocked =
          index === 0 ||
          player?.defeatedEnemies?.includes(
            podhaleEnemies[index - 1]?.id
          );

        const defeated =
          player?.defeatedEnemies?.includes(
            enemy.id
          );

        return (
          <button
            key={enemy.id}
            disabled={!unlocked}
            onClick={() => fight(enemy)}
            style={{
              margin: "6px",
              width: "360px",
              padding: "14px",
              opacity: unlocked ? 1 : 0.4,
            }}
          >
            {defeated ? "✔ " : ""}

            {enemy.id}. {enemy.name}

            {enemy.boss ? " 👑" : ""}

            <br />

            Poziom {enemy.level}
          </button>
        );
      })}
    </div>
  );
}

export default RegionPodhale;