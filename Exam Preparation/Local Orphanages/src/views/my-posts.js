import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyPosts } from "../data/services.js";
import { getUserData } from "../utils.js";

const myPostsTemplate = (posts) => html`
  <section id="my-posts-page">
    <h1 class="title">My Posts</h1>
    ${posts.length === 0
      ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>`
      : html`<div class="my-posts">${posts.map(postTemplate)}</div>`}
  </section>
`;

const postTemplate = (post) => html`
  <div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src="${post.imageUrl}" alt="${post.title}" />
    <div class="btn-wrapper">
      <a href="/details/${post._id}" class="details-btn btn">Details</a>
    </div>
  </div>
`;

export async function myPostsPage(ctx) {
  const userId = getUserData()?._id;
  const posts = await getMyPosts(userId);
  ctx.render(myPostsTemplate(posts));
}
