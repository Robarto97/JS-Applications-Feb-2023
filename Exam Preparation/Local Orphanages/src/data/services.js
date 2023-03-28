import { del, get, post, put } from "./api.js";

export async function getAllPosts() {
  return get("/data/posts?sortBy=_createdOn%20desc");
}

export async function createPost(data) {
  return post("/data/posts", data);
}

export async function getPostById(postId) {
  return get(`/data/posts/${postId}`);
}

export async function deletePost(postId) {
  return del(`/data/posts/${postId}`);
}

export async function editPost(postId, data) {
  return put(`/data/posts/${postId}`, data);
}

export async function getMyPosts(userId) {
  return get(
    `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`
  );
}

export async function makeDonation(postId) {
  return post("/data/donations", { postId });
}

export async function getDonationsForPost(postId) {
  return get(
    `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`
  );
}

export async function getMyDonationsForPost(postId, userId) {
  return get(
    `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
