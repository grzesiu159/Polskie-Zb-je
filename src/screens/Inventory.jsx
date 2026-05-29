import { items } from "../data/items";

function Inventory({
  player,
  updatePlayer,
  back,
}) {
  const inventoryItems = items.filter(
    (item) =>
      player.inventory.includes(item.id)
  );
  console.log("ITEMS:", items);
console.log("INVENTORY:", player.inventory);
console.log("FILTER:", inventoryItems);

  function equip(item) {
    updatePlayer({
      ...player,

      equipment: {
        ...player.equipment,

        [item.slot]: item.id,
      },
    });
  }

  return (
    <div
      style={{
        padding: "20px",
        color: "white",
      }}
    >
      <h1>Ekwipunek</h1>

      {inventoryItems.length === 0 && (
        <p>Brak przedmiotów.</p>
      )}

      {inventoryItems.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid gray",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>{item.name}</h3>

          <p>
            Rzadkość: {item.rarity}
          </p>

          <button
            onClick={() => equip(item)}
          >
            Załóż
          </button>
        </div>
      ))}

      <button onClick={back}>
        Powrót
      </button>
    </div>
  );
}

export default Inventory;