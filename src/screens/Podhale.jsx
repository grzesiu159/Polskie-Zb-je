import { items } from "../data/items";
import characterImage from "../assets/character.png";

function Podhale({
  player,
  openMap,
  openProfile,
  openInventory,
  openShop,
  openMissions,
}) {
  function getItemName(itemId) {
    if (!itemId) return "-";

    const item = items.find(
      (i) => i.id === itemId
    );

    return item ? item.name : "-";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        <div>
          Poziom {player.level}
        </div>

        <div>
          ⚡ {player.energy}/
          {player.maxEnergy}
        </div>

        <div>
          💵 {player.money}
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        <h2>{player.className}</h2>

        <p>
          XP: {player.xp}/
          {player.xpNeeded}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "340px",
            height: "460px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "110px",
              top: "80px",
              width: "120px",
              height: "240px",
              background: "#333",
              borderRadius: "20px",
              border: "2px solid #666",
              overflow: "hidden",
            }}
          >
            <img
              src={characterImage}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          <Slot
            top="0"
            left="140"
            label={getItemName(
              player.equipment.head
            )}
          />

          <Slot
            top="100"
            left="0"
            label={getItemName(
              player.equipment.weapon
            )}
          />

          <Slot
            top="100"
            left="260"
            label={getItemName(
              player.equipment.ring
            )}
          />

          <Slot
            top="190"
            left="0"
            label={getItemName(
              player.equipment.necklace
            )}
          />

          <Slot
            top="190"
            left="260"
            label={getItemName(
              player.equipment.armor
            )}
          />

          <Slot
            top="340"
            left="140"
            label={getItemName(
              player.equipment.shoes
            )}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "12px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <MenuButton
          text="🗺️ Mapa Polski"
          onClick={openMap}
        />

        <MenuButton
          text="📜 Misje"
          onClick={openMissions}
        />

        <MenuButton
          text="⚔️ PvP"
        />

        <MenuButton
          text="🎒 Ekwipunek"
          onClick={openInventory}
        />

        <MenuButton
          text="👤 Profil"
          onClick={openProfile}
        />

        <MenuButton
          text="👥 Ekipa"
        />

        <MenuButton
          text="🏆 Ranking"
        />

        <MenuButton
          text="🛒 Sklep"
          onClick={openShop}
        />
      </div>
    </div>
  );
}

function Slot({
  top,
  left,
  label,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        width: "70px",
        height: "70px",
        background: "#222",
        border: "2px solid #555",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: "10px",
        padding: "4px",
      }}
    >
      {label}
    </div>
  );
}

function MenuButton({
  text,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "15px",
        fontSize: "16px",
      }}
    >
      {text}
    </button>
  );
}

export default Podhale;