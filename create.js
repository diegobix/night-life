import data from './api.js'

document.querySelector('.create').addEventListener('submit', async e => {
  e.preventDefault()
  const storedUsr = localStorage.getItem('NightLifeUser')
  if (!token) return alert('No estas loggeado!')
  const token = JSON.parse(storedUsr).token
  const formData = new FormData(e.target)
  const localData = {}
  formData.forEach((val, key) => localData[key] = val)
  console.log(localData);
  try {
    const local = await data.createLocal(localData, token)
    console.log(local)
    window.location.href = 'local.html?id=' + local.id
  } catch (error) {
    console.error(error)
  }
})