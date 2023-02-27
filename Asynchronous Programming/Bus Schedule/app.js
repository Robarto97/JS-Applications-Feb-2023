function solve() {
  const info = document.querySelector(".info");
  const departBtn = document.querySelector("#depart");
  const arriveBtn = document.querySelector("#arrive");
  let nextStop = "depot";
  let stopName;

  async function depart() {
    try {
      const res = await fetch(
        `http://localhost:3030/jsonstore/bus/schedule/${nextStop}`
      );

      if (!res.ok) {
        throw new Error();
      }

      const data = await res.json();
      info.textContent = `Next stop ${data.name}`;
      departBtn.disabled = true;
      arriveBtn.disabled = false;
      stopName = data.name;
      nextStop = data.next;
    } catch (error) {
      info.textContent = "Error";
      departBtn.disabled = true;
      arriveBtn.disabled = true;
    }
  }

  function arrive() {
    info.textContent = `Arriving at ${stopName}`;
    departBtn.disabled = false;
    arriveBtn.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
