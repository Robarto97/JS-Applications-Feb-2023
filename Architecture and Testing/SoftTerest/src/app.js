import { logout } from "./api/user.js";
import { initializer } from "./router.js";
import { showCatalogView } from "./views/catalog.js";
import { showCreateView } from "./views/create.js";
import { showDetailsView } from "./views/details.js";
import { showHomeView } from "./views/home.js";
import { showLoginView } from "./views/login.js";
import { showRegisterView } from "./views/register.js";

document.querySelector("#defSection").remove();

async function logoutFunc() {
  await logout();
  router.goTo("/");
  router.updateNav();
}

const links = {
  "/": showHomeView,
  "/catalog": showCatalogView,
  "/login": showLoginView,
  "/register": showRegisterView,
  "/create": showCreateView,
  "/details": showDetailsView,
  "/logout": logoutFunc,
};

const router = initializer(links);
router.updateNav();
router.goTo("/");
