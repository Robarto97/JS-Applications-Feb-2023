import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyTeams } from "../api/data.js";
import { teamTemplate } from "./common/team.js";

const myTeamsTemplate = (teams) => html`
  <section id="my-teams">
    <article class="pad-med">
      <h1>My Teams</h1>
    </article>

    <article class="layout narrow">
      ${teams.length == 0 ?
      html`<div class="pad-med">
        <p>You are not a member of any team yet.</p>
        <p>
          <a href="/browse">Browse all teams</a> to join one, or use the button
          bellow to cerate your own team.
        </p>
      </div>`: ''}
      <div class=""><a href="/create" class="action cta">Create Team</a></div>
    </article>

    ${teams.map(teamTemplate)}
  </section>
`;

export async function myTeamsPage(ctx) {
  const teams = await getMyTeams();

  ctx.render(myTeamsTemplate(teams));
}
