import { get, post, put, del } from "./api.js";

export async function getAllProducts() {
  return get("/data/products?sortBy=_createdOn%20desc");
}

export async function createProduct(data) {
  return post("/data/products", data);
}

export async function getProductById(id) {
  return get(`/data/products/${id}`);
}

export async function buyProduct(productId) {
  return post("/data/bought", { productId });
}

export async function getBoughtCountProductId(productId) {
  return get(
    `/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`
  );
}

export async function getMyBoughtCountProductId(productId, userId) {
  return get(
    `/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}

export async function editProduct(id, product) {
  return put(`/data/products/${id}`, product);
}

export async function deleteProduct(id) {
  return del(`/data/products/${id}`);
}
