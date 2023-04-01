import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchFruit } from "../data/services.js";
import { createSubmitHandler } from "../utils.js";

const searchTemplate = (onSearch, fruits) => html`
  <section id="search">
    <div class="form">
      <h2>Search</h2>
      <form @submit=${onSearch} class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list">Search</button>
      </form>
    </div>
    <h4>Results:</h4>
    ${
      fruits !== undefined
        ? html`
            ${fruits.length === 0
              ? html`<p class="no-result">No result.</p>`
              : html`<div class="search-result">
                  ${fruits.map(fruitTemplate)}
                </div>`}
          `
        : null
    }
    </div>
  </section>
`;

const fruitTemplate = (fruit) => html`
  <div class="fruit">
    <img src="${fruit.imageUrl}" alt="${fruit.name}" />
    <h3 class="title">${fruit.name}</h3>
    <p class="description">${fruit.description}</p>
    <a class="details-btn" href="/catalog/${fruit._id}">More Info</a>
  </div>
`;

export function searchPage(ctx) {
  ctx.render(searchTemplate(createSubmitHandler(onSearch)));

  async function onSearch({ search }) {
    if (search === "") {
      return alert("Please enter a search term!");
    }

    const fruits = await searchFruit(search);
    ctx.render(searchTemplate(createSubmitHandler(onSearch), fruits));
  }
}
