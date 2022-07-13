/*------------------------------------------------------------
lien entre produit de la page d’accueil et de la page Produit
------------------------------------------------------*/

// utilisation de la méthode window.location.herf pour récuperer l'url de product
let params = new URL(window.location.href).searchParams;
let newID = params.get("id");
console.log(newID);

//récupération des produits dans l'API grâce à la méthode fetch
fetch("http://localhost:3000/api/products/" + newID)
  //Si Api fonction resp.ok en .json
  .then((response) => response.json())

  // Si Api est down alerte "err"
  .catch((err) => {
    console.log(err);
  });
/*-------------------------------------------------------------
        AFFICHAGE PRODUIT  
------------------------------------------------------*/

// fonction des éléments d'un produit

function product(element) {
  // déclaration des variables des éléments
  // Image //
  let imageProduct = docuement.querySelector(".item_img");
  // Titre //
  let tittleProduct = document.querySelector("#tittle");
  // Prix //
  let priceProduct = document.querySelector("#price");
  // Description //
  let descriptionProduct = document.querySelector("#description");
  // Couleurs //
  let selectColors = document.querySelector("#colors");

  //Boucle for of pour choisir un élément
  for (let selectProduct of product) {
    // si on récupere l'id d'un produit du tableau alors on récupére son indice pour accéder aux donnés stockés
    if (idProduct === selectProduct._id) {
      // id Image //
      imageProduct.innerHTML = `<img src=${selectProduct.imageUrl} alt="${selectProduct.altTxt}">`;
      // id Titre //
      tittleProduct.textContent = `${selectProduct.title}`;
      // id Prix //
      priceProduct.textContent = `${selectProduct.price}`;
      // id Description //
      descriptionProduct = `${selectProduct.description}`;
    }
  }
}
