import { del, get, post, put } from "./api.js";

export function getAllCars() {
  return get("/data/cars?sortBy=_createdOn%20desc");
}

export function createCar(data) {
  return post("/data/cars", data);
}

export function getCarById(carId) {
  return get(`/data/cars/${carId}`);
}

export function deleteCar(carId) {
  return del(`/data/cars/${carId}`);
}

export function editCar(carId, data) {
  return put(`/data/cars/${carId}`, data);
}

export function getMyCars(userId) {
  return get(
    `/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}

export function searchCar(query) {
  return get(`/data/cars?where=year%3D${query}`);
}
