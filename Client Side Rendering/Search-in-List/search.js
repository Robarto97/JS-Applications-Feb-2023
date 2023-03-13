import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const cardTemplate = (towns) => html`
  <ul>
    ${towns.map((town) => html`<li id=${town}>${town}</li>`)}
  </ul>
`;

const renderTownComponent = (towns) => {
  cardTemplate(towns);
  const rootElement = document.querySelector("#towns");
  render(cardTemplate(towns), rootElement);
};

renderTownComponent(towns);

document.querySelector('button').addEventListener('click', search)

const searchTown = (towns,text) => {
   return towns.filter(town => {
      if(town.includes(text)){
         const match = document.getElementById(`${town}`)
         match.setAttribute('class', 'active')
         return town
      }
   })
}

function search() {

  let text = document.querySelector('#searchText').value
  const result = searchTown(towns, text)
  const resultHTML = document.querySelector('#result')
  resultHTML.textContent = `${result.length} matches found`
//   text = ''
}

