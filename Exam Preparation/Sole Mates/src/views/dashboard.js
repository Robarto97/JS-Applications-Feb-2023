import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllShoes } from "../data/services.js";

const dashboardTemplate = (shoes) => html`
  <section id="dashboard">
    <h2>Collectibles</h2>
    ${shoes.length === 0
      ? html`<h2>There are no items added yet.</h2>`
      : html`<ul class="card-wrapper">
          ${shoes.map(shoeTemplate)}
        </ul>`}
  </section>
`;

const shoeTemplate = (shoe) => html`
  <li class="card">
    <img src="${shoe.imageUrl}" alt="${shoe.brand}" />
    <p><strong>Brand: </strong><span class="brand">${shoe.brand}</span></p>
    <p>
      <strong>Model: </strong
      ><span class="model">${shoe.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
    <a class="details-btn" href="/dashboard/${shoe._id}">Details</a>
  </li>
`;

export async function dashboardPage(ctx) {
  const shoes = await getAllShoes();
  ctx.render(dashboardTemplate(shoes));
}
