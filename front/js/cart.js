/* ------------------------------------------------------------------
           récupération du panier dans le LS
--------------------------------------------------------------*/

function saveBasket(basket) {
  //sérialisation JSON (transforme es objet mon tableau( basket) en string)
  localStorage.setItem("cart", JSON.stringify(basket));
}
//fonction panier
function getBasket() {
  let basket = localStorage.getItem("cart");
  // si mon panier = null
  if (basket == null) {
    // je retourne un panier vide
    return [];
    // sinon je retourne ma string en objet dans mon panier
  } else {
    return JSON.parse(basket);
  }
}
// function pour récupérer les article
function displayProduct(product) {
  let produitPanier = document.getElementById("cart__items");
  produitPanier.innerHTML += `<article class="cart__item" data-id=${product.id} data-color=${product.color}>
  <div class="cart__item__img">
    <img src=${product.imageUrl} alt = ${product.altTxt}>
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${product.color}</p>
      <p>${product.price}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : ${product.quantity}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;
  // continuer l'articleData pour contenir toutes les données article du produit (image etc)
}

/* ------------------------------------------------------------------
           Gestion des produits du panier
--------------------------------------------------------------*/
//--------fonction pour supprimer un produit du panier-------//
function removeFrombasket(product) {
  // pour çà je prend mon panier complet
  let basket = getBasket();
  //j'utilise la méthode filter pour filtrer mon tableau (basket) et retirer l'id qui n'a pas la valeur product
  basket = basket.filter((p) => p.id != product.id);
  //je retire un produit
  saveBasket(basket);
}
function changeQuantity(product, quantity) {
  let basket = getBasket();
  //je recherche dans mon panier un produit
  let findProduct = basket.find((p) => p.id == product.id);
  // si le produit est trouver, je change sa quantité
  if (findProduct != undefined) {
    findProduct.quantity += quantity;
    // si la quantité du produit est de zéro
    if (findProduct.quantity <= 0) {
      //je supprime mon produit du panier
      removeFrombasket(findProduct);
    } else {
      //sinon on enregistre si le produit à été supprimer
      saveBasket(basket);
    }
  }
}

//-----Gestion de la quantité du panier--------//
//fonction de récupération de la quantité du panier
function getNumberProduct() {
  //je récupère mon panier
  let basket = getBasket();
  // mon nombre égal 0
  let number = 0;
  // je fais une boucle for of pour parcourir mon panier
  for (let product of basket) {
    //
    number += product.quantity;
  }
  //je retourne la quantité
  return number;
}

//------Gestion des prix du panier------------//
//fonction de récupération du prix total du panier
function getTotalPrice() {
  //je récupère mon panier
  let basket = getBasket();
  let total = 0;
  // je fais une boucle for of pour parcourir mon panier
  for (let product of basket) {
    total += product.quantity * product.price;
  }
  //je retourne la quantité
  return total;
}

/* ------------------------------------------------------------------
           Gestion du Formulaire
--------------------------------------------------------------*/
//Fonction d'écoute du formulaire et methode POST vers l'api
function listenForm() {
  //ici ton code pour faire ton POST

  //récupération de mon boutton grace à
  //méthode addEventListener au clik du boutton pour valider le formulaire.
  document
    .querySelector('#form > [type="submit"]')
    //fonction avec la valeur qui représentera cet événement
    .addEventListener("click", function (event) {
      // récupération de mon formulaire sauf le submit qui m'interesse pas de vérifier
      for (let input of document.querySelectorAll(
        '#form > input:not([type="submit"]'
      ));
      {
        inout.reportValidity();
      }
    });
}

//réunis toutes les fonctions dans UNE fonction main
function main() {
  //récupèration des produits
  let basketProducts = getBasket();
  console.log(basketProducts);

  let productsData = [];
  //boucle for of dans le tableau
  for (product of basketProducts) {
    //affichage des articles
    displayProduct(product);
  }
  document.querySelector("basket").textContent = basket(); //Tu affiches ton total
  listenForm(); //appel de la fonction pour faire ma requete post

  //------------ Clear mon panier et retour à l'acceuil---------------//
  document.querySelector(".delete").addEventListener("click", function () {
    //fonction BONUS pour vider le panier et retourner a l'accueil au cas où
    localStorage.clear();
    window.location.href = "index.html";
  });
}

main();
