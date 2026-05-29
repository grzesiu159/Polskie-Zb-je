function Profile({
  player,
  updatePlayer,
  back,
}) {
  function addStat(stat) {
    if (player.freePoints <= 0) return;

    updatePlayer({
      ...player,

      freePoints:
        player.freePoints - 1,

      stats: {
        ...player.stats,

        [stat]:
          player.stats[stat] + 1,
      },
    });
  }

  return (
    <div className="page">
      <h1>Profil</h1>

      <h2>{player.className}</h2>

      <p>
        Poziom: {player.level}
      </p>

      <p>
        XP: {player.xp} /{" "}
        {player.xpNeeded}
      </p>

      <p>
        Siano: {player.money}
      </p>

      <p>
        Złoto: {player.gold}
      </p>

      <p>
        Energia:
        {" "}
        {player.energy}
        /
        {player.maxEnergy}
      </p>

      <hr />

      <h3>Statystyki</h3>

      <p>
        💪 Siła:
        {" "}
        {player.stats.sila}
      </p>

      <button
        onClick={() =>
          addStat("sila")
        }
      >
        + Siła
      </button>

      <p>
        🧠 Inteligencja:
        {" "}
        {player.stats.inteligencja}
      </p>

      <button
        onClick={() =>
          addStat(
            "inteligencja"
          )
        }
      >
        + Inteligencja
      </button>

      <p>
        ❤️ Wytrzymałość:
        {" "}
        {player.stats.wytrzymalosc}
      </p>

      <button
        onClick={() =>
          addStat(
            "wytrzymalosc"
          )
        }
      >
        + Wytrzymałość
      </button>

      <hr />

      <h3>
        Wolne Punkty:
        {" "}
        {player.freePoints}
      </h3>
<hr />

<h3>Reputacja</h3>

<p>
  🏔️ Podhale:
  {" "}
  {player.reputation.podhale}
</p>

<p>
  🏭 Śląsk:
  {" "}
  {player.reputation.slask}
</p>

<p>
  🌊 Pomorze:
  {" "}
  {player.reputation.pomorze}
</p>

      <button onClick={back}>
        Powrót
      </button>
    </div>
  );
}

export default Profile;