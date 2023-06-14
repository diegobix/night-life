import api from "./api.js";

const container = document.querySelector(".locales");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    const locals = await api.getAllLocals();
    console.log(locals);
    pintarLocales(locals);
    searchForm(locals);
  } catch (error) {
    console.error(error);
  }
};

const goToLocal = (id) => {
  const url = `local.html?id=${id}`;
  window.location.href = url;
};

const searchForm = (data) => {
  const form = document.querySelector("#search-form");
  const input = form.querySelector("input");
  document.querySelector("#search-form").addEventListener("keyup", (e) => {
    e.preventDefault();
    const letra = input.value.toLowerCase();
    const localesFiltrados = data.filter((loc) => {
      const nombre = loc.nombre.toLowerCase();
      if (nombre.indexOf(letra) !== -1) {
        return loc;
      }
    });
    pintarLocales(localesFiltrados);
  });
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
