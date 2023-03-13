import { html, render } from "./node_modules/lit-html/lit-html.js";

document.querySelector("#btnLoadTowns").addEventListener("click", onClick);
const input = document.querySelector("#towns");

function onClick(e) {
  e.preventDefault();
  const data = input.value.split(", ");
  renderComponentTowns(data);
  input.value = ''
}

const renderComponentTowns = (data) =>
  render(cardTemplate(data), document.querySelector("#root"));

const cardTemplate = (data) => html`
  <ul>
    ${data.map((item) => html`<li>${item}</li>`)}
  </ul>
`;
