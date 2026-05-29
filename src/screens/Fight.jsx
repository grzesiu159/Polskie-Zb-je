import { getFinalStats } from "../utills/playerStats";
import { useEffect, useState } from "react";
import HealthBar from "../components/HealthBar";
import { enemyImages } from "../data/enemyImages";

function Fight({
  player,
  enemy,
  updatePlayer,
  back,
}) {
  const finalStats =
    getFinalStats(player);

  const maxPlayerHp =
    finalStats.wytrzymalosc * 100;

  const maxEnemyHp = enemy.hp;

  const [playerHp, setPlayerHp] =
    useState(maxPlayerHp);

  const [enemyHp, setEnemyHp] =
    useState(maxEnemyHp);

  const [battleLog, setBattleLog] =
    useState([]);

  const [ended, setEnded] =
    useState(false);

  const [result, setResult] =
    useState("");

  const [turn, setTurn] =
    useState("player");

  const [playerAttackAnim,
    setPlayerAttackAnim] =
    useState(false);

  const [enemyAttackAnim,
    setEnemyAttackAnim] =
    useState(false);

  const [enemyHitAnim,
    setEnemyHitAnim] =
    useState(false);

  const [playerHitAnim,
    setPlayerHitAnim] =
    useState(false);

  const [damageNumber,
    setDamageNumber] =
    useState(null);

  const [damageTarget,
    setDamageTarget] =
    useState(null);

  useEffect(() => {
    if (ended) return;

    const timer = setTimeout(() => {
      fightRound();
    }, 450);

    return () =>
      clearTimeout(timer);
  }, [
    turn,
    enemyHp,
    playerHp,
    ended,
  ]);

  function addLog(text) {
    setBattleLog((old) => [
      ...old,
      text,
    ]);
  }

  function showDamage(
    value,
    target
  ) {
    setDamageNumber(value);
    setDamageTarget(target);

    setTimeout(() => {
      setDamageNumber(null);
      setDamageTarget(null);
    }, 900);
  }

  function fightRound() {
    if (ended) return;

    if (player.energy < 10) {
      setResult(
        "⚡ Brak energii"
      );

      setEnded(true);

      return;
    }

    if (turn === "player") {
      playerTurn();
    } else {
      enemyTurn();
    }
  }

  function playerTurn() {
    let currentEnemyHp =
      enemyHp;

    const critChance =
      5 +
      finalStats.inteligencja *
        0.15;

    const crit =
      Math.random() * 100 <
      critChance;

    let playerDamage =
      finalStats.sila * 10 +
      Math.floor(
        Math.random() * 10
      );

    if (crit) {
      playerDamage =
        Math.floor(
          playerDamage * 1.8
        );

      addLog(
        `🔥 KRYTYK! ${playerDamage}`
      );
    }

    setPlayerAttackAnim(true);

    setTimeout(() => {
      setPlayerAttackAnim(false);
    }, 250);

    setEnemyHitAnim(true);

    setTimeout(() => {
      setEnemyHitAnim(false);
    }, 250);

    showDamage(
      playerDamage,
      "enemy"
    );

    currentEnemyHp -=
      playerDamage;

    addLog(
      `${player.className} trafia za ${playerDamage}`
    );

    if (currentEnemyHp <= 0) {
      setEnemyHp(0);

      winFight();

      return;
    }

    setEnemyHp(currentEnemyHp);

    setTurn("enemy");
  }

  function enemyTurn() {
    let currentPlayerHp =
      playerHp;

    const dodgeChance =
      3 +
      finalStats.inteligencja *
        0.1;

    const dodge =
      Math.random() * 100 <
      dodgeChance;

    if (dodge) {
      addLog("💨 UNIK!");

      setTurn("player");

      return;
    }

    const enemyDamage =
      Math.floor(
        Math.random() *
          (enemy.maxDamage -
            enemy.minDamage +
            1)
      ) + enemy.minDamage;

    setEnemyAttackAnim(true);

    setTimeout(() => {
      setEnemyAttackAnim(false);
    }, 250);

    setPlayerHitAnim(true);

    setTimeout(() => {
      setPlayerHitAnim(false);
    }, 250);

    showDamage(
      enemyDamage,
      "player"
    );

    currentPlayerHp -=
      enemyDamage;

    addLog(
      `${enemy.name} trafia za ${enemyDamage}`
    );

    if (currentPlayerHp <= 0) {
      setPlayerHp(0);

      loseFight();

      return;
    }

    setPlayerHp(currentPlayerHp);

    setTurn("player");
  }

  function winFight() {
    let inventory = [
      ...player.inventory,
    ];

    let dropText = "";

    const dropRoll =
      Math.random() * 100;

    if (dropRoll <= 25) {
      if (
        !inventory.includes(2)
      ) {
        inventory.push(2);

        dropText =
          "🎁 Zdobyto: Ciupaga Turysty";
      }
    }

    let updated = {
      ...player,

      completedRegions:
        player.completedRegions,

      reputation: {
        ...player.reputation,
      },

      energy:
        player.energy - 10,

      inventory,

      xp:
        player.xp + enemy.xp,

      money:
        player.money +
        enemy.money,

      defeatedEnemies: [
        ...new Set([
          ...player.defeatedEnemies,
          enemy.id,
        ]),
      ],
    };

    while (
      updated.xp >=
      updated.xpNeeded
    ) {
      updated.xp -=
        updated.xpNeeded;

      updated.level += 1;

      updated.freePoints += 3;

      updated.xpNeeded =
        Math.floor(
          updated.xpNeeded * 1.5
        );
    }

    if (enemy.id === 10) {
      updated.completedRegions =
        [
          ...new Set([
            ...player.completedRegions,
            "podhale",
          ]),
        ];

      updated.reputation = {
        ...updated.reputation,

        podhale:
          updated.reputation
            .podhale + 100,
      };

      updated.money += 5000;

      addLog(
        "👑 Ukończono Podhale!"
      );
    }

    updatePlayer(updated);

    if (dropText) {
      addLog(dropText);
    }

    setResult(
      "🏆 ZWYCIĘSTWO"
    );

    setEnded(true);
  }

  function loseFight() {
    const updated = {
      ...player,

      energy:
        player.energy - 10,

      xp: player.xp + 15,

      money: Math.max(
        0,
        player.money - 20
      ),
    };

    updatePlayer(updated);

    setResult(
      "💀 PORAŻKA"
    );

    setEnded(true);
  }

  return (
    <div className="page">
      <h1>Walka</h1>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-around",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {/* GRACZ */}

        <div
          style={{
            position: "relative",
          }}
        >
          {damageNumber &&
            damageTarget ===
              "player" && (
              <div
                className="damageText"
              >
                {damageNumber}
              </div>
            )}

          <div
            style={{
              width: "220px",
              height: "280px",
              background: "#222",
              borderRadius: "20px",
              padding: "15px",
              animation:
                playerAttackAnim
                  ? "attackJump .25s"
                  : playerHitAnim
                  ? "enemyHit .25s"
                  : "none",
            }}
          >
            <h3>
              {player.className}
            </h3>

            <HealthBar
              current={playerHp}
              max={maxPlayerHp}
            />
          </div>
        </div>

        {/* PRZECIWNIK */}

        <div
          style={{
            position: "relative",
          }}
        >
          {damageNumber &&
            damageTarget ===
              "enemy" && (
              <div
                className="damageText"
              >
                {damageNumber}
              </div>
            )}

          <div
            style={{
              width: "260px",
              minHeight: "420px",
              background: "#331111",
              borderRadius: "20px",
              padding: "15px",
              animation:
                enemyHitAnim
                  ? "enemyHit .25s"
                  : enemyAttackAnim
                  ? "attackJump .25s"
                  : "floatEnemy 2s infinite",
            }}
          >
            <img
              src={
                enemyImages[
                  enemy.id
                ]
              }
              alt={enemy.name}
              style={{
                width: "100%",
                height: "240px",
                objectFit:
                  "contain",
                marginBottom:
                  "10px",
              }}
            />

            <h3>
              {enemy.name}
            </h3>

            <HealthBar
              current={enemyHp}
              max={maxEnemyHp}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          width: "600px",
          maxWidth: "100%",
          height: "250px",
          overflowY: "auto",
          border:
            "1px solid #444",
          padding: "10px",
          margin: "20px auto",
          textAlign: "left",
        }}
      >
        {battleLog.map(
          (entry, index) => (
            <div key={index}>
              {entry}
            </div>
          )
        )}
      </div>

      {ended && (
        <>
          <h2>{result}</h2>

          <button
            onClick={back}
          >
            Powrót
          </button>
        </>
      )}
    </div>
  );
}

export default Fight;