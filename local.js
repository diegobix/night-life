import data from "./api.js";

const getId = () => {
  const qs = window.location.search
  const params = new URLSearchParams(qs)

  return params.get('id')
}

document.addEventListener('DOMContentLoaded', () => {
  fetchData()
})

const fetchData = async () => {
  try {
    const local = await data.getLocal(getId())
    console.log(local);
    pintarLocal(local)
  } catch (error) {
    console.error(error)
  }
}

const pintarLocal = loc => {
  const local = document.querySelector('.local')
  local.querySelector('h2').textContent = loc.nombre
  local.querySelector('#dir').textContent = loc.direccion
  local.querySelector('#hor').textContent = loc.horario
  local.querySelector('a').textContent = loc.url
  local.querySelector('#precio').textContent = loc.consumicion
  local.querySelector('#musica').textContent = loc.musica
  local.querySelector('#nombre').textContent = loc.user.username
  local.querySelector('#email').textContent = loc.user.email
}