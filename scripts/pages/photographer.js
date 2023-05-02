/*const urlParams = new URLSearchParams(window.location.search);
const id= urlParams.get('id');
console.log(id);

getPhotographers().then(photographers => {
  const myPhotographer = photographers.filter(function(photographer) {
    return photographer.id == id;
   
  });
  console.log(myPhotographer);
});*/

//recupere id et affiche les info du photographe
async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const photographers = await getPhotographers();
  console.log(photographers);
  const myPhotographer = photographers.find(function(photographer) {
    return photographer.id == id;
  });
  console.log(myPhotographer)
  displayPhotographer(myPhotographer);
 
}
init();

// affiche les info du photographe
async function displayPhotographer(photographer) {
  const photographerSection = document.querySelector(".photograph-header");
  const photographerModel = photographerInfo(photographer);
  const userCardDOM = photographerModel.getUserInfoDOM();
  photographerSection.appendChild(userCardDOM);
}

async function media() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const media = await getMedia();
  console.log(media);
  const myMedia = media.filter(function(media) {
    return media.photographerId == id;
  });
  console.log(myMedia)
  displayMedia(myMedia);
}

media();

/* affiche les media
async function displayMedia(media) {
  const mediaSection = document.querySelector(".photograph-media");
  const mediaModel = media(media);
  const userCardDOM = mediaModel.getUserInfoDOM();
  mediaSection.appendChild(userCardDOM);
}*/

async function displayMedia(medias) {
  const mediaSection = document.querySelector(".photographer-media");
  medias.forEach((media) => {
      const mediaModel = mediaPhotographer(media);
      const mediaCardDOM = mediaModel.getMediaCardDOM();
      mediaSection.appendChild(mediaCardDOM);
  });

}