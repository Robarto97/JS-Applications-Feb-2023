import { html, render } from "./node_modules/lit-html/lit-html.js";

window.addEventListener("load", loadOptions);
document
  .querySelector('input[type="submit"]')
  .addEventListener("click", addItem);
const url = "http://localhost:3030/jsonstore/advanced/dropdown";

async function loadOptions() {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error();
    }
    const data = await res.json();
    renderOptionComponent(Object.values(data));
  } catch (error) {
    alert(error.message);
  }
}

const optionTemplate = (options) => html`
  ${options.map(
    (option) => html`<option value="${option._id}">${option.text}</option>`
  )}
`;

const renderOptionComponent = (options) => {
  const menu = document.querySelector("#menu");
  render(optionTemplate(options), menu);
};

async function addItem(e) {
  e.preventDefault();
  const itemText = document.querySelector("#itemText");
  try {
    if (!itemText.value) {
      throw new Error(`It's empty!`);
    }
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ text: itemText.value }),
    });
    if (!res.ok) {
      throw new Error();
    }
    loadOptions()
    itemText.value = ''

  } catch (error) {
    alert(error.message);
  }
}
