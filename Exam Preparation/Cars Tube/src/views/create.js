import { html } from "../../node_modules/lit-html/lit-html.js";
import { createCar } from "../data/services.js";
import { createSubmitHandler } from "../utils.js";

const createTemplate = (onCreate) => html`
  <section id="create-listing">
    <div class="container">
      <form @submit=${onCreate} id="create-form">
        <h1>Create Car Listing</h1>
        <p>Please fill in this form to create an listing.</p>
        <hr />

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" />

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" />

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" />

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" />

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" />

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" />

        <hr />
        <input type="submit" class="registerbtn" value="Create Listing" />
      </form>
    </div>
  </section>
`;

export function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate({
    brand,
    model,
    description,
    year,
    imageUrl,
    price,
  }) {
    if (
      [...brand, model, description, year, imageUrl, price].some(
        (c) => c === ""
      )
    ) {
      return alert("All fields are required!");
    }
    if (price <= 0 || year <= 0) {
      return alert("Price or year must be positive number!");
    }

    year = Number(year);
    price = Number(price);

    await createCar({
      brand,
      model,
      description,
      year,
      imageUrl,
      price,
    });
    ctx.page.redirect("/catalog");
  }
}
