import { html } from "../../node_modules/lit-html/lit-html.js";
import { createFruit } from "../data/services.js";
import { createSubmitHandler } from "../utils.js";

const createTemplate = (onCreate) => html`
  <section id="create">
    <div class="form">
      <h2>Add Fruit</h2>
      <form @submit=${onCreate} class="create-form">
        <input type="text" name="name" id="name" placeholder="Fruit Name" />
        <input
          type="text"
          name="imageUrl"
          id="Fruit-image"
          placeholder="Fruit Image"
        />
        <textarea
          id="fruit-description"
          name="description"
          placeholder="Description"
          rows="10"
          cols="50"
        ></textarea>
        <textarea
          id="fruit-nutrition"
          name="nutrition"
          placeholder="Nutrition"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add Fruit</button>
      </form>
    </div>
  </section>
`;

export async function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate(data) {
    if (Object.values(data).some((f) => f === "")) {
      return alert("All fields are required!");
    }

    await createFruit(data);
    ctx.page.redirect("/catalog");
  }
}
