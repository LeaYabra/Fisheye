// eslint-disable-next-line no-unused-vars
const modal = document.querySelector('.modal');
//ouvre la modale contact
// eslint-disable-next-line no-unused-vars
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  document.getElementById("prenom").focus();
}

// Fermer la modale quand on clique sur la croix
function closeModal() {
  const modal = document.getElementById("contact_modal");
  const modalGallery = document.getElementById("media_modal");
  modal.style.display = "none";
  modalGallery.style.display = "none";
}

//Fermer la modale avec le clavier
function closeModalOnEscape(event) {
  if (event.key === 'Escape' || event.keyCode === 27) {
    closeModal();
  }
}
document.addEventListener('keydown', closeModalOnEscape);

// Fermer la modale quand on clique en dehors
window.onclick = function(event) {
  if (event.target === document.getElementById("contact_modal")) {
    closeModal();
  }
}

//verifier email
function isValidEmail(email) {
  // Vérifie que l'email est valide selon une expression régulière
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//envoi du formulaire
const form = document.getElementById('contact-form');
const prenomError = document.querySelector("#prenom-error");
const nomError = document.querySelector("#nom-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const submitBtn = document.getElementById("submit");
submitBtn.onclick = function(event)  {
  event.preventDefault();
  const formData = new FormData(form);
  const errorMessages = document.getElementsByClassName("error-message");
  const allInputs = document.querySelectorAll("input");
  Array.from(allInputs).forEach(function (input) {
    input.classList.remove("error");
  });
  Array.from(errorMessages).forEach(function (errorMessage) {
    errorMessage.textContent = "";
  });
  let isValid = true;

  if (formData.get("prenom") .trim().length <2) {
    // eslint-disable-next-line no-undef
    prenom.classList.add("error");
    prenomError.textContent = "Veuillez saisir 2 caractères ou plus pour le prénom.";
    // eslint-disable-next-line no-undef
    prenom.focus();
    return false;
  }
  if (formData.get("nom").trim().length <2) {
    // eslint-disable-next-line no-undef
    nom.classList.add("error");
    nomError.textContent ="Veuillez saisir 2 caractères ou plus pour le nom.";
    // eslint-disable-next-line no-undef
    nom.focus();
    return false;
  }
  if (formData.get("email") === "") {
    // eslint-disable-next-line no-undef
    email.classList.add("error");
    emailError.textContent = "Veuillez saisir une adresse email.";
    // eslint-disable-next-line no-undef
    email.focus();
    return false;
  } else if (!isValidEmail(formData.get("email"))) {
    // eslint-disable-next-line no-undef
    email.classList.add("error");
    emailError.textContent = "L'adresse email n'est pas valide.";
    // eslint-disable-next-line no-undef
    email.focus();
    return false;
  }
  if (formData.get("message").trim().length <5) {
    // eslint-disable-next-line no-undef
    message.classList.add("error");
    messageError.textContent = "Veuillez saisir 5 caractères ou plus pour le message.";
    // eslint-disable-next-line no-undef
    message.focus();
    return false;
  }
  console.log("prenom:",formData.get("prenom"));
  console.log("nom:",formData.get("nom"));
  console.log("email:",formData.get("email"));
  console.log("message:",formData.get("message"));

  if (isValid) {
    alert('Votre message a bien été envoyé.');
    closeModal();
  }
};


  