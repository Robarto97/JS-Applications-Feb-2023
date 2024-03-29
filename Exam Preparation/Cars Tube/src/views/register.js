import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../data/auth.js";
import { createSubmitHandler } from "../utils.js";

const registerTemplate = (onRegister) => html`
  <section id="register">
    <div class="container">
      <form @submit=${onRegister} id="register-form">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr />

        <p>Username</p>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />

        <p>Password</p>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />

        <p>Repeat Password</p>
        <input
          type="password"
          placeholder="Repeat Password"
          name="repeatPass"
          required
        />
        <hr />

        <input type="submit" class="registerbtn" value="Register" />
      </form>
      <div class="signin">
        <p>Already have an account? <a href="">Sign in</a>.</p>
      </div>
    </div>
  </section>
`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onRegister)));

  async function onRegister({ username, password, repeatPass: repass }, form) {
    if (!username || !password || !repass) {
      return alert("All fields are required");
    }
    if (password != repass) {
      return alert("Password must match");
    }

    await register(username, password);
    form.reset();
    ctx.page.redirect("/catalog");
  }
}
