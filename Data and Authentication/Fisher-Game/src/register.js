const registerForm = document.querySelector("form");
document.querySelector("#user").style.display = "none";


registerForm.addEventListener("submit", onUserRegister);
const url = 'http://localhost:3030/users/register'
async function onUserRegister(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const { email, password, rePass } = Object.fromEntries(formData);
  try {
    if ([...formData.values()].some((el) => el === "")) {
      throw new Error("Incorrect");
    } else if( password !== rePass){
        throw new Error('The passwords are not equal')
    }
    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
            email,
            password,
            rePass
        })
    })

    if(!res.ok){
        const error = await res.json()
        throw new Error(error.message)
    }
    const data = await res.json()
    const user = {
        email:data.email,
        id:data._id,
        token: data.accessToken
    }
    localStorage.setItem('userData', JSON.stringify(user))
    registerForm.reset()
    window.location = './index.html'
  } catch (error) {
    registerForm.reset()
    alert(error.message)
  }
}
