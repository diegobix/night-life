const navText = document.querySelector('.nav-text')

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('NightLifeUser'))
  if (user) {
    console.log(user);
    navText.textContent = `Logged as ${user.username}`
  } else {
    navText.textContent = 'Not logged in'
  }
})