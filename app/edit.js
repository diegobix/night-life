import api from "./api.js";

const getId = () => {
  const qs = window.location.search;
  const params = new URLSearchParams(qs);

  return params.get("id");
};

const getToken = () => {
  const storedUser = localStorage.getItem("NightLifeUser");
  if (!storedUser || storedUser === undefined) throw "User not logged";
  return JSON.parse(storedUser).token;
};

const fetchData = async () => {
  const local = await api.getLocal(getId());
  printLocal(local);
};

const printLocal = (local) => {
  const inputs = document.querySelectorAll("form input");
  console.log(local);
  inputs[0].value = local.nombre;
  inputs[1].value = local.direccion;
  inputs[5].value = local.musica;
  inputs[6].value = local.url;
  inputs[7].value = local.consumicion;
  inputs[8].value = local.horario;
  Array.from(inputs)
    .slice(2, 5)
    .forEach((rad) => {
      rad.checked = rad.value === local.tipo ? true : false;
    });
};

const onSubmit = async (e) => {
  e.preventDefault();
  let token;
  try {
    token = getToken();
  } catch (error) {
    alert(error);
    window.location.href = "index.html";
  }
  const formData = new FormData(e.target);
  const localData = {};
  formData.forEach((val, key) => (localData[key] = val));
  try {
    await api.updateLocal(getId(), token, localData);
    window.location.href = "local.html?id=" + getId();
  } catch (error) {
    alert(error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  document.querySelector("form").addEventListener("submit", (e) => onSubmit(e));
});
