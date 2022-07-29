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
// function pour récupérer les articles
function displayProduct(product) {
  let productBasket = document.getElementById("cart__items");
  productBasket.innerHTML += `<article class="cart__item" data-id=${product.id} data-color=${product.color}>
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
//fonction d'ajout du formulaire
getForm();
function getForm() {
  let form = document.querySelector(".cart__order__form");
  //console.log(form);

  //modification du Prenom
  form.firstName.addEventListener("change", function () {
    validPrenom(this);
  });

  //modification du nom
  form.lastName.addEventListener("change", function () {
    validNom(this);
  });

  //modification de l'adresse
  form.address.addEventListener("change", function () {
    validAdresse(this);
  });

  //modification de la ville
  form.city.addEventListener("change", function () {
    validVille(this);
  });

  //modification de l'email
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //Validation du prenom
  const validPrenom = function (inputFirstName) {
    //creation de la regExp pour la validation du prenom
    let prenomRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

    let testPrenom = prenomRegExp.test(inputFirstName.value);
    console.log(testPrenom);
    let firstNameErrorMsg = inputFirstName.nextElementSibling;
    //si le prénom est renseigné alors j'envoie un message de validation
    if (testPrenom) {
      firstNameErrorMsg.innerHTML = "prénom rensigné";
      // sinon il n'est pas renseigné , j'envoie une demande
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez rentrer votre prénom";
    }
  };
  //Validation du nom
  const validNom = function (inputLastName) {
    //creation de la regExp pour la validation du nom
    let nomRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

    let testNom = nomRegExp.test(inputLastName.value);
    console.log(testNom);
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    //si le nom est ok alors j'envoie un message de validation
    if (testNom) {
      lastNameErrorMsg.innerHTML = "Nom renseigné";
      // sinon il n'est pas renseigné , j'envoie une demande
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez rentrer votre Nom";
    }
  };

  //Validation de l'adresse
  const validAdresse = function (inputAddress) {
    //creation de la regExp pour la validation du nom
    let adresseRegExp = new RegExp(
      "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
    );

    let testAdresse = adresseRegExp.test(inputAddress.value);
    console.log(testAdresse);
    let addressErrorMsg = inputAddress.nextElementSibling;
    //si l'adresse est ok alors j'envoie un message de validation
    if (testAdresse) {
      addressErrorMsg.innerHTML = "Adresse renseignée";
      // sinon elle n'est pas renseignée , j'envoie une demande
    } else {
      addressErrorMsg.innerHTML = "Veuillez rentrer votre adresse";
    }
  };

  //Validation de la ville
  const validVille = function (inputCity) {
    //creation de la regExp pour la validation du nom
    let villeRegExp = new RegExp("^[a-zA-Z ,.'-]+$");

    let testVille = villeRegExp.test(inputCity.value);
    console.log(testVille);
    let cityErrorMsg = inputCity.nextElementSibling;
    //si la ville est ok alors j'envoie un message de validation
    if (testVille) {
      cityErrorMsg.innerHTML = "Ville renseignée";
      // sinon elle n'est pas renseignée , j'envoie une demande
    } else {
      cityErrorMsg.innerHTML = "Veuillez rentrer votre ville";
    }
  };

  //Validation de l'email
  const validEmail = function (inputEmail) {
    //creation de la regExp pour la validation email
    let emailRegExp = new RegExp(
      "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
    );
    let testEmail = emailRegExp.test(inputEmail.value);
    console.log(testEmail);
    let emailErrorMsg = inputEmail.nextElementSibling;
    //si l'adresse mail est ok alors j'envoie un message de validation
    if (testEmail) {
      emailErrorMsg.innerHTML = "Adresse Email renseigné";
    } else {
      // sinon elle n'est pas renseignée , j'envoie une demande
      emailErrorMsg.innerHTML = "Veuillez rentrer une adresse email correct";
    }
  };
}

//fenêtre pop-up
const popupConfirmation = () => {
  if (
    window.confirm(`Votre commande est validée
        Pour consulter votre numéro de commande, veuillez cliquez sur OK`)
  ) {
    window.location.href = "confirmation.html";
  }
};

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
