import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllPosts } from "../data/services.js";

const homeTemplate = (posts) => html`
  <section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    ${posts.length === 0
      ? html`<h1 class="title no-posts-title">No posts yet!</h1>`
      : html`<div class="all-posts">${posts.map(postTemplate)}</div>`}
    <!-- Display a div with information about every post (if any)-->
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

export async function homePage(ctx) {
  const posts = await getAllPosts();
  ctx.render(homeTemplate(posts));
}
