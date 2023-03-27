import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllProducts } from "../data/services.js";

const catalogTemplate = (products) => html`
  <h2>Products</h2>
  ${products.length === 0
    ? html`<h2>No products yet.</h2>`
    : html`<section id="dashboard">${products.map(productTemplate)}</section>`}
`;

const productTemplate = (product) => html`
  <div class="product">
    <img src="${product.imageUrl}" alt="${product.name}" />
    <p class="title">${product.name}</p>
    <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
    <a class="details-btn" href="/catalog/${product._id}">Details</a>
  </div>
`;

export async function catalogPage(ctx) {
  const products = await getAllProducts();
  ctx.render(catalogTemplate(products));
}
