async function solution() {
  const main = document.querySelector("#main");
  main.innerHTML = "";

  const res = await fetch(
    "http://localhost:3030/jsonstore/advanced/articles/list"
  );
  if (!res.ok) throw new Error();
  const data = await res.json();
  // console.log(data);
  Object.values(data).forEach((item) => {
    // console.log(item)
    const div = document.createElement("div");
    div.className = "accordion";
    div.innerHTML = `
        <div class="head">
            <span>${item.title}</span>
            <button class="button" id=${item._id}>More</button>
        </div>
        <div class="extra">
        </div>
        `;
    main.appendChild(div);
    const button = div.querySelector(".button");
    button.addEventListener("click", handleMore);
    const extra = div.querySelector(".extra");

    async function handleMore(e) {
      const res = await fetch(
        `http://localhost:3030/jsonstore/advanced/articles/details/${e.target.id}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      extra.innerHTML = "";
      const p = document.createElement("p");
      p.textContent = data.content;
      extra.appendChild(p);
      if (button.textContent === "More") {
        button.textContent = "Less";
        extra.style.display = "block";
      } else {
        button.textContent = "More";
        extra.style.display = "none";
      }
    }
  });
}

solution();
