let medias = [];
//recupere id et affiche les info du photographe
async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const data = await getData();
  const photographers = data.photographers;
  console.log(photographers);
  const myPhotographer = photographers.find(function (photographer) {
    return photographer.id == id;
  });
  console.log(myPhotographer);
  displayPhotographer(myPhotographer);
  const myMedia = data.media.filter(function (media) {
    return media.photographerId == id;
  });
  medias = myMedia;
  console.log(myMedia);
  displayMedia(myMedia);

//ajout du prix par jour
const footer = document.querySelector(".price");
footer.innerHTML = `${myPhotographer.price} €/jour`;
// ajout du nom de photographe dans modal contact
const header = document.getElementById("modalTitle");
header.innerHTML = `Contactez-moi <br>${myPhotographer.name}`;
}
init();

// affiche les info du photographe
async function displayPhotographer(photographer) {
  const photographerSection = document.querySelector(".photograph-header");
  const photographerModel = photographerInfo(photographer);
  const userCardDOM = photographerModel.getUserInfoDOM();
  photographerSection.appendChild(userCardDOM);
}
function modalAddEventListener() {
 let mediasDisplayLink = document.querySelectorAll(".mediaDisplayLink");
  mediasDisplayLink.forEach((mediaDisplayLink) => {
    mediaDisplayLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("test", e.srcElement);
      // est ce une image ou video
      let type = "video";
      let title = e.srcElement.getAttribute("aria-label");
      if (e.srcElement.tagName === "IMG") {
        type = "picture";
        title = e.srcElement.getAttribute("alt");
      }
      // je recupère le titre
      // je recupere la source
      openModal(title, { type, src: e.srcElement.getAttribute("src") });
    });
});
}

async function displayMedia(medias) {
  const mediaSection = document.querySelector(".photographer-media");
  medias.forEach((media) => {
    const mediaModel = mediaPhotographer(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
  modalAddEventListener();
}
