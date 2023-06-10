import data from "./api.js";

const getId = () => {
  const qs = window.location.search;
  const params = new URLSearchParams(qs);

  return params.get("id");
};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    const local = await data.getLocal(getId());
    console.log(local);
    pintarLocal(local);
    checkIfOwned(local);
  } catch (error) {
    console.error(error);
    alert("No existe el local solicitado.");
    window.location.href = "index.html";
  }
};

const checkIfOwned = (local) => {
  const savedUser = localStorage.getItem("NightLifeUser");
  if (!savedUser || savedUser === undefined) return;
  const myUser = JSON.parse(savedUser);
  if (local.user.username !== myUser.username) return;

  const del = document.createElement("button");
  del.textContent = "Eliminar";
  del.addEventListener("click", () => {
    try {
      data.deleteLocal(local.id, myUser.token);
      alert("El local ha sido eliminado.");
    } catch (error) {
      alert(error);
    }
    window.location.href = "my-locals.html";
  });

  const parent = document.querySelector(".local");
  parent.insertBefore(del, parent.children[1]);
};

const pintarLocal = (loc) => {
  const local = document.querySelector(".local");
  local.querySelector("h2").textContent = loc.nombre;
  local.querySelector("#dir").textContent = loc.direccion;
  local.querySelector("#hor").textContent = loc.horario;
  local.querySelector("a").textContent = loc.url;
  local.querySelector("#precio").textContent = loc.consumicion;
  local.querySelector("#musica").textContent = loc.musica;
  local.querySelector("#nombre").textContent = loc.user.username;
  local.querySelector("#email").textContent = loc.user.email;
};
