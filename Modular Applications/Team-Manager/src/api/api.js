export const settings = {
  host: "",
};

async function request(url, option) {
  try {
    const res = await fetch(url, option);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message);
    }
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      return res;
    }
  } catch (err) {
    throw err;
  }
}

function getOptions(method = "get", body) {
  const options = {
    method,
    headers: {},
  };
  const token = sessionStorage.getItem("authToken");
  if (token) {
    options.headers["X-Authorization"] = token;
  }

  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }
  return options;
}

export async function get(url) {
  return await request(url, getOptions());
}
export async function post(url, data) {
  return await request(url, getOptions("post", data));
}
export async function put(url, data) {
  return await request(url, getOptions("put", data));
}
export async function del(url) {
  return await request(url, getOptions("delete"));
}

export async function login(email, password) {
  const result = await post(`${settings.host}/users/login`, {
    email,
    password,
  });

  sessionStorage.setItem("username", result.username);
  sessionStorage.setItem("authToken", result.accessToken);
  sessionStorage.setItem("userId", result._id);

  return result;
}

export async function register(email, username, password) {
  const result = await post(`${settings.host}/users/register`, {
    email,
    username,
    password,
  });

  sessionStorage.setItem("username", result.username);
  sessionStorage.setItem("authToken", result.accessToken);
  sessionStorage.setItem("userId", result._id);

  return result;
}

export async function logout(email, password) {
  const result = await get(`${settings.host}/users/logout`, {
    email,
    password,
  });

  sessionStorage.removeItem("username", result.username);
  sessionStorage.removeItem("authToken", result.accessToken);
  sessionStorage.removeItem("userId", result._id);

  return result;
}
