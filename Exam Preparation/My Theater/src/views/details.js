import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  addLike,
  deleteTheater,
  getMyTotalLikes,
  getTheaterById,
  getTotalLikes,
} from "../data/services.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (
  theater,
  isOwner,
  onDelete,
  likes,
  showLikeButton,
  onLike
) => html`
  <section id="detailsPage">
    <div id="detailsBox">
      <div class="detailsInfo">
        <h1>Title: ${theater.title}</h1>
        <div>
          <img src="${theater.imageUrl}" />
        </div>
      </div>

      <div class="details">
        <h3>Theater Description</h3>
        <p>${theater.description}</p>
        <h4>Date: ${theater.date}</h4>
        <h4>Author: ${theater.author}</h4>
        <div class="buttons">
          ${isOwner
            ? html`<a
                  @click=${onDelete}
                  class="btn-delete"
                  href="javascript:void(0)"
                  >Delete</a
                >
                <a class="btn-edit" href="/details/${theater._id}/edit"
                  >Edit</a
                >`
            : null}
          ${showLikeButton
            ? html`<a
                @click=${onLike}
                class="btn-like"
                href="javascript:void(0)"
                >Like</a
              >`
            : null}
        </div>
        <p class="likes">Likes: ${likes}</p>
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const theaterId = ctx.params.id;
  const theater = await getTheaterById(theaterId);
  const userId = getUserData()?._id;
  const isOwner = userId === theater._ownerId;

  const likes = await getTotalLikes(theaterId);
  const myLikes = userId && (await getMyTotalLikes(theaterId, userId));
  const showLikeButton = !isOwner && !myLikes && userId;

  ctx.render(
    detailsTemplate(theater, isOwner, onDelete, likes, showLikeButton, onLike)
  );

  async function onLike() {
    await addLike(theaterId);
    ctx.page.redirect(`/details/${theaterId}`);
  }

  async function onDelete() {
    const choice = confirm(`Are you sure you want to delete this?`);
    if (choice) {
      await deleteTheater(theaterId);
      ctx.page.redirect("/profile");
    }
  }
}
