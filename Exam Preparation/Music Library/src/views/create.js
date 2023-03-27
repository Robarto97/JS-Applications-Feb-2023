import { html } from "../../node_modules/lit-html/lit-html.js";
import { createAlbum } from "../data/services.js";
import { createSubmitHandler } from "../utils.js";

const createTemplate = (onCreate) => html`
  <section id="create">
    <div class="form">
      <h2>Add Album</h2>
      <form @submit=${onCreate} class="create-form">
        <input
          type="text"
          name="singer"
          id="album-singer"
          placeholder="Singer/Band"
        />
        <input type="text" name="album" id="album-album" placeholder="Album" />
        <input
          type="text"
          name="imageUrl"
          id="album-img"
          placeholder="Image url"
        />
        <input
          type="text"
          name="release"
          id="album-release"
          placeholder="Release date"
        />
        <input type="text" name="label" id="album-label" placeholder="Label" />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate(data) {
    if (Object.values(data).some((a) => a == "")) {
      return alert("All fields are required!");
    }
    await createAlbum(data);
    ctx.page.redirect("/dashboard");
  }
}
