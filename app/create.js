import api from "./api.js";

const storedUsr = localStorage.getItem("NightLifeUser");
if (!storedUsr || storedUsr === undefined) {
  alert("Debes iniciar sesión para crear locales.");
  window.location.href = "login.html";
}

document.querySelector(".create").addEventListener("submit", async (e) => {
  e.preventDefault();
  const storedUsr = localStorage.getItem("NightLifeUser");
  if (!storedUsr || storedUsr === undefined) return alert("No estas loggeado!");
  const token = JSON.parse(storedUsr).token;
  const formData = new FormData(e.target);
  const localData = {};
  formData.forEach((val, key) => (localData[key] = val));
  console.log(localData);
  try {
    const local = await api.createLocal(localData, token);
    window.location.href = "local.html?id=" + local.id;
  } catch (error) {
    console.error(error);
  }
});
