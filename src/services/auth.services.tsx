import Axios from "axios";

import { setOptions, setOutForm } from "../utils/requestOptions";

export const setToken = (data: { data: {} }) => {
  localStorage.setItem("user", JSON.stringify(data.data));
};

export const removeToken = () => {
  localStorage.removeItem("user");
};

export const fetchToken = () => {
  const data = localStorage.getItem("user");
  if (data) {
    const user = JSON.parse(data);

    return user.access_token;
  }
  return null;
};

export const fetchName = () => {
  const data = localStorage.getItem("user");
  if (data) {
    const user = JSON.parse(data);

    return user.name;
  }
  return null;
};

export const setLogout = () => {
  localStorage.removeItem("user");
};

export function setLogin(data: {}) {
  return Axios.request(setOutForm("auth/login", "POST", data)); // Using a post request, specifying the user
}

export function setRegister(data: object) {
  return Axios.request(setOptions("users", "POST", data)); // Using a post request, specifying the user
}
