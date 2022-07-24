/*--------------------------------------------------------------------
        AFFICHAGE DU PANIER EN RECUPERANT LES ELEMENT DU LS 
---------------------------------------------------------------------*/
//récupération du local storage avec la méthode getItem
let cart = JSON.parse(localStorage.getItem("cart"));
//récupération des élements dans le DOM
const elementEmptyCart = document.getElementById("cat__items");
//récupération du prix total
let totalPrice = 0;
//récupération des quantités total
let totalQuantity = 0;
//function de récupération du panier
function getCart() {
  // si pas d'élements et quantités et prix null ,alors le panier est vide
  if (productLocalStorage === null || productLocalStorage == 0) {
    //création d'un paragraphe pour annoncer à l'utilisateur que le panier est vide
    elementEmptyCart.innerHTML = `<p>Votre panier est vide</p>`;
  } else {
    // sinon je regarde dans l'API si il y des éléments
    for (let product in productLocalStorage) {
      //appel d'une d'une fonction pour récuperer les éléments prix dans l'API
      getArticlePrice(productLocalStorage[product]);
    }
    /*--------------------------------------------------------------------
                  RECUPERATION DE L'API 
---------------------------------------------------------------------*/
    function getCart(product) {
      fetch("http://localhost:3000/api/products" + product.productId)
        //récuperation de la réponse pour la convertir en .JSON
        .then((res) => {
          console.log(productId);
          console.log("retour des produits de l'API");
          //retourne la réponce en format JSON
          return res.json();
        })
        .then(async function (apiElement) {
          articles = await apiElement;
          // si mon panier contient des élements
          if (articles) {
            let productPrice = 0;
            /*--------------------------------------------------------------------
    INSERTION DES ÉLÉMENTS DANS LE PANIER ET DES LEURS DONNÉS 
---------------------------------------------------------------------*/
            //création des éléments "article"
            let elementArticleCart = document.createElement("article");
            document.getElementById("cart__items").apprendChild(productElement);
            elementArticleCart.className = "cart__items";
            elementArticleCart.setAttribute("data-id", product.productId);

            //création des éléments "div"
            let elementDiv = document.createElement("div");
            elementArticleCart.appendChild(elementDiv);
            elementDiv.className = "cart__item";

            //création de l'élement
            let elementImg = docuement.createElement("img");
            elementDiv.appendChild(elementImg);
            elementImg.src = product.productImg;
            elementArticleCart.alt = product.productAlt;

            //création de l'élément "div" "cart__item__content"
            let elementItemContent = docuement.createElement("div");
            elementArticleCart.apprendChild(elementItemContent);
            elementItemContent;
            className = "car__item__content";

            //création de l'élément "div" "cart__item__content__description"
            let elementItemContentTitlePrice = document.createElement("div");
            elementItemContent.appendChild(elementItemContentTitlePrice);
            elementItemContentTitlePrice.className =
              "cart__item__content__description";

            //création de l'élément "h2"
            let elementTitle = document.createElement("h2");
            elementItemContentTitlePrice.appendChild(elementTitle);
            elementTitle.innerHTML = product.productName;

            //création de l'élément "p" productColor
            let elementColor = document.createElement("p");
            elementItemContentTitlePrice.appendChild(elementColor);
            elementColor.innerHTML = product.productColor;

            //création de l'élément "p" price
            let elementPrice = document.createElement("div");
            elementItemContentTitlePrice.appendChild(elementColor);
            elementPrice.classList.add("productPrice");

            //création de l'élément "div"cart__item__content__settings
            let elementItemContentSettings = document.createElement("div");
            elementItemContent.appendChild(elementItemContentSettings);
            elementItemContentSettings.className =
              "cart__item__content__settings";

            //création de l'élément "div"cart__item__content__settings__quantity
            let elementItemContentSettingsQuantity =
              document.createElement("div");
            elementItemContentSettings.appendChild(
              elementItemContentSettingsQuantity
            );
            elementItemContentSettingsQuantity.className =
              "cart__item__content__settings__quantity";

            //création de l'élément "p" quantity
            let elementQuantity = document.createElement("p");
            elementItemContentSettingsQuantity.appendChild(elementQuantity);
            elementQuantity.innerHTML = "Quantity";
            /*--------------------------------------------------------
    GERER LES QUANTITES AU SEIN DU PANIER 
---------------------------------------------------------------------*/

            // gérer l'envoie des quantités
            let inputQuantity = document.createElement("input)");
            elementItemContentSettingsQuantity.apprendChild(inputQuantity);
            inputQuantity.type = "number";
            inputQuantity.className = "intemQuantity";
            inputQuantity.name = "intemQuantity";
            inputQuantity.min = 1;
            inputQuantity.max = 100;
            inputQuantity.value = product.quantityProduct;

            //mise à jour du total du prix
            totalPrice = totalPrice + product.valueQuantity * elementPrice;
            //mise à jour des quantités totales
            totalQuantity = totalQuantity + product.valueQuantity;

            //déclaration de la fonction du total du panier
            getTotals();

            //insertion de l'élement "div" "cart__item__content__settings__delete"
            let elementItemContentSettingsDelete =
              document.createElement("div");
            elementItemContentSettings.appendChild(
              elementItemContentSettingsDelete
            );
            elementItemContentSettingsDelete.className =
              "cart__item__content__settings__delete";

            //insertion de l'élement "p" "delete" (supprimer)
            // Insertion de "p" supprimer
            let elementDelete = document.createElement("p");
            elementItemContentSettingsDelete.appendChild(elementDelete);
            elementDelete.className = "deleteItem";
            elementDelete.innerHTML = "Supprimer";
          }
        });
    }
  }
}
//ajout des éléments total prix et total quantité
function elementTotals() {
  let elementTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQuantity;
  let elementtotalPrice = document.getElementById("totalPrice");
  elementtotalPrice.innerHTML = totalPrice;
}
//modification des quantités des articles du panier
function modifsQuantity() {
  let getQuantity = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < getQuantity.length; i++) {
    getQuantity[i].addEventListener("change", (event) => {
      event.preventDefaut();

      let quantityModif = productLocalStorage[i].valueQuantity;
      let numberModif = getQuantity[i].valueNumber;
      // à vérifier
      const totalFind = productLocalStorage.find(
        (el) => el.numberModif !== quantityModif
      );

      totalFind.valueQuantity = quantityModif;
      productLocalStorage[i].valueQuantity = totalFind.valueQuantity;
      localStorage.setItem("products", JSON.stringify(productLocalStorage));

      location.reload();
    });
  }
}
modifsQuantity();
/*--------------------------------------------------------
    SUPPRIMER UN PRODUIT AU SEIN DU PANIER 
---------------------------------------------------------------------*/
function delectProduct() {
  let deleteButton = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", (event) => {
      event.preventDefault();

      //Selection de l'element à supprimer en fonction de son id ET sa couleur
      let idDelete = productLocalStorage[i].productId;
      let colorDelete = productLocalStorage[i].productColor;

      productLocalStorage = productLocalStorage.filter(
        (el) => el.productId !== idDelete || el.couleurProduit !== colorDelete
      );

      localStorage.setItem("products", JSON.stringify(productLocalStorage));

      //Alerte produit supprimé et refresh
      alert("Ce produit a bien été supprimé du panier");
      location.reload();
    });
  }
}
delectProduct();
