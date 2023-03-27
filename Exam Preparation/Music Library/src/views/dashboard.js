import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllAlbums } from "../data/services.js";

const dashboardTemplate = (albums) => html`
  <section id="dashboard">
    <h2>Albums</h2>
    
      ${albums.length === 0
        ? html`<h2>There are no albums added yet.</h2>`
        : html`<ul class="card-wrapper">${albums.map(albumTemplate)}</ul>`}
  </section>
`;

const albumTemplate = (album) => html`
  <li class="card">
    <img src="${album.imageUrl}" alt="${album.singer}" />
    <p><strong>Singer/Band: </strong><span class="singer">${album.singer}</span></p>
    <p><strong>Album name: </strong><span class="album">${album.album}</span></p>
    <p>
      <strong>Sales:</strong
      ><span class="sales">${album.sales}</span>
    </p>
    <a class="details-btn" href="/dashboard/${album._id}">Details</a>
  </li>
`;

export async function dashboardPage(ctx) {
  const albums = await getAllAlbums();
  ctx.render(dashboardTemplate(albums));
}
