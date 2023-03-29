import { del, get, post, put } from "./api.js";

export function getAllPets() {
  return get("/data/pets?sortBy=_createdOn%20desc&distinct=name");
}

export function createPet(data) {
  return post("/data/pets", data);
}

export function getPetById(petId) {
  return get(`/data/pets/${petId}`);
}

export function deletePet(petId) {
  return del(`/data/pets/${petId}`);
}

export function editPet(petId, data) {
  return put(`/data/pets/${petId}`, data);
}

export function addDonation(petId) {
  return post("/data/donation", { petId });
}

export function getTotalDonations(petId) {
  return get(
    `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`
  );
}

export function getMyTotalDonations(petId, userId) {
  return get(
    `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}
