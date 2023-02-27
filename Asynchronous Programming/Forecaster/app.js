function attachEvents() {
  const location = document.querySelector("#location");
  const submitBtn = document.querySelector("#submit");
  const forecastDiv = document.querySelector("#forecast");
  const currentDiv = document.querySelector("#current");
  const upcomingDiv = document.querySelector("#upcoming");
  const conditions = {
    Sunny: "&#x2600", // ☀
    "Partly sunny": "&#x26C5", // ⛅
    Overcast: "&#x2601", // ☁
    Rain: "&#x2614", // ☂
  };

  submitBtn.addEventListener("click", handleSubmit);

  async function handleSubmit() {
    if (document.querySelector(".forecasts")) {
      document.querySelector(".forecasts").remove();
      document.querySelector(".forecast-info").remove();
    }

    try {
      const locationRes = await fetch(
        `http://localhost:3030/jsonstore/forecaster/locations`
      );

      if (!locationRes.ok) {
        throw new Error();
      }

      const locationData = await locationRes.json();
      forecastDiv.style.display = "block";

      const matchObj = locationData.find((loc) => loc.name === location.value);

      const todayRes = await fetch(
        `http://localhost:3030/jsonstore/forecaster/today/${matchObj.code}`
      );
      const todayData = await todayRes.json();

      const div1 = document.createElement("div");
      div1.className = "forecasts";
      div1.innerHTML = `
          <span class='condition symbol'>${
            conditions[todayData.forecast.condition]
          }</span>
          <span class='condition'>
            <span class='forecast-data'>${todayData.name}</span>
            <span class='forecast-data'>${todayData.forecast.low}&#176;/${
        todayData.forecast.high
      }&#176;</span>
            <span class='forecast-data'>${todayData.forecast.condition}</span>
          </span>
          `;

      currentDiv.appendChild(div1);

      const upcomingRes = await fetch(
        `http://localhost:3030/jsonstore/forecaster/upcoming/${matchObj.code}`
      );
      const upcomingData = await upcomingRes.json();

      const div2 = document.createElement("div");
      div2.className = "forecast-info";
      upcomingData.forecast.map((item) => {
        div2.innerHTML += `
            <span class='upcoming'>
            <span class='symbol'>${conditions[item.condition]}</span>
            <span class='forecast-data'>${item.low}&#176;/${
          item.high
        }&#176;</span>
            <span class='forecast-data'>${item.condition}</span>
          </span>`;
      });

      upcomingDiv.appendChild(div2);
    } catch (error) {
      forecastDiv.style.display = "block";
      forecastDiv.textContent = "Error";
    }
  }
}

attachEvents();
