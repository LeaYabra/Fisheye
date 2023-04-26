async function getPhotographers() {
        // Ceci est une requête sur le fichier JSON en utilisant "fetch".
        let photographers = []
        await fetch('data/photographers.json')
        .then(response => {
            return response.json()
        })
        .then(data =>{
            photographers = data.photographers;
            console.log(photographers);
        })
        .catch(error => {
            console.log(error);
        });

        // et bien retourner le tableau photographers seulement une fois récupéré
        return photographers ;
    }

   async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
         console.log(photographers);
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });

    };

    async function init() {
        // Récupère les datas des photographes
        const  photographers  = await getPhotographers();
        console.log(photographers);
        displayData(photographers);
      /* photographers.forEach((photographer) => {
            var id = photographer.this['id'];
            console.log(id);
        
     });*/
    };
   
init();
/* Sélectionnez l'élément sur lequel vous souhaitez détecter le clic
var element = document.getElementById("photographer");
console.log(element)

// Ajouter un événement onclick pour détecter le clic
element.onclick = function() {
  // Récupérer l'ID de l'élément cliqué
  var elementId = this.id;

  // Ajouter l'ID de l'élément à l'URL
 // window.location.href = window.location.href + "?id=" + elementId;
}*/




