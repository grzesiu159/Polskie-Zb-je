import { useEffect, useState } from "react";

import Intro from "./screens/Intro";
import CharacterCreator from "./screens/CharacterCreator";
import Podhale from "./screens/Podhale";
import Fight from "./screens/Fight";
import MapScreen from "./screens/MapScreen";
import RegionPodhale from "./screens/RegionPodhale";
import RegionSlask from "./screens/RegionSlask";
import Profile from "./screens/Profile";
import Inventory from "./screens/Inventory";
import Shop from "./screens/Shop";
import Missions from "./screens/Missions";

import { createPlayer } from "./data/player";

function App() {
  const [player, setPlayer] = useState(() => {
    const saved = localStorage.getItem(
      "polskie_zboje_player"
    );

    return saved ? JSON.parse(saved) : null;
  });

  const [screen, setScreen] = useState(() => {
    const saved = localStorage.getItem(
      "polskie_zboje_player"
    );

    return saved ? "home" : "intro";
  });

  const [selectedEnemy, setSelectedEnemy] =
    useState(null);

  useEffect(() => {
    if (player) {
      localStorage.setItem(
        "polskie_zboje_player",
        JSON.stringify(player)
      );
    }
  }, [player]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer((oldPlayer) => {
        if (!oldPlayer) return oldPlayer;

        if (
          oldPlayer.energy >=
          oldPlayer.maxEnergy
        ) {
          return oldPlayer;
        }

        return {
          ...oldPlayer,
          energy: Math.min(
            oldPlayer.maxEnergy,
            oldPlayer.energy + 20
          ),
        };
      });
    }, 900000);

    return () =>
      clearInterval(interval);
  }, []);

  if (screen === "intro") {
    return (
      <Intro
        start={() => setScreen("creator")}
      />
    );
  }

  if (screen === "creator") {
    return (
      <CharacterCreator
        selectClass={(selected) => {
          setPlayer(
            createPlayer(selected)
          );

          setScreen("home");
        }}
      />
    );
  }

  if (screen === "home") {
    return (
      <Podhale
        player={player}
        openMap={() => setScreen("map")}
        openProfile={() =>
          setScreen("profile")
        }
        openInventory={() =>
          setScreen("inventory")
        }
        openShop={() =>
          setScreen("shop")
        }
        openMissions={() =>
          setScreen("missions")
        }
      />
    );
  }

  if (screen === "inventory") {
    return (
      <Inventory
        player={player}
        updatePlayer={setPlayer}
        back={() => setScreen("home")}
      />
    );
  }

  if (screen === "shop") {
    return (
      <Shop
        player={player}
        updatePlayer={setPlayer}
        back={() => setScreen("home")}
      />
    );
  }

  if (screen === "missions") {
    return (
      <Missions
        player={player}
        updatePlayer={setPlayer}
        back={() => setScreen("home")}
      />
    );
  }

  if (screen === "map") {
    return (
      <MapScreen
        player={player}
        openPodhale={() =>
          setScreen("regionPodhale")
        }
        openSlask={() =>
          setScreen("regionSlask")
        }
      />
    );
  }

  if (screen === "regionPodhale") {
    return (
      <RegionPodhale
        player={player}
        fight={(enemy) => {
          setSelectedEnemy(enemy);
          setScreen("fight");
        }}
      />
    );
  }

  if (screen === "regionSlask") {
    return (
      <RegionSlask
        player={player}
        fight={(enemy) => {
          setSelectedEnemy(enemy);
          setScreen("fight");
        }}
      />
    );
  }

  if (screen === "profile") {
    return (
      <Profile
        player={player}
        updatePlayer={setPlayer}
        back={() => setScreen("home")}
      />
    );
  }

  if (screen === "fight") {
    return (
      <Fight
        player={player}
        enemy={selectedEnemy}
        updatePlayer={setPlayer}
        back={() =>
          setScreen("regionPodhale")
        }
      />
    );
  }

  return null;
}

export default App;