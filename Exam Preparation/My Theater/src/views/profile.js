import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyTheaters } from "../data/services.js";
import { getUserData } from "../utils.js";

const profileTemplate = (email, myTheaters) => html`
  <section id="profilePage">
    <div class="userInfo">
      <div class="avatar">
        <img src="./images/profilePic.png" />
      </div>
      <h2>${email}</h2>
    </div>
    <div class="board">
      <!--If there are event-->
      ${myTheaters.length === 0
        ? html`<div class="no-events">
            <p>This user has no events yet!</p>
          </div>`
        : html`<div class="eventBoard">
            ${myTheaters.map(theaterTemplate)}
          </div>`}
    </div>
  </section>
`;

const theaterTemplate = (theater) => html`
  <div class="event-info">
    <img src="${theater.imageUrl}" />
    <h2>${theater.title}</h2>
    <h6>${theater.date}</h6>
    <a href="/details/${theater._id}" class="details-button">Details</a>
  </div>
`;

export async function profilePage(ctx) {
  const userData = getUserData();
  const myTheaters = await getMyTheaters(userData._id);
  ctx.render(profileTemplate(userData.email, myTheaters));
}
