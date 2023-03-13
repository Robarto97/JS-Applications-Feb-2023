// [x] improve html
// [x] create app.js module
// [x] create router.js
// [x] placeholder for all views
// implement views
// - create req logic
// - DOM manipulation logic

// [] catalog
// [] login
// [] register
// [] create
// [] details
// [] like
// [] edit
// [] delete

import { updateNav } from "./util.js";
import { createPage } from "./views/create.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";

const routes = {
  "/": homePage,
  "/login": loginPage,
  "/logout": logout,
  "/register": registerPage,
  "/create": createPage,
};

document.querySelector("nav").addEventListener("click", onNavigate);
document
  .querySelector("#add-movie-button a")
  .addEventListener("click", onNavigate);

function onNavigate(e) {
  if (e.target.tagName === "A" && e.target.href) {
    e.preventDefault();
    const url = new URL(e.target.href);
    const view = routes[url.pathname];
    if (typeof view === "function") {
      view();
    }
  }
}

function logout() {
  localStorage.removeItem("user");
  updateNav();
  loginPage();
}

updateNav();
homePage();
