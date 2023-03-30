import { html } from "../../node_modules/lit-html/lit-html.js";
import { editGame, getGameById } from "../data/services.js";
import { createSubmitHandler } from "../utils.js";

const editTemplate = (game, onEdit) => html`
  <section id="edit-page" class="auth">
    <form @submit=${onEdit} id="edit">
      <div class="container">
        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" .value=${game.title} />

        <label for="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          .value=${game.category}
        />

        <label for="levels">MaxLevel:</label>
        <input
          type="number"
          id="maxLevel"
          name="maxLevel"
          min="1"
          .value=${game.maxLevel}
        />

        <label for="game-img">Image:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          .value=${game.imageUrl}
        />

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary" .value=${game.summary}></textarea>
        <input class="btn submit" type="submit" value="Edit Game" />
      </div>
    </form>
  </section>
`;

export async function editPage(ctx) {
  const gameId = ctx.params.id;
  const game = await getGameById(gameId);
  ctx.render(editTemplate(game, createSubmitHandler(onEdit)));

  async function onEdit(data) {
    if (Object.values(data).some((g) => g === "")) {
      return alert("All fields are required!`");
    }

    await editGame(gameId, data);
    ctx.page.redirect(`/catalog/${gameId}`);
  }
}
