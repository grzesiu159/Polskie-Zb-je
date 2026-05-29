import { items } from "../data/items";

export function getFinalStats(player) {
  let sila =
    player.stats.sila;

  let inteligencja =
    player.stats.inteligencja;

  let wytrzymalosc =
    player.stats.wytrzymalosc;

  Object.values(
    player.equipment
  ).forEach((itemId) => {
    if (!itemId) return;

    const item = items.find(
      (i) => i.id === itemId
    );

    if (!item) return;

    sila +=
      item.stats.sila || 0;

    inteligencja +=
      item.stats.inteligencja || 0;

    wytrzymalosc +=
      item.stats.wytrzymalosc || 0;
  });

  return {
    sila,
    inteligencja,
    wytrzymalosc,
  };
}