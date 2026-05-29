function MapScreen({
  player,
  openPodhale,
  openSlask,
}) {
  const slaskUnlocked =
    player.level >= 15;

  return (
    <div className="page">
      <h1>Mapa Polski</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "320px",
        }}
      >
        <button onClick={openPodhale}>
          🏔️ Podhale
        </button>

        <button
          disabled={!slaskUnlocked}
          onClick={openSlask}
        >
          {slaskUnlocked
            ? "🏭 Śląsk"
            : "🏭 Śląsk (lvl 15)"}
        </button>

        <button disabled>
          🌊 Pomorze (lvl 35)
        </button>

        <button disabled>
          🏙️ Mazowsze (lvl 55)
        </button>
      </div>

      {!slaskUnlocked && (
        <p
          style={{
            marginTop: "20px",
          }}
        >
          🔒 Osiągnij poziom 15,
          aby odblokować Śląsk.
        </p>
      )}
    </div>
  );
}

export default MapScreen;