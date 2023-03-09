import { createIdea } from "../api/data.js";

const section = document.querySelector("#createView");
const form = section.querySelector("form");

form.addEventListener("submit", onSubmit);

let ctx = null;
export function showCreateView(context) {
  ctx = context;
  context.showSection(section);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const { title, description, imageURL } = Object.fromEntries(formData);
  await createIdea({title, description, img: imageURL})
  form.reset()
  ctx.goTo('/catalog')
}
