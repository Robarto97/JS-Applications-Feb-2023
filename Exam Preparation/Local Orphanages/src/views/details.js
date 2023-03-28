import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deletePost,
  getDonationsForPost,
  getMyDonationsForPost,
  getPostById,
  makeDonation,
} from "../data/services.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (
  post,
  isOwner,
  onDelete,
  donations,
  showDonateButton,
  onDonate
) => html`
  <section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
      <div id="details">
        <div class="image-wrapper">
          <img src="${post.imageUrl}" alt="${post.title}" class="post-image" />
        </div>
        <div class="info">
          <h2 class="title post-title">${post.title}</h2>
          <p class="post-description">Description: ${post.description}</p>
          <p class="post-address">Address: ${post.address}</p>
          <p class="post-number">Phone number: ${post.phone}</p>
          <p class="donate-Item">Donate Materials: ${donations}</p>

          <div class="btns">
            ${isOwner
              ? html`<a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                  <a
                    @click=${onDelete}
                    href="javascript:void(0)"
                    class="delete-btn btn"
                    >Delete</a
                  >`
              : null}
            ${showDonateButton
              ? html`<a
                  @click=${onDonate}
                  href="javascript:void(0)"
                  class="donate-btn btn"
                  >Donate</a
                >`
              : null}
          </div>
        </div>
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const postId = ctx.params.id;
  const post = await getPostById(postId);
  const userId = getUserData()?._id;
  const isOwner = userId == post._ownerId;

  const donations = await getDonationsForPost(postId);
  const myDonations = userId && (await getMyDonationsForPost(postId, userId));
  const showDonateButton = !isOwner && !myDonations && userId;

  ctx.render(
    detailsTemplate(
      post,
      isOwner,
      onDelete,
      donations,
      showDonateButton,
      onDonate
    )
  );

  async function onDonate() {
    await makeDonation(postId);
    ctx.page.redirect(`/details/${postId}`);
  }

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this?");
    if (choice) {
      await deletePost(postId);
      ctx.page.redirect("/");
    }
  }
}
