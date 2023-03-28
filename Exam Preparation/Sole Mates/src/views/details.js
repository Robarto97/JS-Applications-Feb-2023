import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteShoe, getShoeById } from "../data/services.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (shoe, isOwner, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <p id="details-title">Shoe Details</p>
      <div id="img-wrapper">
        <img src="${shoe.imageUrl}" alt="${shoe.brand}" />
      </div>
      <div id="info-wrapper">
        <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
        <p>Model: <span id="details-model">${shoe.model}</span></p>
        <p>Release date: <span id="details-release">${shoe.release}</span></p>
        <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
        <p>Value: <span id="details-value">${shoe.value}</span></p>
      </div>
      ${isOwner
        ? html`<div id="action-buttons">
            <a href="/dashboard/${shoe._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
              >Delete</a
            >
          </div>`
        : null}
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const shoeId = ctx.params.id;
  const shoe = await getShoeById(shoeId);
  const userId = getUserData()?._id;
  const isOwner = userId === shoe._ownerId;
  ctx.render(detailsTemplate(shoe, isOwner, onDelete));

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this?");
    if (choice) {
      await deleteShoe(shoeId);
      ctx.page.redirect("/dashboard");
    }
  }
}
