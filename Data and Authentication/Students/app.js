const tbody = document.querySelector("#results tbody");
const submitBtn = document.querySelector("#submit");
const form = document.querySelector("#form");

form.addEventListener("submit", onSubmit);

window.addEventListener("load", onLoad);

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const facultyNumber = formData.get("facultyNumber");
  const grade = formData.get("grade");

  try {
    if ([...formData.values()].some((el) => el === "")) {
      throw new Error("Incorrect");
    }
    const res = await fetch(
      "http://localhost:3030/jsonstore/collections/students",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          facultyNumber,
          grade,
        }),
      }
    );
    if (!res.ok) {
      throw new Error();
    }
    onLoad();
    form.reset();
  } catch (error) {
    alert(error.message);
  }
}

async function onLoad() {
  tbody.replaceChildren();
  try {
    const res = await fetch(
      "http://localhost:3030/jsonstore/collections/students"
    );
    if (!res.ok) {
      throw new Error();
    }
    const data = await res.json();
    Object.values(data).forEach((el) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${el.firstName}</td>
        <td>${el.lastName}</td>
        <td>${el.facultyNumber}</td>
        <td>${Number(el.grade).toFixed(2)}</td>
        `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    alert(error.message);
  }
}
