import { del } from "../api.js";
import page from "../node_modules/page/page.mjs";

export function onClick(e) {
  const confirmation = confirm("Are you sure you want to delete this?");

  if (confirmation) {
    del(`/data/catalog/${e.target.id}`);
    page.redirect("/");
  }
}
