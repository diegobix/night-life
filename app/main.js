const logout = (e) => {
  e.preventDefault();
  localStorage.removeItem("NightLifeUser");
  location.reload();
};

document.addEventListener("DOMContentLoaded", () => {
  const navText = document.querySelector(".nav-text");
  const user = JSON.parse(localStorage.getItem("NightLifeUser"));
  if (user) {
    console.log(user);
    navText.textContent = `Logged as ${user.username}`;
    const logBtn = document.querySelector("#login-btn");
    logBtn.textContent = "Logout";
    logBtn.addEventListener("click", logout);

    const misLocales = document.createElement("a");
    misLocales.href = "my-locals.html";
    misLocales.textContent = "Mis Locales";
    document.querySelector(".links").appendChild(misLocales);
  } else {
    navText.textContent = "Not logged in";
  }
});
