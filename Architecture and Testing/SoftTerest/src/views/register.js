import { register } from "../api/user.js";

const section = document.querySelector("#registerView");
const form = document.querySelector("form");
form.addEventListener("submit", onSubmit);
let ctx = null;

export function showRegisterView(context) {
  ctx = context;
  context.showSection(section);
}

async function onSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const { email, password, repeatPassword } = Object.fromEntries(formData);
  if (!email || !password || !repeatPassword) {
    alert("Empty fields");
    return;
  }
  if (email.length < 3) {
    alert("Email is too short");
    return;
  }
  if (password.length < 3) {
    alert("Password is too short");
    return;
  }

  if (password !== repeatPassword) {
    alert("Password do not match!");
  } else {
    await register(email, password);
    alert("Registration successful");
    form.reset();
    ctx.updateNav();
    ctx.goTo("/");
  }
}
