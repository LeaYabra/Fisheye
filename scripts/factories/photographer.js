//recuperer tout les photographes de photographer.json
function photographerFactory(data) {
    const { href,name, portrait,id, city, country,tagline,price} = data;
    
    const picture = `assets/photographers/${portrait}`;
    const a = `${href}`+`?id=${id}`;  

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const link = document.createElement( 'a' );
        link.setAttribute("href",a);
        link.setAttribute("aria-label",'aller sur la page de '+ name+', '+city+ ', '+ tagline+', '+price+'€ par jour')
        img.setAttribute("src", picture);
        img.setAttribute("alt",name);
        const h2 = document.createElement( 'h2' );
        const h3 = document.createElement('h3');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        h2.textContent = name;
        h3.textContent= city+", "+country;
        h4.textContent = tagline;
        p.textContent =price+"€/jour";
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(p);
        return (article);
    }
    return {name, picture,city,country,tagline,price, getUserCardDOM }
}
