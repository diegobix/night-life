import data from "./api.js";

const container = document.querySelector('.container')
const template = document.getElementById('template').content
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', () => {
  fetchData()
})

const fetchData = async () => {
  try {
    const locals = await data.getAllLocals()
    console.log(locals);
    pintarLocales(locals)
  } catch (error) {
    console.error(error)
  }

}

const goToLocal = id => {
  const url = `local.html?id=${id}`
  window.location.href = url
}

const pintarLocales = locales => {
  container.innerHTML = ''
  locales.forEach(local => {
    const clone = template.cloneNode(true)
    clone.querySelector('h3').textContent = local.nombre
    clone.querySelector('#dir').textContent = local.direccion
    clone.querySelector('#horario').textContent = local.horario

    clone.querySelector('button').addEventListener('click', () => goToLocal(local.id))

    fragment.appendChild(clone)
  })
  container.appendChild(fragment)
}