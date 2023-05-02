function photographerInfo(data) {
    const { name, portrait,city,country,price,tagline} = data;
    
    const picture = `assets/photographers/${portrait}`;
    const classe = `information`;  
    function getUserInfoDOM() {
        const article = document.createElement( 'article' );
        const div = document.createElement( 'div' );
        div.setAttribute("class",classe);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt",'aller sur la page de '+ name+', '+city+ ', '+ tagline+', '+price+'€ par jour');
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement('h3');
        const h4 = document.createElement('h4');
        h2.textContent = name;
        h3.textContent= city+", "+country;
        h4.textContent = tagline;
        article.appendChild(div);
        article.appendChild(img);
        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(h4);
        return (article);
    }
    return {name, city,country,tagline,price, getUserInfoDOM }
}


  function mediaPhotographer(data) {
    const { title, image, video, id, likes } = data;
  
    const picture = `assets/media/${image}`;
    const vid = `assets/media/${video}`;

    function openModal() {
        // Code pour ouvrir la boîte de dialogue modale
        const modal = document.getElementById("media_modal");
        modal.style.display = "block";
      
        // Créer les éléments pour afficher l'image et le titre
        const div = document.createElement('div');
        const imgModal = document.createElement("img");
        const p = document.createElement('p');
        p.textContent = title;
        div.setAttribute('class', 'lightbox');
        imgModal.setAttribute("src", picture );
        p.setAttribute('class', 'title');
        imgModal.setAttribute('class', 'imgLightbox');
        modal.appendChild(div);
        div.appendChild(imgModal);
        div.appendChild(p);
      
        // Récupérer tous les éléments d'image dans la galerie
        const images = document.querySelectorAll('.mediaDisplayLink img');
      
        // Trouver l'index de l'image actuelle dans la galerie
        let currentIndex = Array.from(images).findIndex(img => img.src === picture);
      
        // Ajouter les boutons précédent et suivant à la modale
        const prevButton = document.querySelector('.lightbox-prev');
        const nextButton = document.querySelector('.lightbox-next');
        div.appendChild(prevButton);
        div.appendChild(nextButton);
      
        // Mettre à jour l'image et l'index lors du clic sur le bouton précédent
        prevButton.addEventListener('click', () => {
          currentIndex--;
          if (currentIndex < 0) {
            currentIndex = images.length - 1;
          }
          currentImage = images[currentIndex];
          imgModal.src = currentImage.src;
          p.textContent = currentImage.alt;
        });
      
        // Mettre à jour l'image et l'index lors du clic sur le bouton suivant
        nextButton.addEventListener('click', () => {
          currentIndex++;
          if (currentIndex >= images.length) {
            currentIndex = 0;
          }
          currentImage = images[currentIndex];
          imgModal.src = currentImage.src;
          p.textContent = currentImage.alt;
        });
      
        // Mettre à jour l'image et le titre avec la première image de la galerie
        let currentImage = images[0];
        imgModal.src = currentImage.src;
        p.textContent = currentImage.alt;
      }
function getMediaCardDOM() {
      const article = document.createElement('article');
      const link = document.createElement('a');
      const text = document.createElement('div');
      text.setAttribute('class', 'titleMedia');
      
      if (image) {
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', title);
        img.setAttribute('data-id', id);
        link.appendChild(img);
        link.setAttribute('href', '#');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    
      } else if (video) {
        const videoEl = document.createElement('video');
        videoEl.setAttribute('src', vid);
        videoEl.setAttribute('aria-label', title);
        videoEl.setAttribute('data-id', id);
        videoEl.setAttribute('type', 'video/mp4');
        link.appendChild(videoEl);
        link.setAttribute('href', '#');
        //link.addEventListener('click', openModal);
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
      }
  
      link.setAttribute('title', title);
      link.setAttribute('aria-label', title);
      link.setAttribute('class', 'mediaDisplayLink');
  
      const h3 = document.createElement('h3');
      const h4 = document.createElement('h4');
      h3.setAttribute('class', 'mediaDisplayInfosTitle');
      h4.setAttribute('class', 'mediaDisplayLike');
      h4.setAttribute('aria-label', `aimé ${likes} fois`);
      h3.textContent = title;
      h4.textContent = likes;
  
      article.appendChild(link);
      article.appendChild(text);
      text.appendChild(h3);
      text.appendChild(h4);
  
      return article;
    }
  
    return { title, image, id, video, likes, getMediaCardDOM };
}
  