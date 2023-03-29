import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { layoutTemplate } from "./views/layout.js";
import { getUserData } from "./utils.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./data/auth.js";
import { dashboardPage } from "./views/dashboard.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

const root = document.body;

page(decorateContext);
page("/index.html", "/");
page("/", homePage);
page("/dashboard", dashboardPage);
page("/dashboard/:id", detailsPage);
page("/dashboard/:id/edit", editPage);
page("/create", createPage);
page("/login", loginPage);
page("/register", registerPage);
page("/logout", logoutAction);

page.start();

function decorateContext(ctx, next) {
  ctx.render = renderView;
  next();
}

function renderView(content) {
  const userData = getUserData();
  render(layoutTemplate(userData, content), root);
}

function logoutAction(ctx) {
  logout();
  ctx.page.redirect("/");
}
