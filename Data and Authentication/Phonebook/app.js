function attachEvents() {
  const personInput = document.querySelector("#person");
  const phoneInput = document.querySelector("#phone");
  const phoneBook = document.querySelector("#phonebook");

  const loadBtn = document.querySelector("#btnLoad");
  const createBtn = document.querySelector("#btnCreate");

  const url = "http://localhost:3030/jsonstore/phonebook";

  loadBtn.addEventListener("click", loadData);
  createBtn.addEventListener("click", createContact);

  function loadData() {
    phoneBook.replaceChildren();
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        Object.values(data).forEach((el) => {
          const li = document.createElement("li");
          li.textContent = `${el.person}: ${el.phone}`;
          li.id = el._id;

          const delBtn = document.createElement("button");
          delBtn.textContent = "Delete";

          li.appendChild(delBtn);
          phoneBook.appendChild(li);

          delBtn.addEventListener("click", deleteContact);
        });
      })
      .catch((e) => alert(e.message));
  }

  function deleteContact(e) {
    const targetUrl = url + `/` + e.target.parentNode.id;
    fetch(targetUrl, {
      method: "DELETE",
    })

    loadData();
  }

  function createContact() {
    if (!phoneInput.value || !personInput.value) return;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        person: personInput.value,
        phone: phoneInput.value,
      }),
    }).catch((e) => alert(e.message));

    loadBtn.click()
    personInput.value = "";
    phoneInput.value = "";
  }
}

attachEvents();
