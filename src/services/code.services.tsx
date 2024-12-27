import Axios from "axios";
import { setOptions } from "../utils/requestOptions";


export function editCode(data: object, id: number) {
  return Axios.request(setOptions("codes/" + id, "PUT", data)); // Using a post request, specifying the user
}

export function getCodes() {
  return Axios.request(setOptions("codes/", "GET")); // Using a post request, specifying the user
}

export function getCode(id: number) {
  return Axios.request(setOptions("codes/" + id, "GET")); // Using a post request, specifying the user
}

export function changeStatusCode(id: number) {
  return Axios.request(setOptions("codes/" + id, "DELETE")); // Using a post request, specifying the user
}



export function deleteCode(id: number) {
  return Axios.request(setOptions("codes/delete/" + id, "DELETE")); // Using a post request, specifying the user
}
