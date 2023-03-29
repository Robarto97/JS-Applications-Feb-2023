import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  addDonation,
  deletePet,
  getMyTotalDonations,
  getPetById,
  getTotalDonations,
} from "../data/services.js";
import { getUserData } from "../utils.js";

const detailsTemplate = (
  pet,
  isOwner,
  onDelete,
  userId,
  donations,
  showDonateButton,
  onDonate
) => html`
  <section id="detailsPage">
    <div class="details">
      <div class="animalPic">
        <img src="${pet.image}" />
      </div>
      <div>
        <div class="animalInfo">
          <h1>Name: ${pet.name}</h1>
          <h3>Breed: ${pet.breed}</h3>
          <h4>Age: ${pet.age}</h4>
          <h4>Weight: ${pet.weight}</h4>
          <h4 class="donation">Donation: ${donations*100}$</h4>
        </div>
        ${userId
          ? html`<div class="actionBtn">
              <!-- Only for registered user and creator of the pets-->
              ${isOwner
                ? html`<a href="/dashboard/${pet._id}/edit" class="edit"
                      >Edit</a
                    >
                    <a
                      @click=${onDelete}
                      href="javascript:void(0)"
                      class="remove"
                      >Delete</a
                    >`
                : null}
              ${showDonateButton
                ? html`<a
                    @click=${onDonate}
                    href="javascript:void(0)"
                    class="donate"
                    >Donate</a
                  >`
                : null}
            </div>`
          : null}
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const petId = ctx.params.id;
  const pet = await getPetById(petId);
  const userId = getUserData()?._id;
  const isOwner = userId === pet._ownerId;

  const donations = await getTotalDonations(petId);
  const myDonations = userId && await getMyTotalDonations(petId, userId);
  const showDonateButton = !isOwner && !myDonations && userId;

  ctx.render(
    detailsTemplate(
      pet,
      isOwner,
      onDelete,
      userId,
      donations,
      showDonateButton,
      onDonate
    )
  );

  async function onDonate() {
    await addDonation(petId);
    ctx.page.redirect(`/dashboard/${petId}`);
  }

  async function onDelete() {
    const choice = confirm("Are you sure you want to delete this?");
    if (choice) {
      await deletePet(petId);
      ctx.page.redirect("/");
    }
  }
}
