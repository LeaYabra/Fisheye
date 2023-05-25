// recuperer tout les photographes de photographer.json
// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const { href, name, portrait, id, city, country, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;
  const a = `${href}` + `?id=${id}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const link = document.createElement("a");
    link.setAttribute("href", a);
    link.setAttribute(
      "aria-label",
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
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    h2.textContent = name;
    h3.textContent = city + ", " + country;
    h4.textContent = tagline;
    p.textContent = price + "€/jour";
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(h4);
    article.appendChild(p);
    return article;
  }
<<<<<<< HEAD
  return {name, picture,city,country,tagline,price, getUserCardDOM };
=======
  return { name, picture, city, country, tagline, price, getUserCardDOM };
>>>>>>> 8de4a750003976e6e8d7455bda036d0d3c0740aa
}
