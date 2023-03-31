import { html } from "../../node_modules/lit-html/lit-html.js";
import { searchAlbum } from "../data/services.js";
import { getUserData } from "../utils.js";

const searchTemplate = (onSearch, userData, albums) => html`
  <section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Enter desired albums's name"
      />
      <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    ${albums !== undefined
      ? html`<div class="search-result">
          ${albums.length === 0
            ? html`<p class="no-result">No result.</p>`
            : albums.map((a) => albumTemplate(a, userData))}
        </div>`
      : null}
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
        <p class="date">Release Date:${album.releaseDate}</p>
      </div>
      ${userData
        ? html`<div class="btn-group">
            <a href="/catalog/${album._id}" id="details">Details</a>
          </div>`
        : null}
    </div>
  </div>
`;

export function searchPage(ctx) {
  const userData = getUserData();
  ctx.render(searchTemplate(onSearch, userData));

  async function onSearch(e) {
    const query = e.target.parentNode.querySelector("#search-input").value;
    if (query === "") {
      return alert("Write an album!");
    }

    const albums = await searchAlbum(query);
    ctx.render(searchTemplate(onSearch, userData, albums));
  }
}
