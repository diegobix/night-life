const baseUrl = "https://night-life-api.onrender.com/api/";
// const baseUrl = "http://localhost:3001/api/";

const removeLogin = () => {
  localStorage.removeItem("NightLifeUser");
  alert("Vuelve a iniciar sesion");
  window.location.href = login.html;
};

const getAllLocals = async () => {
  const uri = baseUrl + "locales";

  const res = await fetch(uri);
  const data = await res.json();
  return data;
};

const getLocal = async (id) => {
  const uri = baseUrl + "locales/" + id;

  const res = await fetch(uri);
  const data = await res.json();
  if (res.status === 404) {
    if (data.error === "token expired") {
      removeLogin();
    } else {
      throw data.error;
    }
  }
  return data;
};

const login = async (user, pass) => {
  const uri = baseUrl + "login";
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user,
      password: pass,
    }),
  });
  const data = await res.json();
  if (res.status === 401) {
    if (data.error === "token expired") {
      removeLogin();
    } else {
      throw data.error;
    }
  }
  return data;
};

const register = async (name, username, email, password) => {
  const uri = baseUrl + "users";
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, name, email, password }),
  });
  const data = await res.json();
  if (res.status === 400) {
    if (data.error === "token expired") {
      removeLogin();
    } else {
      throw data.error;
    }
  }
};

const createLocal = async (local, token) => {
  const uri = baseUrl + "locales";
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(local),
  });
  const data = await res.json();

  if (res.status === 401) {
    if (data.error === "token expired") {
      removeLogin();
    } else {
      throw data.error;
    }
  }
  return data;
};

const getUserInfo = async (token) => {
  const uri = baseUrl + "users/profile";
  const res = await fetch(uri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

const deleteLocal = async (id, token) => {
  const uri = baseUrl + "locales/" + id;
  const res = await fetch(uri, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (res.status !== 204) {
    if (data.error === "token expired") {
      removeLogin();
    } else {
      throw data.error;
    }
  }
};

const updateLocal = async (id, token, local) => {
  const uri = baseUrl + "locales/" + id;
  const res = await fetch(uri, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(local),
  });
  const data = await res.json();
  console.log(data);
  if (res.status !== 200) {
    if (data.error === "token expired") {
      removeLogin();
    } else {
      throw data.error;
    }
  }
};

const addReview = async (id, token, content) => {
  const uri = baseUrl + "locales/" + id + "/reviews";
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  console.log(res);
  if (res.status !== 200) {
    const data = await res.json();
    {
      if (data.error === "token expired") {
        removeLogin();
      } else {
        throw data.error;
      }
    }
  }
};

export default {
  getAllLocals,
  getLocal,
  register,
  login,
  createLocal,
  getUserInfo,
  deleteLocal,
  addReview,
  updateLocal,
};
