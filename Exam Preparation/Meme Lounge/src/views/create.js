import { html } from "../../node_modules/lit-html/lit-html.js";
import { createMeme } from "../data/services.js";
import { createSubmitHandler } from "../utils.js";
import { errorTemplate, handleError } from "./error.js";

const createTemplate = (onCreate, error) => html`
  ${error ? errorTemplate(error) : null}

  <section id="create-meme">
    <form @submit=${onCreate} id="create-form">
      <div class="container">
        <h1>Create Meme</h1>
        <label for="title">Title</label>
        <input id="title" type="text" placeholder="Enter Title" name="title" />
        <label for="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter Description"
          name="description"
        ></textarea>
        <label for="imageUrl">Meme Image</label>
        <input
          id="imageUrl"
          type="text"
          placeholder="Enter meme ImageUrl"
          name="imageUrl"
        />
        <input type="submit" class="registerbtn button" value="Create Meme" />
      </div>
    </form>
  </section>
`;

export async function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate(data) {
    try {
      if (Object.values(data).some((m) => m === "")) {
        throw Error("All fields are required!");
      }
      await createMeme(data);
      ctx.page.redirect("/memes");
    } catch (error) {
      ctx.render(createTemplate(createSubmitHandler(onCreate), error.message));

      handleError();
    }
  }
}
