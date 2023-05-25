/*globals photographerFactory, getData*/
//affiche les info du photographe
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  console.log(photographers);
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}
async function init() {
<<<<<<< HEAD
// Récupère les datas des photographes
=======
  // Récupère les datas des photographes
>>>>>>> 8de4a750003976e6e8d7455bda036d0d3c0740aa
  const data = await getData();
  const photographers = data.photographers;
  console.log(photographers);
  displayData(photographers);
}
init();
