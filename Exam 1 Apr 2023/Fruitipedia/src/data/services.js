import { del, get, post, put } from "./api.js";

export function getAllFruits() {
  return get("/data/fruits?sortBy=_createdOn%20desc");
}

export function createFruit(data) {
  return post("/data/fruits", data);
}

export function getFruitById(fruitId) {
  return get(`/data/fruits/${fruitId}`);
}

export function deleteFruit(fruitId) {
  return del(`/data/fruits/${fruitId}`);
}

export function editFruit(fruitId, data) {
  return put(`/data/fruits/${fruitId}`, data);
}

export function searchFruit(query) {
  return get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
}
