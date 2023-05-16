const baseUrl = 'https://night-life-api.onrender.com/api/'

const getAllLocals = async () => {
  const uri = baseUrl + 'locales'

  const res = await fetch(uri);
  const data = await res.json()
  return data
}

const getLocal = async id => {
  const uri = baseUrl + 'locales/' + id

  const res = await fetch(uri)
  const data = await res.json()
  return data
}

const login = async (user, pass) => {
  const uri = baseUrl + 'login'
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: user,
      password: pass
    })
  })
  const data = await res.json()
  if (res.status === 401) throw data.error
  return data
}

const createLocal = async (local, token) => {
  const uri = baseUrl + 'locales'
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(local)
  })
  const data = await res.json()

  if (res.status === 401) throw data.error
  return data
}

export default {getAllLocals, getLocal, login, createLocal}