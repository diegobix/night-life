import data from "./api.js";

document
  .querySelector("#login-submit-btn")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const inputs = document.querySelector(".login").elements;
    const username = inputs["username"].value;
    const password = inputs["password"].value;
    inputs["password"].value = "";
    inputs["username"].value = "";
    try {
      const user = await data.login(username, password);
      localStorage.setItem("NightLifeUser", JSON.stringify(user));
      window.location.href = "index.html";
    } catch (error) {
      alert("Los datos no son correctos\n" + error);
    }
  });

document.querySelector("#go-to-reg-btn").addEventListener("click", () => {
  window.location.href = "register.html";
});
