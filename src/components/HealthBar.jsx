function HealthBar({ current, max }) {
  const percent = (current / max) * 100;

  return (
    <div
      style={{
        width: "220px",
        height: "24px",
        background: "#333",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          background: "#27ae60",
          transition: "0.3s",
        }}
      />
    </div>
  );
}

export default HealthBar;