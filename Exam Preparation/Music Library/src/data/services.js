import { get, post, put, del } from "./api.js";

export async function getAllAlbums() {
  return get("/data/albums?sortBy=_createdOn%20desc");
}

export async function createAlbum(data) {
  return post("/data/albums", data);
}

export async function editAlbum(albumId, data) {
  return put(`/data/albums/${albumId}`, data);
}

export async function getAlbumById(albumId) {
  return get(`/data/albums/${albumId}`);
}

export async function deleteAlbum(albumId) {
  return del(`/data/albums/${albumId}`);
}

export async function addLike(albumId) {
  return post("/data/likes", { albumId });
}

export async function getLikesForAlbum(albumId) {
  return get(
    `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`
  );
}

export async function getMyLikesForAlbum(albumId, userId) {
  return get(
    `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
