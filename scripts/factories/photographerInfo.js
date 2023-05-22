//recuperer le photographe de photographer.json
// eslint-disable-next-line no-unused-vars
function photographerInfo(data) {
  const { name, portrait, city, country, price, tagline } = data;
  const picture = `assets/photographers/${portrait}`;
  const classe = `information`;

  function getUserInfoDOM() {
    const article = document.createElement("article");
    const div = document.createElement("div");
    div.setAttribute("class", classe);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute(
      "alt",
      "aller sur la page de " +
        name +
        ", " +
        city +
        ", " +
        tagline +
        ", " +
        price +
        "€ par jour"
    );
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    h2.textContent = name;
    h3.textContent = city + ", " + country;
    h4.textContent = tagline;
    article.appendChild(div);
    article.appendChild(img);
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(h4);
    return article;
  }
  return { name, city, country, tagline, price, getUserInfoDOM };
}

// variable pour stocker la totalité de likes
let totalLikes = 0;

//affiche les medias du photographe et likes
// eslint-disable-next-line no-unused-vars
function mediaPhotographer(data) {
  const { title, image, video, id, likes } = data;
  const picture = `assets/media/${image}`;
  const vid = `assets/media/${video}`;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    const text = document.createElement("div");
    const like = document.createElement("span");
    const heart = document.createElement("img");

    text.setAttribute("class", "titleMedia");
    like.setAttribute("class", "like");
    heart.setAttribute("class", "heart");
    heart.setAttribute("src", "assets/icons/heart.svg");
    heart.setAttribute("alt", "heart");
    heart.setAttribute("aria-describedby", "liker");
    heart.setAttribute("aria-label", "je n'aime pas");
    heart.setAttribute("aria-pressed", "false");

    if (image) {
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", title);
      img.setAttribute("data-id", id);
      link.appendChild(img);
      link.setAttribute("href", "#");
    } else if (video) {
      const videoEl = document.createElement("video");
      videoEl.setAttribute("src", vid);
      videoEl.setAttribute("aria-label", title);
      videoEl.setAttribute("data-id", id);
      videoEl.setAttribute("type", "video/mp4");
      link.appendChild(videoEl);
      link.setAttribute("href", "#");
    }

    link.setAttribute("title", title);
    link.setAttribute("aria-label", title);
    link.setAttribute("class", "mediaDisplayLink");

    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    h3.setAttribute("class", "mediaDisplayInfosTitle");
    h4.setAttribute("class", "mediaDisplayLike");
    h4.setAttribute("aria-label", `aimé ${likes} fois`);
    h3.textContent = title;
    h4.textContent = likes;

    article.appendChild(link);
    article.appendChild(text);
    article.appendChild(heart);
    text.appendChild(h3);
    text.appendChild(like);
    like.appendChild(h4);
    like.appendChild(heart);

    // Ajoute le nombre de likes de ce média au total des likes
    totalLikes += likes;
    //affiche le nombre total de like
    const footer = document.querySelector(".totalLike");
    footer.innerHTML = `${totalLikes} `;

    //de/incremente le nombre de like en fonction du clic
    heart.addEventListener("click", () => {
      const pressed =
        heart.getAttribute("aria-pressed") === "true" ? "false" : "true";
      heart.setAttribute("aria-pressed", pressed);
      if (pressed === "true") {
        h4.textContent = parseInt(h4.textContent) + 1;
        totalLikes += 1;
        heart.setAttribute("aria-label", "j'aime");
        console.log("finalPLus", totalLikes);
      } else {
        h4.textContent = parseInt(h4.textContent) - 1;
        totalLikes -= 1;
        heart.setAttribute("aria-label", "je n'aime plus");
        console.log("finalMoins", totalLikes);
      }
      h4.setAttribute("aria-label", `aimé ${h4.textContent} fois`);
      // modifie le nombre total en fonction des likes
      footer.innerHTML = `${totalLikes} `;
    });
    return article;
  }

  return { title, image, id, video, likes, getMediaCardDOM, totalLikes };
}
