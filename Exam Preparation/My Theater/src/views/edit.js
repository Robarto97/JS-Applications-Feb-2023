import { html } from "../../node_modules/lit-html/lit-html.js";
import { editTheater, getTheaterById } from "../data/services.js";
import { createSubmitHandler } from "../utils.js";

const editTemplate = (theater, onEdit) => html`
  <section id="editPage">
    <form @submit=${onEdit} class="theater-form">
      <h1>Edit Theater</h1>
      <div>
        <label for="title">Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Theater name"
          .value=${theater.title}
        />
      </div>
      <div>
        <label for="date">Date:</label>
        <input
          id="date"
          name="date"
          type="text"
          placeholder="Month Day, Year"
          .value=${theater.date}
        />
      </div>
      <div>
        <label for="author">Author:</label>
        <input
          id="author"
          name="author"
          type="text"
          placeholder="Author"
          .value=${theater.author}
        />
      </div>
      <div>
        <label for="description">Theater Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          .value=${theater.description}
        ></textarea>
      </div>
      <div>
        <label for="imageUrl">Image url:</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          placeholder="Image Url"
          .value=${theater.imageUrl}
        />
      </div>
      <button class="btn" type="submit">Submit</button>
    </form>
  </section>
`;

export async function editPage(ctx) {
  const theaterId = ctx.params.id;
  const theater = await getTheaterById(theaterId);
  ctx.render(editTemplate(theater, createSubmitHandler(onEdit)));

  async function onEdit(data) {
    if (Object.values(data).some((t) => t === "")) {
      return alert("All fields are required!");
    }

    await editTheater(theaterId, data);
    ctx.page.redirect(`/details/${theaterId}`);
  }
}
