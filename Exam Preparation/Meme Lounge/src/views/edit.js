import { html } from "../../node_modules/lit-html/lit-html.js";
import { editMeme, getMemeById } from "../data/services.js";
import { createSubmitHandler } from "../utils.js";
import { errorTemplate, handleError } from "./error.js";

const editTemplate = (meme, onEdit, error) => html`
  ${error ? errorTemplate(error) : null}

  <section id="edit-meme">
    <form @submit=${onEdit} id="edit-form">
      <h1>Edit Meme</h1>
      <div class="container">
        <label for="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter Title"
          name="title"
          .value=${meme.title}
        />
        <label for="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter Description"
          name="description"
          .value=${meme.description}
        >
        </textarea>
        <label for="imageUrl">Image Url</label>
        <input
          id="imageUrl"
          type="text"
          placeholder="Enter Meme ImageUrl"
          name="imageUrl"
          .value=${meme.imageUrl}
        />
        <input type="submit" class="registerbtn button" value="Edit Meme" />
      </div>
    </form>
  </section>
`;

export async function editPage(ctx) {
  const memeId = ctx.params.id;
  const meme = await getMemeById(memeId);
  ctx.render(editTemplate(meme, createSubmitHandler(onEdit)));

  async function onEdit(data) {
    try {
      if (Object.values(data).some((m) => m === "")) {
        throw Error("All fields are required!");
      }

      await editMeme(memeId, data);
      ctx.page.redirect(`/memes/${memeId}`);
    } catch (error) {
      ctx.render(editTemplate(meme, createSubmitHandler(onEdit), error.message));

      handleError();
    }
  }
}
