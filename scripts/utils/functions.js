async function getPhotographers() {
    // Ceci est une requête sur le fichier JSON en utilisant "fetch".
    let photographers = [];
    let media = [];

    // récupération du tableau de photographes
    await fetch('data/photographers.json')
    .then(response => {
        return response.json()
    })
    .then(data =>{
        photographers = data.photographers;
        console.log(photographers);  
        media = data.media;
        console.log(media);
    })
    .catch(error => {
        console.log(error);
    });
    
    // et bien retourner le tableau photographers seulement une fois récupéré
    return photographers 
}

/*async function getPhotographers() {
    try {
      const response = await fetch('data/photographers.json');
      const data = await response.json();
      console.log(data);
      return data.photographers;
    } catch (error) {
      console.error(error);
    }
  }*/

  /*async function getPhotographers() {
    try {
      const response = await fetch('data/photographers.json');
      const data = await response.json();
      return {
        photographers: data.photographers,
        media: data.media
      };
    } catch (error) {
      console.error(error);
    }
  }*/
  async function getMedia() {
    try {
      const response = await fetch('data/photographers.json');
      const data = await response.json();
      console.log(data);
      return data.media;
    } catch (error) {
      console.error(error);
    }
  }