import api from "./api.js";
import helper from "../utils/helper.js";

const container = document.querySelector(".locales");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();

let filteredData = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    const locals = await api.getAllLocals();
    console.log(locals);
    filteredData = locals;
    pintarLocales(locals);
    typeForm(locals);
    searchForm();
  } catch (error) {
    console.error(error);
  }
};

const goToLocal = (id) => {
  const url = `local.html?id=${id}`;
  window.location.href = url;
};

const typeForm = (data) => {
  const form = document.querySelector("#type-form");
  const inputs = Array.from(form.querySelectorAll("input"));
  const nameSearch = document.querySelector("#search-form input");
  form.addEventListener("change", () => {
    const type = inputs.find((option) => option.checked === true).value;
    filteredData =
      type === "todos" ? data : data.filter((local) => local.tipo === type);
    nameSearch.value = "";
    pintarLocales(filteredData);
  });
};

const searchForm = () => {
  const form = document.querySelector("#search-form");
  const input = form.querySelector("input");
  form.addEventListener("keyup", (e) => {
    e.preventDefault();
    const letra = input.value.toLowerCase();
    const localesFiltrados = filteredData.filter((loc) => {
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
    clone.querySelector("#tipo").textContent = helper.tipoToString(local.tipo);
    clone.querySelector("#dir").textContent = local.direccion;
    clone.querySelector("#horario").textContent = local.horario;

    clone
      .querySelector("button")
      .addEventListener("click", () => goToLocal(local.id));

    fragment.appendChild(clone);
  });
  container.appendChild(fragment);
};
