//-----récupération du panier dans le LS -----//
function saveBasket(basket) {
  //sérialisation JSON (transforme es objet mon tableau( basket) en string)
  localStorage.setItem("basket", JSON.stringify(basket));
}
//fonction panier
function getBasket() {
  let basket = localStorage.getItem("basket");
  // si mon panier = null
  if (basket == null) {
    // je retourne un panier vide
    return [];
    // sinon je retourne ma string en objet dans mon panier
  } else {
    return JSON.parse(basket);
  }
}

//------Gestion du Formulaire-------//
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

//console.log(displayProducts);

//--------fonction d'ajout au panier-------------//
function addBasket(product) {
  //panier complet
  let basket = getBasket();
  //je recherche dans mon panier si il y a des produits similaire avec find (va chercher un produit par rapport à une condition)
  let findProduct = basket.find((p) => p.id == product.id);
  // si find ne trouve pas d'élement alors = undefined
  if (findProduct != undefined) {
    //j'ajoute +1 à la quantité
    findProduct.quantity++;
    //sinon je défini une quantité par default
  } else {
    product.quantity = 1;
    // je push mon produit dans le basket (panier)
    basket.push(product);
  }
  //on enregistre le nouveau panier
  saveBasket(basket);
}

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

/*

//IMPORTANT : Tu réunis toute tes fonction dans UNE fonction main. C'est ce que tu fais dans le langage C par exemple.
//C'est plus organisé
function main() {
  let array = getBasket(); //tu récupères tes produits
  for (i of array) {
    //tu boucles dans ton tableau
    displayProducts(i); //tu affiches ton article
  }
  document.querySelector(".totalCart").textContent = totalCart(); //Tu affiches ton total
  listenForm(); // tu appelles ta fonction pour faire ton post

  document.querySelector(".delete").addEventListener("click", function () {
    //fonction BONUS pour vider le panier et retourner a l'accueil au cas où
    localStorage.clear();
    window.location.href = "index.html";
  });
}

main(); //T'appeles ton main et c'est FINI.*/
