import { items } from "../data/items";

function Shop({
  player,
  updatePlayer,
  back,
}) {
  const shopItems = [
    {
      itemId: 2,
      price: 500,
    },
    {
      itemId: 4,
      price: 800,
    },
    {
      itemId: 5,
      price: 3000,
    },
  ];

  function buy(itemId, price) {
    if (player.money < price) {
      alert("Za mało siana");
      return;
    }

    if (
      player.inventory.includes(itemId)
    ) {
      alert(
        "Już posiadasz ten przedmiot"
      );
      return;
    }

    updatePlayer({
      ...player,

      money:
        player.money - price,

      inventory: [
        ...player.inventory,
        itemId,
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
      <h1>🛒 Sklep Podhala</h1>

      {shopItems.map((offer) => {
        const item = items.find(
          (i) =>
            i.id === offer.itemId
        );

        return (
          <div
            key={item.id}
            style={{
              border:
                "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{item.name}</h3>

            <p>
              Cena:
              {" "}
              {offer.price}
            </p>

            <button
              onClick={() =>
                buy(
                  item.id,
                  offer.price
                )
              }
            >
              Kup
            </button>
          </div>
        );
      })}

      <button onClick={back}>
        Powrót
      </button>
    </div>
  );
}

export default Shop;