function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
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
const validate = function (event) {
    event.preventDefault(); // Empêche l'envoi du formulaire
    const formData = new FormData(form);
    const prenomValue = formData.get("prenom");
    const errorMessages = document.getElementsByClassName("error-message");
    const allInputs = document.querySelectorAll("input");
    Array.from(allInputs).forEach(function (input) {
      input.classList.remove("error");
    });
    Array.from(errorMessages).forEach(function (errorMessage) {
      errorMessage.textContent = "";
    });
    let isValid = true;
  
    if (prenomValue.trim().length <2) {
      isValid = false;
      prenom.classList.add("error");
      prenomError.textContent = "Veuillez saisir 2 caractères ou plus pour le prénom.";
    }
   console.log(prenomValue);

    if (formData.get("nom") .trim().length <2) {
      isValid = false;
      nom.classList.add("error");
      nomError.textContent ="Veuillez saisir 2 caractères ou plus pour le nom.";
    }
    if (formData.get("email") === "") {
      isValid = false;
      email.classList.add("error");
      emailError.textContent = "Veuillez saisir une adresse email.";
    } else if (!isValidEmail(formData.get("email"))) {
      isValid = false;
      email.classList.add("error");
      emailError.textContent = "L'adresse email n'est pas valide.";
    }
    if (formData.get("message").trim().length <5) {
      isValid = false;
      message.classList.add("error");
      messageError.textContent = "Veuillez saisir 5 caractères ou plus pour le message.";
    }
    if (isValid) {
      alert('Votre message a bien été envoyé.');
     closeModal();
    }
    return isValid;
  };

// Ajout d'un écouteur d'événement sur le bouton d'envoi
form.addEventListener("submit", validate);
  
  



