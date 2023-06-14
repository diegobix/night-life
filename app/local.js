import api from "./api.js";
import helper from "../utils/helper.js";

const getId = () => {
  const qs = window.location.search;
  const params = new URLSearchParams(qs);

  return params.get("id");
};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (isLogged()) displayReviewAdder();
});

const isLogged = () => {
  const savedUser = localStorage.getItem("NightLifeUser");
  if (!savedUser || savedUser === undefined) return false;
  return true;
};

const getToken = () => {
  const savedUser = localStorage.getItem("NightLifeUser");
  if (!savedUser || savedUser === undefined) throw "No estás loggeado.";
  return JSON.parse(savedUser).token;
};

const displayReviewAdder = () => {
  document.querySelector("#create-review").classList.add("logged");
  document
    .querySelector("#submit-review-btn")
    .addEventListener("click", async (e) => {
      e.preventDefault();
      const content = document.querySelector("#create-review textarea").value;
      try {
        await api.addReview(getId(), getToken(), content);
        document.querySelector("#create-review textarea").value = "";
      } catch (error) {
        alert(error);
      }
      window.location.reload();
    });
};

const fetchData = async () => {
  try {
    const local = await api.getLocal(getId());
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
      api.deleteLocal(local.id, myUser.token);
      alert("El local ha sido eliminado.");
    } catch (error) {
      alert(error);
    }
    window.location.href = "my-locals.html";
  });

  const edit = document.createElement("button");
  edit.textContent = "Editar";
  edit.addEventListener("click", () => {
    window.location.href = `edit.html?id=${local.id}`;
  });

  const parent = document.querySelector(".local");
  parent.insertBefore(del, parent.children[1]);
  parent.insertBefore(edit, parent.children[1]);
};

const pintarLocal = (loc) => {
  const local = document.querySelector(".local");
  local.querySelector("h2").textContent = loc.nombre;
  local.querySelector("#dir").textContent = loc.direccion;
  local.querySelector("#tipo").textContent = helper.tipoToString(loc.tipo);
  local.querySelector("#hor").textContent = loc.horario;
  local.querySelector("a").textContent = loc.url;
  local.querySelector("a").href = "https://" + loc.url;
  local.querySelector("#precio").textContent = loc.consumicion;
  local.querySelector("#musica").textContent = loc.musica;
  local.querySelector("#nombre").textContent = loc.user.username;
  local.querySelector("#email").textContent = loc.user.email;
  pintarReviews(loc.reviews);
};

const pintarReviews = (reviews) => {
  reviews.reverse();
  const template = document.querySelector("#template");
  const reviewsContainer = document.querySelector(".reviews");
  const fragment = document.createDocumentFragment();
  reviews.forEach((rev) => {
    const clone = template.content.cloneNode(true);
    const date = new Date(rev.date);
    clone.querySelector(".username").textContent = rev.user.username;
    clone.querySelector(".date").textContent = formatDate(date);
    clone.querySelector(".review-content").textContent = rev.content;
    fragment.appendChild(clone);
  });
  reviewsContainer.appendChild(fragment);
};

const formatDate = (date) => {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};
