//affiche les info du photographe
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  console.log(photographers);
  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
async function init() {
// Récupère les datas des photographes
  // eslint-disable-next-line no-undef
  const data = await getData();
  const photographers = data.photographers;
  console.log(photographers);
  displayData(photographers);
}
init();