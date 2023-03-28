import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchShoe } from "../data/services.js";
import { createSubmitHandler, getUserData } from "../utils.js";

const searchTemplate = (userData, onSearch, results) => html`
  <section id="search">
    <h2>Search by Brand</h2>

    <form @submit=${onSearch} class="search-wrapper cf">
      <input
        id="#search-input"
        type="text"
        name="search"
        placeholder="Search here..."
        required
      />
      <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>

    <div id="search-container">
      ${results
        ? html`
            ${results.length === 0
              ? html`<h2>There are no results found.</h2>`
              : html`<ul class="card-wrapper">
                  ${results.map((shoe) => searchResultTemplate(shoe, userData))}
                </ul>`}
          `
        : null}
    </div>
  </section>
`;

const searchResultTemplate = (shoe, userData) => html`
  <li class="card">
    <img src="${shoe.imageUrl}" alt="${shoe.brand}" />
    <p><strong>Brand: </strong><span class="brand">${shoe.brand}</span></p>
    <p><strong>Model: </strong><span class="model">${shoe.model}</span></p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    ${userData
      ? html`<a class="details-btn" href="/dashboard/${shoe._id}">Details</a>`
      : null}
  </li>
`;

export function searchPage(ctx) {
  const userData = getUserData();
  ctx.render(searchTemplate(userData, createSubmitHandler(onSearch)));

  async function onSearch({ search }) {
    if(search === ''){
        return alert('The field must be filled!')
    }
    const query = search;
    const results = await searchShoe(query);
    ctx.render(
      searchTemplate(userData, createSubmitHandler(onSearch), results)
    );
  }
}
