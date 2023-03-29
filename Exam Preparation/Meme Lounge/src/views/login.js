import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../data/auth.js";
import { createSubmitHandler } from "../utils.js";
import { errorTemplate, handleError } from "./error.js";

const loginTemplate = (onLogin, error) => html`
  ${error ? errorTemplate(error) : null}

  <section id="login">
    <form @submit=${onLogin} id="login-form">
      <div class="container">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text" />
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          name="password"
        />
        <input type="submit" class="registerbtn button" value="Login" />
        <div class="container signin">
          <p>Dont have an account?<a href="/register">Sign up</a>.</p>
        </div>
      </div>
    </form>
  </section>
`;

export function loginPage(ctx) {
  ctx.render(loginTemplate(createSubmitHandler(onLogin)));

  async function onLogin({ email, password }, form) {
    try {
      if (!email || !password) {
        throw Error("All fields are required");
      }
      await login(email, password);
      form.reset();
      ctx.page.redirect("/memes");
    } catch (error) {
      ctx.render(
        loginTemplate(createSubmitHandler(onLogin), error.message)
      );

      handleError();
    }
  }
}
