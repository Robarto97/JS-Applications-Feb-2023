import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteAlbum,
  getAlbumById,
  addLike,
  getLikesForAlbum,
  getMyLikesForAlbum,
} from "../data/services.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (
  album,
  isOwner,
  onDelete,
  likes,
  showLikeButton,
  onLike
) => html`
  <section id="details">
    <div id="details-wrapper">
      <p id="details-title">Album Details</p>
      <div id="img-wrapper">
        <img src="${album.imageUrl}" alt="${album.singer}" />
      </div>
      <div id="info-wrapper">
        <p>
          <strong>Band:</strong><span id="details-singer">${album.singer}</span>
        </p>
        <p>
          <strong>Album name:</strong
          ><span id="details-album">${album.album}</span>
        </p>
        <p>
          <strong>Release date:</strong
          ><span id="details-release">${album.release}</span>
        </p>
        <p>
          <strong>Label:</strong><span id="details-label">${album.label}</span>
        </p>
        <p>
          <strong>Sales:</strong><span id="details-sales">${album.sales}</span>
        </p>
      </div>
      <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

      <div id="action-buttons">
        ${likeButtonTemplate(showLikeButton, onLike)}
        ${actionButtonsTemplate(album, isOwner, onDelete)}
      </div>
    </div>
  </section>
`;

const likeButtonTemplate = (showLikeButton, onLike) => {
  if (showLikeButton) {
    return html`<a @click=${onLike} href="javascript:void(0)" id="like-btn"
      >Like</a
    >`;
  }
  return null;
};

const actionButtonsTemplate = (album, isOwner, onDelete) => {
  if (isOwner) {
    return html`<a href="/dashboard/${album._id}/edit" id="edit-btn">Edit</a>
      <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
        >Delete</a
      >`;
  }
  return null;
};

export async function detailsPage(ctx) {
  const albumId = ctx.params.id;
  const album = await getAlbumById(albumId);
  const userId = getUserData()?._id;
  const isOwner = album._ownerId === userId;

  const likes = await getLikesForAlbum(albumId);
  const myLikes = userId && (await getMyLikesForAlbum(albumId, userId));
  const showLikeButton = !isOwner && !myLikes && userId;

  ctx.render(
    detailsTemplate(album, isOwner, onDelete, likes, showLikeButton, onLike)
  );

  async function onDelete() {
    const confirmed = confirm("Are you sure you want to delete this album?");
    if (confirmed) {
      await deleteAlbum(albumId);
      ctx.page.redirect("/dashboard");
    }
  }

  async function onLike() {
    await addLike(albumId);
    ctx.page.redirect(`/dashboard/${albumId}`);
  }
}
