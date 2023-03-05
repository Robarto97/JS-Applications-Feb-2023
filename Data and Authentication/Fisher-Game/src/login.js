const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", userLogin);
document.querySelector("#user").style.display = "none";

async function userLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch("http://localhost:3030/users/login", 
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const data = await res.json();
    const userData = {
      email: data.email,
      id: data._id,
      token: data.accessToken,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    window.location = "./index.html";
  } catch (error) {
    loginForm.reset();
    alert(error.message);
  }
}
