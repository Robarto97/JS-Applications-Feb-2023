import { html } from "../../node_modules/lit-html/lit-html.js";
import { editAlbum, getAlbumById } from "../data/services.js";
import { createSubmitHandler } from "../utils.js";

const editTemplate = (album, onSubmit) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Album</h2>
      <form @submit=${onSubmit} class="edit-form">
        <input
          type="text"
          name="singer"
          id="album-singer"
          placeholder="Singer/Band"
          .value=${album.singer}
        />
        <input
          type="text"
          name="album"
          id="album-album"
          placeholder="Album"
          .value=${album.album}
        />
        <input
          type="text"
          name="imageUrl"
          id="album-img"
          placeholder="Image url"
          .value=${album.imageUrl}
        />
        <input
          type="text"
          name="release"
          id="album-release"
          placeholder="Release date"
          .value=${album.release}
        />
        <input
          type="text"
          name="label"
          id="album-label"
          placeholder="Label"
          .value=${album.label}
        />
        <input
          type="text"
          name="sales"
          id="album-sales"
          placeholder="Sales"
          .value=${album.sales}
        />

        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx) {
  const albumId = ctx.params.id;
  const album = await getAlbumById(albumId);
  ctx.render(editTemplate(album, createSubmitHandler(onSubmit)));

  async function onSubmit(data) {
    if (Object.values(data).some((a) => a === "")) {
      return alert("All fields are required!");
    }
    await editAlbum(albumId, data);
    ctx.page.redirect(`/dashboard/${albumId}`);
  }
}
