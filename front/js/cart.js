/*Récupération des produits enregistrés dans le localStorage*/
let productCart = localStorage.getItem("cart");
productCart = JSON.parse(productCart);

/*Création d'un tableau pour afficher les produits ajoutés dans le panier*/
let recapProduct = document.getElementById("cart__items");
let cartArray = [];

/*Création de la condition pour vérifier si le panier est vide*/
if (productCart == 0 || productCart === null) {
  const quantityTotal = document.getElementById("totalQuantity");
  quantityTotal.innerHTML = "0";
  const priceTotal = document.getElementById("totalPrice");
  priceTotal.innerHTML = "0";
  alert("Le panier est vide");
  /*Affichage du panier si un produit est présent dans le localStorage*/
} else {
  for (let product in productCart) {
    /*Insertion de l'élément "article"*/
    let cartArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(cartArticle);
    cartArticle.className = "cart__item";
    cartArticle.setAttribute("data-id", productCart[product].productId);

    /*Insertion d'une div pour l'image*/
    let cartDivImg = document.createElement("div");
    cartArticle.appendChild(cartDivImg);
    cartDivImg.className = "cart__item__img";

    /*Insertion de l'image*/
    let cartImg = document.createElement("img");
    cartDivImg.appendChild(cartImg);
    cartImg.src = productCart[product].productImg;
    cartImg.alt = productCart[product].productTxt;

    /*Insertion d'une div pour le contenu texte*/
    let cartItemContent = document.createElement("div");
    cartArticle.appendChild(cartItemContent);
    cartItemContent.className = "cart__item__content";

    /*Insertion d'une div pour le titre et le prix*/
    let titlePrice = document.createElement("div");
    cartItemContent.appendChild(titlePrice);
    titlePrice.className = "cart__item__content__titlePrice";

    /*Insertion d'un titre h2 pour le nom du produit*/
    let productTitle = document.createElement("h2");
    titlePrice.appendChild(productTitle);
    productTitle.innerHTML = productCart[product].productName;

    /*Insertion d'un paragraphe pour la couleur*/
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = productCart[product].productColors;
    productColor.style.fontSize = "20px";

    /*Insertion d'un paragraphe pour le prix*/
    let productCartPrice = document.createElement("p");
    titlePrice.appendChild(productCartPrice);
    productCartPrice.innerHTML = productCart[product].productPrice + " €";

    /*Insertion d'une div pour les éléments de modification*/
    let contentSettings = document.createElement("div");
    cartItemContent.appendChild(contentSettings);
    contentSettings.className = "cart__item__content__settings";

    /*Insertion d'une div pour modifier la quantité*/
    let settingsQuantity = document.createElement("div");
    contentSettings.appendChild(settingsQuantity);
    settingsQuantity.className = "cart__item__content__settings__quantity";

    /*Insertion d'une div pour afficher la quantité*/
    let productQty = document.createElement("p");
    settingsQuantity.appendChild(productQty);
    productQty.innerHTML = "Qté : ";

    /*Insertion de la quantité*/
    let productQuantities = document.createElement("input");
    settingsQuantity.appendChild(productQuantities);
    productQuantities.value = productCart[product].productQuantity;
    productQuantities.className = "itemQuantity";
    productQuantities.setAttribute("type", "number");
    productQuantities.setAttribute("min", "1");
    productQuantities.setAttribute("max", "100");
    productQuantities.setAttribute("name", "itemQuantity");

    /*Insertion d'une div pour supprimer un produit*/
    let deleteItem = document.createElement("div");
    contentSettings.appendChild(deleteItem);
    deleteItem.className = "cart__item__content__settings__delete";

    /*Insertion du bouton supprimer*/
    let deleteItemP = document.createElement("p");
    deleteItem.appendChild(deleteItemP);
    deleteItemP.className = "deleteItem";
    deleteItemP.innerHTML = "Supprimer";
  }
}

/*Création de la fonctionnalité supprimer pour supprimer un produit directement dans le panier*/
let deleteProduct = Array.from(document.querySelectorAll(".deleteItem"));
for (let j = 0; j < deleteProduct.length; j++)
  [
    deleteProduct[j].addEventListener("click", (event) => {
      event.preventDefault();

      let idToDelete = productCart[j].productId && productCart[j].productColors;

      productCart = productCart.filter(
        (obj) => obj.productId && obj.productColors !== idToDelete
      );

      localStorage.setItem("cart", JSON.stringify(productCart));

      alert("Le produit a été supprimé");

      window.location.href = "cart.html";
    }),
  ];

/*Création de la fonctionnalité pour modifier la quantité  directement dans le panier*/
let selectQuantity = Array.from(document.querySelectorAll(".itemQuantity"));
for (let k = 0; k < selectQuantity.length; k++)
  [
    selectQuantity[k].addEventListener("change", () => {
      productCart[k].productQuantity = parseInt(selectQuantity[k].value);

      localStorage.setItem("cart", JSON.stringify(productCart));

      window.location.href = "cart.html";
    }),
  ];

/*Calcul du prix total du panier en fonction de la quantité et des prix des produits*/
let totalPrice = [];
for (let l = 0; l < productCart.length; l++) {
  let cartPrice = productCart[l].productQuantity * productCart[l].productPrice;

  totalPrice.push(cartPrice);
}
const addition = (accumulator, currentValue) => accumulator + currentValue;
const finalCartPrice = totalPrice.reduce(addition, 0);
const totalHtml = document.getElementById("totalPrice");
totalHtml.innerHTML = finalCartPrice;

let totalQuantity = [];
for (let m = 0; m < productCart.length; m++) {
  let cartQuantity = parseInt(productCart[m].productQuantity);

  totalQuantity.push(cartQuantity);
}
const finalCartQuantity = totalQuantity.reduce(addition);
const totalProductHtml = document.getElementById("totalQuantity");
totalProductHtml.innerHTML = finalCartQuantity;

/*Création d'expression régulières pour controler les entrées des utilisateurs dans le formulaire*/
const regExpName = /[A-Z][a-zéèêàçï-]+$/;
const regExpadress = /[0-9]+\s[a-z]+\s[a-zéèêçàï\s\-]+$/;
const regExpEmail = /[a-z0-9\.\-\_]+@[a-z]+\.[a-z]{2,3}$/;

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

/*Ecoute de chaque input du formulaire pour controler si l'utilisateur respecte bien le champ indiqué
Enregistrement des entrées dans le tableau info*/
firstName.addEventListener("input", (event) => {
  event.preventDefault();
  if (regExpName.test(firstName.value) === false || firstName.value === "") {
    document.getElementById("firstNameErrorMsg").innerHTML = "Entrée invalide";
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  }
});
lastName.addEventListener("input", (event) => {
  event.preventDefault();
  if (regExpName.test(lastName.value) === false || lastName.value === "") {
    document.getElementById("lastNameErrorMsg").innerHTML = "Entrée invalide";
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
  }
});
address.addEventListener("input", (event) => {
  event.preventDefault();
  if (regExpadress.test(address.value) === false || address.value === "") {
    document.getElementById("addressErrorMsg").innerHTML = "Entrée invalide";
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
  }
});
city.addEventListener("input", (event) => {
  event.preventDefault();
  if (regExpName.test(city.value) === false || city.value === "") {
    document.getElementById("cityErrorMsg").innerHTML = "Entrée invalide";
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
  }
});
email.addEventListener("input", (event) => {
  event.preventDefault();
  if (regExpEmail.test(email.value) === false || email.value === "") {
    document.getElementById("emailErrorMsg").innerHTML = "Entrée invalide";
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
  }
});

/*Ecoute du bouton "Commander" pour passer la commande*/
let orderBtn = document.getElementById("order");
orderBtn.addEventListener("click", (event) => {
  event.preventDefault();
  /*Création de l'objet newContact pour enregistré les infos du formualire*/
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  /*Création condition pour véririfer que toutes les entrées du formulaire sont remplies*/
  if (
    regExpName.test(firstName.value) === false ||
    regExpName.test(lastName.value) === false ||
    regExpadress.test(address.value) === false ||
    regExpName.test(city.value) === false ||
    regExpEmail.test(email.value) === false
  ) {
    alert("Formulaire incorrect");
  } else if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    alert("Formulaire incomplet");
  } else {
    /*Transmission des id des produits présents dans le panier en les enregistrant dans le tableau items*/
    let products = [];
    productCart.forEach((orderBtn) => {
      products.push(orderBtn.productId);
    });
    /*Création variable contenant les infos du formulaire et les id des produits du panier*/
    let sendOrder = { contact, products };
    console.log(sendOrder);
    /*Création d'une requête pour envoyer les données au serveur*/
    fetch(`http://localhost:3000/api/products/order`, {
      method: "POST",
      body: JSON.stringify(sendOrder),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      /*Récupération de la réponse du serveur*/
      .then((res) => {
        return res.json();
      })
      .then((content) => {
        window.location.href =
          "../html/confirmation.html?orderId=" + content.orderId;
      });
  }
});
