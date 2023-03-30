import { del, get, post, put } from "./api.js";

export function getAllTheaters() {
  return get("/data/theaters?sortBy=_createdOn%20desc&distinct=title");
}

export function createTheater(data) {
  return post("/data/theaters", data);
}

export function editTheater(id, data) {
  return put(`/data/theaters/${id}`, data);
}

export function getTheaterById(id) {
  return get(`/data/theaters/${id}`);
}

export function deleteTheater(id) {
  return del(`/data/theaters/${id}`);
}

export function getMyTheaters(userId) {
  return get(
    `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}

export function addLike(theaterId) {
  return post("/data/likes", { theaterId });
}

export function getTotalLikes(theaterId) {
  return get(
    `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`
  );
}

export function getMyTotalLikes(theaterId, userId) {
  return get(
    `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
