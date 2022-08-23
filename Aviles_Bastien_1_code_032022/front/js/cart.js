/* Vérification si le localstorage n'est pas vide*/
let cart;
function verifLocalStorage() {
  if (localStorage.getItem("Cart")) {
    cart = JSON.parse(localStorage.getItem("Cart"));
  } else {
    cart = [];
  }
}
verifLocalStorage();
let cartItems = document.getElementById("cart__items");

/* affichage des produits dans le panier */
for (let i = 0; i < cart.length; i++) {
  /* Insertion de l'élément "article" */
  let article = document.createElement("article");
  article.classList.add("cart__item");
  /* Insertion d'une div pour l'image*/
  let cartItemImage = document.createElement("div");
  cartItemImage.classList.add("cart__item__img");
  article.appendChild(cartItemImage);
  /* Insertion de l'image */
  let imageProduct = document.createElement("img");
  imageProduct.src = cart[i].urlImg;
  imageProduct.alt = cart[i].name;
  cartItemImage.appendChild(imageProduct);
  /* Insertion d'une div pour le contenu texte */
  let cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  article.appendChild(cartItemContent);
  /* Insertion d'une div pour la description du produit */
  let cartItemContentDescription = document.createElement("div");
  cartItemContentDescription.classList.add("cart__item__content__description");
  cartItemContent.appendChild(cartItemContentDescription);
  /* Insertion d'un titre h2 pour le nom du produit */
  let nameProduct = document.createElement("h2");
  nameProduct.innerText = cart[i].name;
  cartItemContentDescription.appendChild(nameProduct);
  /* Insertion d'un paragraphe pour la couleur */
  let colorProduct = document.createElement("p");
  colorProduct.innerText = cart[i].color;
  cartItemContentDescription.appendChild(colorProduct);

  /* affichage du prix correspondant au prix de chaque produit dans le panier */
  let priceProduct = document.createElement("p");
  priceProduct.id = "priceProduct" + i;
  cartItemContentDescription.appendChild(priceProduct);
  for (let i = 0; i < cart.length; i++) {
    fetch("http://localhost:3000/api/products/" + cart[i].id)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (product) {
        let idPriceProduct = "priceProduct" + i;
        document.getElementById(idPriceProduct).innerText =
          product.price + " €";
      })
      .catch(function (error) {
        alert(error);
      });
  }
  /* Insertion d'une div pour les éléments de modification */
  let cartItemContentSettings = document.createElement("div");
  cartItemContentSettings.classList.add("cart__item__content__settings");
  cartItemContent.appendChild(cartItemContentSettings);
  /* Insertion d'une div pour modifier la quantité */
  let cartItemContentSettingsQuantity = document.createElement("div");
  cartItemContentSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
  /* Insertion d'une div pour afficher la quantité */
  let productQuantity = document.createElement("p");
  productQuantity.innerText = "Qté :";
  cartItemContentSettingsQuantity.appendChild(productQuantity);
  /* Insertion de la quantité et du nombre des produits au bouton */
  let productQuantityValue = document.createElement("input");
  productQuantityValue.type = "number";
  productQuantityValue.classList.add("itemQuantity");

  /* ajout d'un id pour gérer la modification de la quantité dans le panier */
  productQuantityValue.id = "itemQuantityId" + i;
  productQuantityValue.name = "itemQuantity";
  productQuantityValue.min = "1";
  productQuantityValue.max = "100";
  productQuantityValue.value = cart[i].quantity;
  cartItemContentSettingsQuantity.appendChild(productQuantityValue);
  /* Insertion d'une div pour supprimer un produit */
  let cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
  /* Insertion du bouton supprimer */
  let deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem");
  deleteItem.id = "deleteItem" + i;
  deleteItem.innerText = "Supprimer";
  cartItemContentSettingsDelete.appendChild(deleteItem);

  cartItems.appendChild(article);
}

/* calcul du total de la quantité et du prix */
let totalQuantityCart = 0;
let totalPriceCart = 0;
for (let i = 0; i < cart.length; i++) {
  let quantityId = "itemQuantityId" + i;
  let quantityOneProduct = parseInt(document.getElementById(quantityId).value);
  /* fetch du panier à l'api */
  fetch("http://localhost:3000/api/products/" + cart[i].id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (product) {
      /* appel de la fonction du prix d'un seul produit */ 
      let priceOneProduct = parseInt(product.price);
      let totalPriceOneProduit = priceOneProduct * quantityOneProduct;

      totalQuantityCart = totalQuantityCart + quantityOneProduct;
      totalPriceCart = totalPriceCart + parseInt(totalPriceOneProduit);

      document.getElementById("totalQuantity").innerText = totalQuantityCart;
      document.getElementById("totalPrice").innerText = totalPriceCart;
    })
    .catch(function (error) {
      alert(error);
    });
}

/* gestion de la modification de la quantité dans le panier */
if (localStorage.getItem("Cart")) {
  for (let i = 0; i < cart.length; i++) {
    let quantityId = "itemQuantityId" + i;
    document
      .getElementById(quantityId)
      .addEventListener("change", function (event) {
        let newQuantity = document.getElementById(quantityId).value;
        document.getElementById(quantityId).value = newQuantity;
        cart[i].quantity = document.getElementById(quantityId).value;

        let totalQuantityCart = 0;
        let totalPriceCart = 0;
        for (let i = 0; i < cart.length; i++) {
          fetch("http://localhost:3000/api/products/" + cart[i].id)
            .then(function (res) {
              if (res.ok) {
                return res.json();
              }
            })
            .then(function (product) {
              let priceOneProduct = parseInt(product.price);
              let totalPriceOneProduit =
                priceOneProduct * parseInt(cart[i].quantity);

              totalQuantityCart =
                totalQuantityCart + parseInt(cart[i].quantity);
              totalPriceCart = totalPriceCart + parseInt(totalPriceOneProduit);

              document.getElementById("totalQuantity").innerText =
                totalQuantityCart;
              document.getElementById("totalPrice").innerText = totalPriceCart;
            })
            .catch(function (error) {
              alert(error);
            });
        }
        localStorage.setItem("Cart", JSON.stringify(cart));
        event.stopPropagation();
      });
  }
}

/* gestion de la suppression d'un produit dans le panier */
for (let i = 0; i < cart.length; i++) {
  let deleteButton = document.getElementById("deleteItem" + i);
  deleteButton.addEventListener("click", function (event) {
    if (cart.length === 1) {
      localStorage.removeItem("Cart");
      document.location.reload();
    } else {
      cart[i] = null;
      let newCart = [];
      for (let j = 0; j < cart.length; j++) {
        if (cart[j] != null) {
          newCart.push(cart[j]);
        }
      }
      cart = newCart;
      localStorage.setItem("Cart", JSON.stringify(cart));
    }
    event.stopPropagation();
    document.location.reload();
  });
}

//--------- Gestion du Formulaire de contact -----------------//

/* Expressions régulières Regex */
const regExpText = /^[A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{2,30}$/;
const regExpAddress = /^[0-9A-Za-zÀ-ÖØ-öø-ÿ\-\'\ ]{5,30}$/;
const regExpEmail = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i;

/* Bouton du formulaire et message d'erreur à afficher */
/* pour valider le nom */
let firstName = document.getElementById("firstName");
let firstNameErrorMsgPlace = document.getElementById("firstNameErrorMsg");
let firstNameErrorMsg = "veuillez saisir un nom correct";
/* pour valider le prénom */
let lastName = document.getElementById("lastName");
let lastNameErrorMsgPlace = document.getElementById("lastNameErrorMsg");
let lastNameErrorMsg = "veuillez saisir un prénom correct";
/* pour valider l'adresse */
let address = document.getElementById("address");
let addressErrorMsgPlace = document.getElementById("addressErrorMsg");
let addressErrorMsg = "veuillez saisir une adresse correcte";
/* pour valider le nom de la ville */
let city = document.getElementById("city");
let cityErrorMsgPlace = document.getElementById("cityErrorMsg");
let cityErrorMsg = "veuillez saisir un nom de ville correct";
/* pour valider l'email' */
let email = document.getElementById("email");
let emailErrorMsgPlace = document.getElementById("emailErrorMsg");
let emailErrorMsg = "veuillez saisir une adresse mail correcte";

//écoute et affichage d'un message d'erreur si le format entrée dans l'input est incorrect
let errorsInput = []; // stock un msg d'erreur si la valeur d'un input est incorrecte
function validInput(input, regExp, errorMessagePlace, errorMsg) {
  input.addEventListener("change", function (event) {
    let regexpTest = regExp.test(input.value);
    if (regexpTest === false) {
      errorMessagePlace.innerHTML = errorMsg;
      errorsInput.push(errorMsg);
    } else {
      errorMessagePlace.innerHTML = "";
      errorsInput = errorsInput.filter((id) => id != errorMsg);
    }
  });
}

validInput(firstName, regExpText, firstNameErrorMsgPlace, firstNameErrorMsg);
validInput(lastName, regExpText, lastNameErrorMsgPlace, lastNameErrorMsg);
validInput(address, regExpAddress, addressErrorMsgPlace, addressErrorMsg);
validInput(city, regExpText, cityErrorMsgPlace, cityErrorMsg);
validInput(email, regExpEmail, emailErrorMsgPlace, emailErrorMsg);

//----------- Getsion de la commande -----------//

/*on créé une classe  constructor pour générer l'objet contact */
class contactInfo {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}

/* message d'erreur commande invalide */
function errorMsgOrder(errorMsgValue) {
  let cartOrder = document.querySelector(".cart");
  let errorMsg = document.createElement("p");
  errorMsg.classList.add("errorInputValue");
  errorMsg.style.color = "yellow";
  errorMsg.style.textAlign = "center";
  errorMsg.style.fontSize = "1rem";
  errorMsg.innerHTML = errorMsgValue;
  cartOrder.appendChild(errorMsg);
}

/* Validation des informations de commande à envoyer */
function validOrder() {
  document.getElementById("order").disabled = true;
  document
    .querySelector(".cart__order__form")
    .addEventListener("change", function (event) {
      /* si le panier est vide */
      if (
        cart.length === 0 ||
        firstName.value.length === 0 ||
        lastName.value.length === 0 ||
        address.value.length === 0 ||
        city.value.length === 0 ||
        email.value.length === 0
      ) {
        /* on ne peut pas cliquer sur la bouton */
        if (document.querySelector(".errorInputValue")) {
          return;
          /* alors on retroune un message d'erreur */
        } else {
          document.getElementById("order").disabled = true;
          errorMsgOrder(
            "Impossible de passer une commande, vérifier les informations de votre commande !"
          );
        }
      }

      // sinon les valeurs saisies dans le formulaire ne sont pas corrects
      else {
        /* on s'arrete là */
        event.stopPropagation();
        /* si il y a des erreurs après le clique */
        if (errorsInput.length > 0) {
          /* il y a des erreurs de saisies */
          if (document.querySelector(".errorInputValue")) {
            return;
            /* alors on retourne un message d'erreur */
          } else {
            document.getElementById("order").disabled = true;
            errorMsgOrder(
              "Impossible de passer une commande, vérifier les informations de votre commande !"
            );
          }
          /* sinon on retroune les erreurs */
        } else {
          let cartOrder = document.querySelector(".cart");
          if (document.querySelector(".errorInputValue")) {
            cartOrder.removeChild(document.querySelector(".errorInputValue"));
            document.getElementById("order").disabled = false;
          }
        }
      }
      /* on stop là */
      event.stopPropagation();
    });
}
/* appel de la fonction pour valider la commande */
validOrder();

/* Validation de la commande */
function sendOrder() {
  let submitOrder = document.querySelector(".cart__order__form");
  submitOrder.addEventListener("submit", function (event) {
    if (cart.length > 0 && errorsInput.length === 0) {
      // génère l'objet contact à envoyer à l'API
      let contact = new contactInfo(
        firstName.value,
        lastName.value,
        address.value,
        city.value,
        email.value
      );

      // génération de l'ID des produits dans le panier
      let products = [];
      for (let i = 0; i < cart.length; i++) {
        products.push(cart[i].id);
      }

      // La requête POST pour envoyer la commande
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products }),
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          localStorage.clear();
          let idOrder = value.orderId;
          document.location.href =
            "../html/confirmation.html" + "?id=" + idOrder;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    event.preventDefault();
  });
}

sendOrder();
