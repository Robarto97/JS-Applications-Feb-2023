import { html } from "../../node_modules/lit-html/lit-html.js";

export const errorTemplate = (error) => html`
  <section id="notifications">
    <div id="errorBox" class="notification">
      <span>${error}</span>
    </div>
  </section>
`;

export function handleError() {
  document.querySelector(".notification").style.display = "block";
  setTimeout(() => {
    document.querySelector(".notification").style.display = "none";
    clearTimeout();
  }, 3000);
}
