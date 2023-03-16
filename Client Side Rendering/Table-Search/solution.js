import { html, render } from "./node_modules/lit-html/lit-html.js";

document.querySelector("#searchBtn").addEventListener("click", onClick);
window.addEventListener("load", loadData);

function onClick() {
  const rows = Array.from(document.querySelectorAll("tbody tr"));
  const searchInput = document.querySelector("#searchField");

  if (!searchInput.value) {
    alert("Write something");
  } else {
    rows.map((row) => {
      row.classList.remove("select");
      if (
        row.innerHTML.toLowerCase().includes(searchInput.value.toLowerCase())
      ) {
        row.classList.add("select");
      }
    });
    searchInput.value = "";
  }
}

async function loadData() {
  try {
    const res = await fetch("http://localhost:3030/jsonstore/advanced/table");
    if (!res.ok) {
      throw new Error();
    }
    const data = await res.json();
    renderRowTemplate(Object.values(data));
  } catch (error) {
    alert(error.message);
  }
}

const renderRowTemplate = (rows) => {
  const tbody = document.querySelector(".container tbody");
  render(rowTemplate(rows), tbody);
};

const rowTemplate = (rows) => html`
  ${rows.map(
    (row) =>
      html`<tr id=${row._id}>
        <td>${row.firstName} ${row.lastName}</td>
        <td>${row.email}</td>
        <td>${row.course}</td>
      </tr>`
  )}
`;
