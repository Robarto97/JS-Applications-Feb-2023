import { html } from "../../node_modules/lit-html/lit-html.js";
import { getTeams } from "../api/data.js";
import { teamTemplate } from "./common/team.js";

const browseTemplate = (teams, userId) => html`
  <section id="browse">
    <article class="pad-med">
      <h1>Team Browser</h1>
    </article>

    ${userId &&
    html`<article class="layout narrow">
      <div class="pad-small">
        <a href="/create" class="action cta">Create Team</a>
      </div>
    </article>`}
    ${teams.map(teamTemplate)}
  </section>
`;

export async function browsePage(ctx) {
  const userId = sessionStorage.getItem("userId");
  const teams = await getTeams();

  ctx.render(browseTemplate(teams, userId));
}
