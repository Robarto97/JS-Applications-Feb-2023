const tbody = document.querySelector("table tbody");
const loadBtn = document.querySelector("#loadBooks");
const form = document.querySelector("form");

loadBtn.addEventListener("click", loadBooks);

form.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  const currBtn = e.target.querySelector("button");
  if (currBtn.textContent === "Submit") {
    addBook(e);
  } else if (currBtn.textContent === "Save") {
    updateBook(e);
  }
}

async function addBook(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const title = formData.get("title");
  const author = formData.get("author");

  try {
    if ([...formData.values()].some((el) => el === ""))
      throw new Error("Empty fields");

    const res = await fetch(
      "http://localhost:3030/jsonstore/collections/books",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title,
          author,
        }),
      }
    );
    if (!res.ok) {
      throw new Error();
    }
    loadBooks();
    form.reset();
  } catch (error) {
    alert(error.message);
  }
}

async function loadBooks() {
  tbody.replaceChildren();
  try {
    const res = await fetch(
      "http://localhost:3030/jsonstore/collections/books"
    );

    if (!res.ok) {
      throw new Error();
    }
    const data = await res.json();
    Object.values(data).forEach((b) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${b.title}</td>
            <td>${b.author}</td>
            <td>
                <button id='${b._id}'>Edit</button>
                <button id='${b._id}'>Delete</button>
            </td>
            `;
      tbody.appendChild(tr);
      const editBtn = tr.querySelectorAll("button")[0];
      const deleteBtn = tr.querySelectorAll("button")[1];
      editBtn.addEventListener("click", editBook);
      deleteBtn.addEventListener("click", deleteBook);
    });
  } catch (error) {
    alert(error.message);
  }
}

async function deleteBook(e) {
  const bookId = e.target.id;
  try {
    const res = await fetch(
      ` http://localhost:3030/jsonstore/collections/books/${bookId}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      throw new Error();
    }
    loadBooks();
  } catch (error) {}
}

async function editBook(e) {
  const parent = e.target.parentNode.parentNode;
  const h3 = (document.querySelector("form h3").textContent = "Edit FORM");

  const title = parent.querySelectorAll("td")[0].textContent;
  const author = parent.querySelectorAll("td")[1].textContent;
  document.querySelector("input[name=title]").value = title;
  document.querySelector("input[name=author]").value = author;
  document.querySelector("form button").textContent = "Save";
  document.querySelector("form").id = e.target.id;
}

async function updateBook(e) {
  e.preventDefault();
  const id = e.target.id;
  const formData = new FormData(e.target);
  const title = formData.get("title");
  const author = formData.get("author");

  e.target.querySelector("button").textContent = "Submit";
  e.target.querySelector("h3").textContent = "FORM";
  e.target.removeAttribute("id");

  try {
    if ([...formData.values()].some((el) => el === "")) {
      throw new Error("Empty fields");
    }
    const res = await fetch(
      `http://localhost:3030/jsonstore/collections/books/${id}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          title,
          author,
          _id: id,
        }),
      }
    );
    if (!res.ok) {
      throw new Error();
    }
    loadBooks();
    e.target.reset();
  } catch (error) {
    alert(error.message);
  }
}
