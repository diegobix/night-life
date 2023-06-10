import api from "./api.js";

document.querySelector("#register-btn").addEventListener("click", async (e) => {
  e.preventDefault();
  const inputs = document.querySelector(".register").elements;
  const name = inputs["name"].value;
  const username = inputs["username"].value;
  const email = inputs["email"].value;
  const password = inputs["password"].value;

  try {
    await api.register(name, username, email, password);
    alert("Registro completado. Por favor, ingrese con su cuenta.");
    window.location.href = "login.html";
  } catch (error) {
    alert(`Error al registrarse: ${error}`);
    location.reload();
  }
});
