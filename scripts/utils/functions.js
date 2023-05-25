//recupere les donnees
// eslint-disable-next-line no-unused-vars
async function getData() {
  try {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// ouvrir la modale avec les medias
// eslint-disable-next-line no-unused-vars
function openModal(title, media) {
  console.log("openModal", title, media);
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
  div.dataset.id = media.id;
  div.dataset.title = title;

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
}

//ouvrir le filtre
// eslint-disable-next-line no-unused-vars
function openFilter() {
  // Montrer les deux derniers boutons
  document.querySelector(".filterList").classList.add("show");
  document.querySelector(".filterList .filterDate").style.visibility = "visible";
  document.querySelector(".filterList .filterTitle").style.visibility = "visible";
  // Changer la flèche pour montrer qu'elle est ouverte
  document.querySelector(".filterList .chevronDown").style.visibility = "hidden";

  document.querySelector(".filterList .filterDate").style.visibility =
    "visible";
  document.querySelector(".filterList .filterTitle").style.visibility =
    "visible";
  // Changer la flèche pour montrer qu'elle est ouverte
  document.querySelector(".filterList .chevronDown").style.visibility =
    "hidden";
  document.querySelector(".filterList .chevronUp").style.visibility = "visible";
}

//fermer le filtre
// eslint-disable-next-line no-unused-vars
function closeFilter() {
  document.querySelector(".filterList").classList.remove("show");
  // Cacher les deux derniers boutons
  document.querySelector('.filterList .filterDate').style.visibility = "hidden";
  document.querySelector('.filterList .filterTitle').style.visibility = "hidden";
  // Changer la flèche pour montrer qu'elle est fermée
  document.querySelector(".filterList .chevronDown").style.visibility = "visible";
  document.querySelector(".filterList .chevronUp").style.visibility = "hidden";
}
