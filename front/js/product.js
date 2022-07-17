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
  .then((response) => {
    return response.json();
  })
  .then((promise) => {
    itemsData = promise;
    console.log(itemsData);
  })

  // Si Api est down alerte "err"
  .catch((error) => {
    alert(error);
    console.log(error);
  });
/*-------------------------------------------------------------
        AFFICHAGE PRODUIT  
------------------------------------------------------*/

// fonction AFFICHAGE d'un produit

function product(element) {
  // déclaration des variables des éléments du DOM
  // Image //
  let imageProduct = document.querySelector(".item_img");
  // Titre //
  let tittleProduct = document.querySelector("#tittle");
  // Prix //
  let priceProduct = document.querySelector("#price");
  // Description //
  let descriptionProduct = document.querySelector("#description");
  // Couleurs //
  let selectColors = document.querySelector("#colors");

  //Boucle for of pour integrer l'id d'un élément choisi
  for (let selectProduct of product) {
    // si on récupere l'id d'un produit du tableau alors on récupére son indice pour accéder aux donnés stockés
    if (idProduct === selectProduct._id) {
      //-------- ajout éléments de facon dynamique ------------//
      // id Image //
      imageProduct.innerHTML = `<img src=${selectProduct.imageUrl} alt="${selectProduct.altTxt}">`;
      // id Titre //
      tittleProduct.textContent = `${selectProduct.title}`;
      // id Prix //
      priceProduct.textContent = `${selectProduct.price}`;
      // id Description //
      descriptionProduct = `${selectProduct.description}`;

      //Boucle for of pour chercher les différentes couleurs ( en fonction de sa valeur et de sa clef)
      for (let selectColors of selectProduct.colors) {
        // option de couleurs en fonction des valeurs
        selectColors.innerHTML += `<option value="${selectColors}">${selectColors}</option`;

        console.log("afficher les couleurs disponible du kanap");
        console.log(selectColors);
      }
    }
  }
}
/* ------------------------------------------------------------------
                  AFFICHAGE DES COULEURS
--------------------------------------------------------------*/
//déclare mes variables
let visuColor = document.querySelector("#colors");
// écoute ce qu'il se passe
visuColor.addEventListener("input", (event) => {
  let produitColor;
  //récupere la valeur de la couleur choisie
  produitColor = event.target.value;

  console.log("affichage de la couleur choisie");
  console.log(produitColor);
});

/* ------------------------------------------------------------------
                  AFFICHAGE DES QUANTITÉS
--------------------------------------------------------------*/
//déclare mes variables
let visuQuantity = document.querySelector("#quantity");
let produitQuantity;
// écoute ce qu'il se passe
visuQuantity.addEventListener("input", (event) => {
  //récupere la valeur de la quantité choisie
  produitQuantity = event.target.value;

  console.log("affichage quantité choisie");
  console.log(produitQuantity);
});
// Attribution de la valeur minimale pour passer de 0 à 1 dans id quantity value du HTML et afficher 1 article de base
let minArticle = document.getElementById("quantity");
minArticle.value = 1;

/* ------------------------------------------------------------------
                  AJOUT PRODUIT DANS LE PANIER
--------------------------------------------------------------*/
// envoi au panier au clik du boutton les options choisies par l'utilisateur
let pushToBasket = (product) => {
  button.addEventListener("clik", (event) => {
    event.preventDefault();

    if (selectColors.value == false) {
      confirm("Veuillez sélectionner une couleur");
    } else if (selectQuantity.value == 0) {
      confirm("Veuillez sélectionner le nombre d'articles souhaités");
    } else {
      alert("Votre article a bien été ajouté au panier");
    }
    // Récupération des informations du produit sélectionné
    let selectProduct = {
      id: product._id,
      name: product.name,
      img: product.imageUrl,
      altTxt: product.altTxt,
      description: product.description,
      color: selectColors.value,
      quantity: parseInt(selectQuantity.value, 10),
    };
    console.log(selectProduct);
  });
};
