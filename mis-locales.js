import data from "./api.js";

const container = document.querySelector(".container");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  const links = document.querySelectorAll(".links a");
  links[links.length - 1].classList.add("selected");
});

const checkToken = () => {
  const storedUser = localStorage.getItem("NightLifeUser");
  if (storedUser && storedUser !== undefined) {
    return JSON.parse(storedUser).token;
  }

  alert("No estás loggeado!");
  window.location.href = "index.html";
};

const fetchData = async () => {
  const token = checkToken();
  try {
    const user = await data.getUserInfo(token);
    console.log(user.locales);
    pintarLocales(user.locales);
  } catch (error) {
    console.error(error);
  }
};

const goToLocal = (id) => {
  const url = `local.html?id=${id}`;
  window.location.href = url;
};

const pintarLocales = (locales) => {
  container.innerHTML = "";
  locales.forEach((local) => {
    const clone = template.cloneNode(true);
    clone.querySelector("h3").textContent = local.nombre;
    clone.querySelector("#dir").textContent = local.direccion;
    clone.querySelector("#horario").textContent = local.horario;

    clone
      .querySelector("button")
      .addEventListener("click", () => goToLocal(local.id));

    fragment.appendChild(clone);
  });
  container.appendChild(fragment);
};
