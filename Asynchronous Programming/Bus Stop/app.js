async function getInfo() {
  const stopId = document.querySelector("#stopId").value;
  const buses = document.querySelector("#buses");
  const stopName = document.querySelector("#stopName");
  buses.innerHTML = "";

  try {
    const response = await fetch(
      `http://localhost:3030/jsonstore/bus/businfo/${stopId}`
    );

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    stopName.textContent = data.name;
    for (const [key, time] of Object.entries(data.buses)) {
      const li = document.createElement("li");
      li.textContent = `Bus ${key} arrives in ${time} minutes`;
      buses.appendChild(li);
    }
  } catch (err) {
    stopName.textContent = "Error";
  }
}
