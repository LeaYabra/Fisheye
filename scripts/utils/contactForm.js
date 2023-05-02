const openModalButton = document.getElementById('contact_button');
const modal = document.querySelector('.modal');
const modalContent = modal.querySelector('.contact_modal');
const modalCloseButton = modal.querySelector('.contact_button');

function displayModal() {
  const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
  document.getElementById("prenom").focus();
}

// Fermer la modale quand on clique sur la croix
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
function closeModalGallery() {
  const modal = document.getElementById("media_modal");
  modal.style.display = "none";
}
// Fermer la modale quand on clique en dehors
window.onclick = function(event) {
  if (event.target == document.getElementById("contact_modal")) {
   closeModal();
  }
}
const form = document.getElementById('contact-form');
function isValidEmail(email) {
  // Vérifie que l'email est valide selon une expression régulière
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const prenomError = document.querySelector("#prenom-error");
const nomError = document.querySelector("#nom-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const submitBtn = document.getElementById("submit");
submitBtn.onclick = function(event)  {
    event.preventDefault(); // Empêche l'envoi du formulaire
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
      prenom.classList.add("error");
      prenomError.textContent = "Veuillez saisir 2 caractères ou plus pour le prénom.";
      prenom.focus();
      return false;
      }
    if (formData.get("nom").trim().length <2) {
      nom.classList.add("error");
      nomError.textContent ="Veuillez saisir 2 caractères ou plus pour le nom.";
      nom.focus();
      return false;
       }
    if (formData.get("email") === "") {
      email.classList.add("error");
      emailError.textContent = "Veuillez saisir une adresse email.";
      email.focus();
      return false;
      } else if (!isValidEmail(formData.get("email"))) {
      email.classList.add("error");
      emailError.textContent = "L'adresse email n'est pas valide.";
      email.focus();
      return false;
       }
    if (formData.get("message").trim().length <5) {
      message.classList.add("error");
      messageError.textContent = "Veuillez saisir 5 caractères ou plus pour le message.";
      message.focus();
      return false;
    }
    if (isValid) {
      alert('Votre message a bien été envoyé.');
     closeModal();
    }

  };



