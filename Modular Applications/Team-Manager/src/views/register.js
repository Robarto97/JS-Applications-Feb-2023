import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/data.js";

const registerTemplate = (onSubmit, errorMessage) => html`
  <section id="register">
    <article class="narrow">
      <header class="pad-med">
        <h1>Register</h1>
      </header>
      <form @submit=${onSubmit} id="register-form" class="main-form pad-large">
        ${errorMessage && html`<div class="error">${errorMessage}</div>`}
        <label>E-mail: <input type="text" name="email" /></label>
        <label>Username: <input type="text" name="username" /></label>
        <label>Password: <input type="password" name="password" /></label>
        <label>Repeat: <input type="password" name="repass" /></label>
        <input class="action cta" type="submit" value="Create Account" />
      </form>
      <footer class="pad-small">
        Already have an account? <a href="/login" class="invert">Sign in here</a>
      </footer>
    </article>
  </section>
`;


export async function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit))

    async function onSubmit(e){
        e.preventDefault()
        const {email, username, password, repass} = e.target.elements

        if(!email.value || !username.value || !password.value){
            return ctx.render(registerTemplate(onSubmit, 'All fields are required!'));
        }
        if(password.value !== repass.value){
            return ctx.render(registerTemplate(onSubmit, 'Passwords don\'t match!'));
        }

        try {
            await register(email.value, username.value, password.value)
            ctx.setUserNav();
            ctx.page.redirect('/my-teams')
        } catch (error) {
          return ctx.render(registerTemplate(onSubmit, error.message));
        }
    }
}