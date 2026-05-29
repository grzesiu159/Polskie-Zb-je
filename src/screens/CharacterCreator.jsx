import { classes } from "../data/classes";

function CharacterCreator({ selectClass }) {
  return (
    <div className="page">
      <h1>Wybierz klasę</h1>

      {Object.values(classes).map((c) => (
        <button
          key={c.id}
          onClick={() => selectClass(c)}
          style={{
            margin: "10px",
            padding: "15px",
          }}
        >
          {c.name}
          <br />
          Siła {c.sila}
          <br />
          Inteligencja {c.inteligencja}
          <br />
          Wytrzymałość {c.wytrzymalosc}
        </button>
      ))}
    </div>
  );
}

export default CharacterCreator;