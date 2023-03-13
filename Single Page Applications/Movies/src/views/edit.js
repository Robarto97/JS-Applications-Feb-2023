import { showView } from "../util.js";
import { detailsPage } from "./details.js";

const section = document.querySelector("#edit-movie");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);
let movieId = null;

export async function editPage(id) {
  showView(section);
  movieId = id;
  const movie = await getMovie(movieId);
  console.log(movie);
  form.querySelector('#title').value = movie.title;
  form.querySelector('textarea.form-control').value = movie.description;
  form.querySelector('#imageUrl').value = movie.img;
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);

  const title = formData.get("title");
  const description = formData.get("description");
  const img = formData.get("img");

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await fetch(`http://localhost:3030/data/movies/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": user.accessToken,
      },
      body: JSON.stringify({
        title,
        description,
        img,
      }),
    });
    if (!res.ok) {
      throw new Error();
    }
    form.reset();
    detailsPage(movieId);
  } catch (error) {
    alert(error.message);
  }
}

async function getMovie(id){
  const res = await fetch(`http://localhost:3030/data/movies/${id}`);

  const movie = await res.json();
  return movie;
}