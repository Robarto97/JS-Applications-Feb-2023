const host = "http://localhost:3030";

async function apiCalls(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  if (userData) {
    options.headers["X-Authorization"] = userData.accessToken;
  }

  try {
    const res = await fetch(`${host}${url}`, options);
    if (!res.ok) {
      throw new Error('Something happened');
    }
    return res.status === 204 ? res : await res.json();
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

const methodEnum = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export function get(url) {
  return apiCalls(methodEnum.GET, url);
}
export function post(url, data) {
  return apiCalls(methodEnum.POST, url, data);
}
export function put(url, data) {
  return apiCalls(methodEnum.PUT, url, data);
}
export function del(url) {
  return apiCalls(methodEnum.DELETE, url);
}
