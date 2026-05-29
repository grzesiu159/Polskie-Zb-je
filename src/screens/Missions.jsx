import { missions } from "../data/missions";

function Missions({
  player,
  updatePlayer,
  back,
}) {
  function claimMission(mission) {
    if (
      player.missions.includes(
        mission.id
      )
    )
      return;

    if (
      player.defeatedEnemies.length <
      mission.target
    )
      return;

    updatePlayer({
      ...player,

      xp:
        player.xp +
        mission.rewardXp,

      money:
        player.money +
        mission.rewardMoney,

      missions: [
        ...player.missions,
        mission.id,
      ],
    });
  }

  return (
    <div
      style={{
        padding: "20px",
        color: "white",
      }}
    >
      <h1>📜 Misje</h1>

      {missions.map((mission) => {
        const done =
          player.missions.includes(
            mission.id
          );

        const progress =
          player.defeatedEnemies.length;

        return (
          <div
            key={mission.id}
            style={{
              border:
                "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{mission.name}</h3>

            <p>
              {
                mission.description
              }
            </p>

            <p>
              Postęp:
              {" "}
              {progress}/
              {mission.target}
            </p>

            <p>
              Nagroda:
              {" "}
              {mission.rewardMoney}
              $
              {" "}
              +
              {" "}
              {mission.rewardXp}
              XP
            </p>

            {!done && (
              <button
                onClick={() =>
                  claimMission(
                    mission
                  )
                }
              >
                Odbierz
              </button>
            )}

            {done && (
              <p>
                ✅ Odebrano
              </p>
            )}
          </div>
        );
      })}

      <button onClick={back}>
        Powrót
      </button>
    </div>
  );
}

export default Missions;