import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAlbums } from "../data/services.js";
import { getUserData } from "../utils.js";

const catalogTemplate = (albums, userData) => html`
  <section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length === 0
      ? html`<p>No Albums in Catalog!</p>`
      : albums.map((a) => albumTemplate(a, userData))}
  </section>
`;
const albumTemplate = (album, userData) => html`
  <div class="card-box">
    <img src="${album.imgUrl}" />
    <div>
      <div class="text-center">
        <p class="name">Name: ${album.name}</p>
        <p class="artist">Artist: ${album.artist}</p>
        <p class="genre">Genre: ${album.genre}</p>
        <p class="price">Price: $${album.price}</p>
        <p class="date">Release Date: ${album.releaseDate}</p>
      </div>
      ${userData
        ? html`<div class="btn-group">
            <a href="/catalog/${album._id}" id="details">Details</a>
          </div>`
        : null}
    </div>
  </div>
`;
export async function catalogPage(ctx) {
  const albums = await getAlbums();
  const userData = getUserData();
  ctx.render(catalogTemplate(albums, userData));
}
