/*-----------------------------------------------------
                AFFICHAGE LOCAL STORAGE ET DU PANIER
------------------------------------------------------*/
//récupération du local storage avec la méthode getItem
let cart = JSON.parse(localStorage.getItem("cart"));

//affichage de mon panier pour afficher les element de mon DOM grace à getItem qui va chercher le parent
const productItems = JSON.parse(localStorage.getItem("cart__items"));
// affichage de tous les éléments dans mon panier, ainsi que les donnés de chacuns
async function displayCart() {
  //utilisation de la fonction DOMParser pour regarder les éléments dans mon DOM
  const parserDom = new DOMParser();
  const emptyCart = document.getElementById("cart__items");
  let arrayCart = [];
  //si mon panier est vide
  if (cart === null || cart === 0) {
    emptyCart.textContent = "Votre panier est vide";
  } else {
    // sinon il y a des produits dans le panier
    console.log("Des produits sont présents dans le panier");
  }
  //alors , je boucle pour vérifier si le LS contient des produits
  for (i = 0; i < cart.length; i++) {
    const products = getProductId(cart[i].id);
    const totalPrice = (products.price *= cart[i].quantity);
    arrayCart += `<article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
    <div class="cart__item__img">
        <img src="${products.imageUrl}" alt="${products.altTxt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${products.name}</h2>
            <p>${cart[i].color}</p>
            <p>Prix unitaire: ${products.price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
              <p id="quantité">
                Qté : <input data-id= ${cart[i].id} data-color= ${cart[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cart[i].quantity}>
              </p>
              <p id="sousTotal">Prix total pour cet article: ${totalPrice}€</p> 
          </div>
          <div class="cart__item__content__settings__delete">
            <p data-id= ${cart[i].id} data-color= ${cart[i].color} class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </div>
    </article>`;
  }
  // affichage du nombre de produits et du prix total de mon panier
  // variable du prix et de la quantité
  let totalQuantity = 0;
  let totalPrice = 0;

  for (i = 0; i < cart.length; i++) {
    const productsCart = getElementById(cart[i].id);
    totalQuantity += parseInt(products.price * cart[i].quantity);
    totalPrice += parseInt(article.price * cart[i].quantity);
    console.log(totalQuantity);
    console.log(totalPrice);
  }
  // récupération des quantités et des prix
  document.getElementById("totalQuantity").innerHTML = totalQuantity;
  document.getElementById("totalPrice").innerHTML = totalPrice;
  // si il y a des éléments dans mon panier, alors je les envoie dans mon tableau
  if (i == cart.length) {
    const displayCartParser = parserDom.parseFromString(arrayCart, "text/html");
    emptyCart.appendChild(displayCartParser.body);
    changeQuantity();
    supArticles();
  }
}
