import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteMeme, getMemeById } from "../data/services.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (meme, isOwner, onDelete) => html`
  <section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
      <div class="meme-img">
        <img alt="${meme.title}" src="${meme.imageUrl}" />
      </div>
      <div class="meme-description">
        <h2>Meme Description</h2>
        <p>${meme.description}</p>
        ${isOwner
          ? html`<a class="button warning" href="/memes/${meme._id}/edit"
                >Edit</a
              >
              <button @click=${onDelete} class="button danger">Delete</button>`
          : null}
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const memeId = ctx.params.id;
  const meme = await getMemeById(memeId);
  const userId = getUserData()?._id;
  const isOwner = userId === meme._ownerId;
  ctx.render(detailsTemplate(meme, isOwner, onDelete));

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this?");
    if (choice) {
      await deleteMeme(memeId);
      ctx.page.redirect("/memes");
    }
  }
}
