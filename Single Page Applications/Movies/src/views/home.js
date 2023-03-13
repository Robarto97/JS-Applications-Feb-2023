import { showView, spinner } from "../util.js";
import { detailsPage } from "./details.js";

const section = document.querySelector("#home-page");
const catalog = section.querySelector("#movies-list");
catalog.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.preventDefault()
    const id = e.target.dataset.id;
    detailsPage(id)
  }
});

export function homePage() {
  showView(section);
  displayMovies();
}

async function displayMovies() {
  catalog.replaceChildren(spinner());
  const movies = await getMovies();
  catalog.replaceChildren(...movies.map(createMoviePreview));
}

function createMoviePreview(movie) {
  const element = document.createElement("div");
  element.className = "card mb-4";
  element.innerHTML = `
    <img class="card-img-top" src="${movie.img}"
      alt="Card image cap" width="400">
    <div class="card-body">
      <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
      <a href="/details/${movie._id}">
        <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
      </a>
    </div
    `;

  return element;
}

async function getMovies() {
  try {
    const res = await fetch("http://localhost:3030/data/movies");
    if (!res.ok) {
      throw new Error();
    }
    const data = await res.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
}
