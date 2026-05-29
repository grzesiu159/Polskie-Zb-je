import { slaskEnemies } from "../data/enemies";

function RegionSlask({
  player,
  fight,
}) {
  return (
    <div className="page">
      <h1>⛏️ Śląsk</h1>

      {slaskEnemies.map((enemy) => (
        <button
          key={enemy.id}
          onClick={() => fight(enemy)}
          style={{
            width: "350px",
            margin: "5px",
            padding: "12px",
          }}
        >
          {enemy.name}

          <br />

          Poziom {enemy.level}
        </button>
      ))}
    </div>
  );
}

export default RegionSlask;