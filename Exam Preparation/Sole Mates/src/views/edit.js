import { html } from "../../node_modules/lit-html/lit-html.js";
import { editShoe, getShoeById } from "../data/services.js";
import { createSubmitHandler } from "../utils.js";

const editTemplate = (shoe, onEdit) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit item</h2>
      <form @submit=${onEdit} class="edit-form">
        <input
          type="text"
          name="brand"
          id="shoe-brand"
          placeholder="Brand"
          .value=${shoe.brand}
        />
        <input
          type="text"
          name="model"
          id="shoe-model"
          placeholder="Model"
          .value=${shoe.model}
        />
        <input
          type="text"
          name="imageUrl"
          id="shoe-img"
          placeholder="Image url"
          .value=${shoe.imageUrl}
        />
        <input
          type="text"
          name="release"
          id="shoe-release"
          placeholder="Release date"
          .value=${shoe.release}
        />
        <input
          type="text"
          name="designer"
          id="shoe-designer"
          placeholder="Designer"
          .value=${shoe.designer}
        />
        <input
          type="text"
          name="value"
          id="shoe-value"
          placeholder="Value"
          .value=${shoe.value}
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx) {
  const shoeId = ctx.params.id;
  const shoe = await getShoeById(shoeId);
  ctx.render(editTemplate(shoe, createSubmitHandler(onEdit)));

  async function onEdit(data) {
    if (Object.values(data).some((s) => s === "")) {
      return alert("All fields are required!");
    }

    await editShoe(shoeId, data);
    ctx.page.redirect(`/dashboard/${shoeId}`);
  }
}
