import { html } from "../../node_modules/lit-html/lit-html.js";

// TODO Replcae with actual layout
export const layoutTemplate = (userData, content) => html`
  <nav>
    <a href="/">Home</a>
    ${userData
      ? html`<a href="/logout">Logout</a>`
      : html`<a href="/register">Register</a> <a href="/login">Login</a>`}
  </nav>
  <main>
        ${content}
  </main>
`;
