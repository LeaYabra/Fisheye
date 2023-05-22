/* globals getData, photographerInfo, openModal, mediaPhotographer */
let medias = [];
//recupere id,les info et medias du photographe
async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const data = await getData();
  const photographers = data.photographers;
  console.log(photographers);
  const myPhotographer = photographers.find(function (photographer) {
    return photographer.id.toString() === id.toString();
  });
  console.log(myPhotographer);
  displayPhotographer(myPhotographer);
  const myMedia = data.media.filter(function (media) {
    return media.photographerId.toString() === id.toString();
  });
  medias = myMedia;
  console.log(myMedia);
  displayMedia(myMedia);
  initModalSlider();
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

//afficher dans modal image ou video selon le type avec titre
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
      // je recupère le titre et la source
      openModal(title, {
        type,
        src: e.srcElement.getAttribute("src"),
        id: e.srcElement.dataset.id,
      });
    });
  });
}
//affiche les medias
async function displayMedia(medias) {
  const mediaSection = document.querySelector(".photographer-media");
  medias.forEach((media) => {
    const mediaModel = mediaPhotographer(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });
  modalAddEventListener();
}

//lightbox medias
function initModalSlider() {
  // Ajouter les boutons précédent et suivant à la modale
  const next = document.querySelectorAll(".lightbox-next");
  const prev = document.querySelectorAll(".lightbox-prev");
  let gallery = document.querySelectorAll(".mediaDisplayLink");
  const findCurrentIndex = (mediaId) => {
    console.log("find ", mediaId, " in ", medias);
    return medias.findIndex((media) => media.id.toString() === mediaId);
  };
  // passer a l'image suivante
  next.forEach((nextButton) => {
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      let lightbox = document.querySelector(".lightbox");
      let currentIndex = findCurrentIndex(lightbox.dataset.id);
      // Supprime les éléments de la lightbox existant
      if (lightbox) {
        lightbox.innerHTML = "";
      }
      currentIndex++;
      if (currentIndex >= medias.length) {
        currentIndex = 0;
      }
      const nextImage = medias[currentIndex];
      lightbox.dataset.id = nextImage.id;
      lightbox.dataset.title = nextImage.title;
      console.log("nextImage", nextImage);
      const nextImgSrc = nextImage.image
        ? "/assets/media/" + nextImage.image
        : "/assets/media/" + nextImage.video; // Récupère l'URL de l'image
      const isVideo = nextImgSrc.endsWith(".mp4"); // Vérifie si l'URL se termine par ".mp4"
      let title = nextImage.title;
      const p = document.createElement("p");
      p.textContent = title;
      p.setAttribute("class", "title");
      // Ajoute l'élément approprié à l'élément lightbox
      if (isVideo) {
        const video = document.createElement("video");
        video.src = nextImgSrc;
        video.setAttribute("controls", true);
        video.setAttribute("aria-label", title);
        lightbox.appendChild(video);
        lightbox.appendChild(p);
      } else {
        const img = document.createElement("img");
        img.src = ("src", nextImgSrc);
        img.setAttribute("class", "imgLightbox");
        img.setAttribute("alt", title);
        lightbox.appendChild(img);
        lightbox.appendChild(p);
      }
    });
  });

  //revient a l'image precedente
  prev.forEach((prevButton) => {
    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      let lightbox = document.querySelector(".lightbox");
      let currentIndex = findCurrentIndex(lightbox.dataset.id);
      // Supprime les éléments de la lightbox existant
      if (lightbox) {
        lightbox.innerHTML = "";
      }
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = gallery.length - 1; // Réinitialiser au dernier élément de la galerie
      }
      const prevImage = medias[currentIndex];
      lightbox.dataset.id = prevImage.id;
      lightbox.dataset.title = prevImage.title;
      console.log("prevImage", prevImage);
      const prevImgSrc = prevImage.image
        ? "/assets/media/" + prevImage.image
        : "/assets/media/" + prevImage.video; // Récupère l'URL de l'image
      const isVideo = prevImgSrc.endsWith(".mp4"); // Vérifie si l'URL se termine par ".mp4"
      let title = prevImage.title;
      const p = document.createElement("p");
      p.textContent = title;
      p.setAttribute("class", "title");

      // Ajoute l'élément approprié à l'élément lightbox
      if (isVideo) {
        const video = document.createElement("video");
        video.src = prevImgSrc;
        video.setAttribute("controls", true);
        video.setAttribute("aria-label", title);
        lightbox.appendChild(video);
        lightbox.appendChild(p);
      } else {
        const img = document.createElement("img");
        img.src = ("src", prevImgSrc);
        img.setAttribute("class", "imgLightbox");
        img.setAttribute("alt", title);
        lightbox.appendChild(img);
        lightbox.appendChild(p);
      }
    });
  });

  // passage des images avec le clavier
  window.addEventListener(
    "keydown",
    function (event) {
      if (event.defaultPrevented) {
        return;
      }
      switch (event.key) {
        case "ArrowLeft":
          //clique sur fleche precedente
          prev[0].click();
          break;
        case "ArrowRight":
          // clique sur fleche suivante
          next[0].click();
          break;
        default:
          return; //fait rien si appuie sur une autre touche
      }
      event.preventDefault();
    },
    true
  );

  //lecture de video avec clavier
  window.addEventListener("keydown", function (event) {
    const lightbox = document.querySelector(".lightbox");
    if (event.key === " ") {
      // Touche d'espace
      const videoElement = lightbox.querySelector("video");
      event.preventDefault();
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  });
}
