import { del, get, post, put } from "./api.js";

export function getAlbums() {
  return get("/data/albums?sortBy=_createdOn%20desc&distinct=name");
}

export function getAlbumById(albumId) {
  return get(`/data/albums/${albumId}`);
}

export function createAlbum(data) {
  return post("/data/albums", data);
}

export function deleteAlbum(albumId) {
  return del(`/data/albums/${albumId}`);
}

export function editAlbum(albumId, data) {
  return put(`/data/albums/${albumId}`, data);
}
export function searchAlbum(query) {
  return get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}
