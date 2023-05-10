async function getData() {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function openModal(title, media) {
  console.log("openModal", title, media);
  // Code pour ouvrir la boîte de dialogue modale
  const modal = document.getElementById("media_modal");
  const lightbox = modal.querySelector(".lightbox");
  if (lightbox) {
    lightbox.innerHTML = "";
    lightbox.remove();
  }
  modal.style.display = "block";

  // Créer les éléments pour afficher l'image et le titre
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = title;
  div.setAttribute("class", "lightbox");
  div.setAttribute("role", "dialog");
  if (media.type === "picture") {
    const imgModal = document.createElement("img");
    imgModal.setAttribute("src", media.src);
    imgModal.setAttribute("class", "imgLightbox");
    imgModal.setAttribute("alt", title);
    div.appendChild(imgModal);
  } else if (media.type === "video") {
    const video = document.createElement("video");
    video.src = media.src;
    video.setAttribute("controls", true);
    video.setAttribute("aria-label", title);
    div.appendChild(video);
 
  }
  p.setAttribute("class", "title");
  modal.appendChild(div);
  div.appendChild(p);
 
  
  // Ajouter les boutons précédent et suivant à la modale
  const next = document.querySelectorAll(".lightbox-next");
  const prev = document.querySelectorAll(".lightbox-prev");
  let currentIndex = 0;
  let gallery = document.querySelectorAll(".mediaDisplayLink");

  //passer a l'image suivante
next.forEach((nextButton) => {
  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
      currentIndex++;
    if (currentIndex >= gallery.length) {
      currentIndex = 0;
    }
    console.log("next",currentIndex)
    const nextImage = gallery[currentIndex];
    const nextImgSrc = nextImage.querySelector("img").getAttribute("src"); // Récupère l'URL de l'image
    const isVideo = nextImgSrc.endsWith(".mp4"); // Vérifie si l'URL se termine par ".mp4"
    let title = nextImage.getAttribute("aria-label");
    p.textContent = title;
    p.setAttribute("class", "title");
    // Supprime les éléments enfants de l'élément lightbox existant
    const lightbox = document.querySelector(".lightbox");
    if (lightbox) {
      lightbox.innerHTML = "";
    }
    modal.style.display = "block";
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
      img.src = ("src",nextImgSrc);
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
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = gallery.length - 1; // Réinitialiser au dernier élément de la galerie
      }
      console.log("prev", currentIndex);
      const prevImage = gallery[currentIndex];
      const prevImgSrc = prevImage.querySelector("img").getAttribute("src"); // Récupère l'URL de l'image
      const isVideo = prevImgSrc.endsWith(".mp4"); // Vérifie si l'URL se termine par ".mp4"
      let title = prevImage.getAttribute("aria-label");
      p.textContent = title;
      p.setAttribute("class", "title");
      // Supprime les éléments enfants de l'élément lightbox existant
      const lightbox = document.querySelector(".lightbox");
      if (lightbox) {
        lightbox.innerHTML = "";
      }  
      modal.style.display = "block";
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
        img.src = ("src",prevImgSrc);
        img.setAttribute("class", "imgLightbox");
        img.setAttribute("alt", title);
        lightbox.appendChild(img);
        lightbox.appendChild(p);
      }
    });
  });

  // passage des images avec le clavier
  window.addEventListener("keydown", function (event) {
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
  }, true); 
}