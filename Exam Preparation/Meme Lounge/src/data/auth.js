import { clearUserData, setUserData } from "../utils.js";
import { get, post } from "./api.js";

const endpoints = {
  login: "/users/login",
  register: "/users/register",
  logout: "/users/logout",
};

export async function login(email, password) {
  const result = await post(endpoints.login, { email, password });
  setUserData(result);
}

export async function register(username, email, password, gender) {
  const result = await post(endpoints.register, {
    username,
    email,
    password,
    gender,
  });
  setUserData(result);
}

export async function logout() {
  get(endpoints.logout);
  clearUserData();
}
