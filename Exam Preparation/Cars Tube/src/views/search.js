import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchCar } from "../data/services.js";

const searchTemplate = (onSearch, cars) => html`
  <section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Enter desired production year"
      />
      <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    ${cars !== undefined
      ? html`<div class="listings">
          ${cars.length === 0
            ? html`<p class="no-cars">No results.</p>`
            : cars.map(carTemplate)}
          <!-- Display all records -->
        </div>`
      : null}
  </section>
`;

const carTemplate = (car) => html`
  <div class="listing">
    <div class="preview">
      <img src="${car.imageUrl}" />
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
      <div class="data-info">
        <h3>Year: ${car.year}</h3>
        <h3>Price: ${car.price} $</h3>
      </div>
      <div class="data-buttons">
        <a href="/catalog/${car._id}" class="button-carDetails">Details</a>
      </div>
    </div>
  </div>
`;

export function searchPage(ctx) {
  ctx.render(searchTemplate(onSearch));

  async function onSearch(e) {
    const query = e.target.parentNode.querySelector("#search-input").value;
    if (query === "") {
      return alert("Write something!");
    }

    const cars = await searchCar(query);
    ctx.render(searchTemplate(onSearch, cars));
  }
}
