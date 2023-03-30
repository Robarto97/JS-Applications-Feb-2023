import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  createComment,
  deleteGame,
  getComments,
  getGameById,
} from "../data/services.js";
import { createSubmitHandler, getUserData } from "../utils.js";

const detailsTemplate = (
  game,
  isOwner,
  onDelete,
  comments,
  showForm,
  addComment
) => html`
  <section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src="${game.imageUrl}" />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
      </div>

      <p class="text">${game.summary}</p>

      <div class="details-comments">
        <h2>Comments:</h2>
        ${comments.length === 0
          ? html`<p class="no-comment">No comments.</p>`
          : html`<ul>
              ${comments.map(commentTemplate)}
            </ul>`}
      </div>

      ${isOwner
        ? html`<div class="buttons">
            <a href="/catalog/${game._id}/edit" class="button">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button"
              >Delete</a
            >
          </div>`
        : null}
    </div>
    ${showForm
      ? html`<article class="create-comment">
          <label>Add new comment:</label>
          <form @submit=${addComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment" />
          </form>
        </article>`
      : null}
  </section>
`;

const commentTemplate = (data) => html`
  <li class="comment">
    <p>Content: ${data.comment}</p>
  </li>
`;

export async function detailsPage(ctx) {
  const gameId = ctx.params.id;
  const game = await getGameById(gameId);
  const userId = getUserData()?._id;
  const isOwner = userId === game._ownerId;

  const comments = await getComments(gameId);
  const showForm = !isOwner && userId;

  ctx.render(
    detailsTemplate(
      game,
      isOwner,
      onDelete,
      comments,
      showForm,
      createSubmitHandler(addComment)
    )
  );

  async function addComment({ comment }, form) {
    if (comment === "") {
      return alert("Please enter a comment!");
    }
    form.reset();
    await createComment(gameId, comment);
    ctx.page.redirect(`/catalog/${gameId}`);
  }

  async function onDelete() {
    const choice = confirm(`Are you sure you want to delete this game?`);
    if (choice) {
      await deleteGame(gameId);
      ctx.page.redirect("/");
    }
  }
}
