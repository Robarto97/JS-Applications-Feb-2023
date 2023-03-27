import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  buyProduct,
  deleteProduct,
  getBoughtCountProductId,
  getMyBoughtCountProductId,
  getProductById,
} from "../data/services.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (
  product,
  isOwner,
  onDelete,
  boughts,
  showBuyButton,
  onBuy
) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${product.imageUrl}" alt="${product.name}" />
      <p id="details-title">${product.name}</p>
      <p id="details-category">
        Category: <span id="categories">${product.category}</span>
      </p>
      <p id="details-price">
        Price: <span id="price-number">${product.price}</span>$
      </p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Bought: <span id="buys">${boughts}</span> times.</h4>
          <span>${product.description}</span>
        </div>
      </div>

      <div id="action-buttons">
        ${actionButtonsTemplate(product, isOwner, onDelete)}
        ${buyActionTemplate(showBuyButton, onBuy)}
      </div>
    </div>
  </section>
`;

const actionButtonsTemplate = (product, isOwner, onDelete) => {
  if (isOwner) {
    return html`<a href="/catalog/${product._id}/edit" id="edit-btn">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
        >Delete</a
      >`;
  }
  return null;
};

const buyActionTemplate = (showBuyButton, onBuy) => {
  if (showBuyButton) {
    return html`<a @click=${onBuy} href="javascript:void(0)" id="buy-btn"
      >Buy</a
    >`;
  }
  return null;
};

export async function detailsPage(ctx) {
  const productId = ctx.params.id;
  const product = await getProductById(productId);
  const userId = getUserData()?._id;
  const isOwner = product._ownerId === userId;

  const boughts = await getBoughtCountProductId(productId);
  const myBoughts =
    userId && (await getMyBoughtCountProductId(productId, userId));
  const showBuyButton = !isOwner && !myBoughts && userId;

  ctx.render(
    detailsTemplate(product, isOwner, onDelete, boughts, showBuyButton, onBuy)
  );

  async function onDelete() {
    const confirmed = confirm("Are you sure you want to delete this?");
    if (confirmed) {
      await deleteProduct(productId);
      ctx.page.redirect("/catalog");
    }
  }

  async function onBuy() {
    await buyProduct(productId);
    ctx.page.redirect(`/catalog/${productId}`);
  }
}
