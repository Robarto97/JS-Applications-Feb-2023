import { del, get, post, put } from "./api.js";

export function getAllMemes() {
  return get("/data/memes?sortBy=_createdOn%20desc");
}

export function createMeme(data) {
  return post("/data/memes", data);
}

export function getMemeById(memeId) {
  return get(`/data/memes/${memeId}`);
}

export function deleteMeme(memeId) {
  return del(`/data/memes/${memeId}`);
}

export function editMeme(memeId, data) {
  return put(`/data/memes/${memeId}`, data);
}

export function getMyMemes(userId) {
  return get(
    `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}
