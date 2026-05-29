function Intro({ start }) {
  return (
    <div className="page">
      <h1>Polskie Zbóje</h1>

      <p>
        Polska pogrążona jest w chaosie.
        Regionami rządzą lokalne ekipy i osiedlowi królowie.
      </p>

      <button onClick={start}>Rozpocznij</button>
    </div>
  );
}

export default Intro;