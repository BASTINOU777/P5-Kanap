/*------------------------------------------------------------
lien entre produit de la page d’accueil et de la page Produit
------------------------------------------------------------*/

/* récupèration de la valeur de l'id du lien */
let idProduit = new URL(location.href).searchParams.get("id");

(async function () {
  const product = await getProduct();
  addProductToProductPage(product);
})();

/* récupération des données d'un produit depuis l'api */
async function getProduct() {
  return fetch("http://localhost:3000/api/products/" + idProduit)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (product) {
      return product;
    })
    .catch(function (error) {
      alert(error);
    });
}

/* insertion d'un produit et ses détails dans la page produit */
function addProductToProductPage(product) {
  let imageProduct = document.createElement("img");
  imageProduct.alt = product.altTxt;
  imageProduct.src = product.imageUrl;

  let nomProduct = product.name;
  let prixProduct = product.price;
  let descrisptionProduct = product.description;

  let colorsProduct = product.colors;
  let i = 0;
  /* on boucle tant que le nombre de couleurs est disponible */
  while (i < colorsProduct.length) {
    let color = document.createElement("option");
    color.innerText = colorsProduct[i];
    document.getElementById("colors").appendChild(color);
    i++;
  }

  document.querySelector(".item__img").appendChild(imageProduct);

  document.getElementById("title").innerText = nomProduct;

  document.getElementById("price").innerText = prixProduct;

  document.getElementById("description").innerText = descrisptionProduct;
}

//----- Ajout d'un produit au panier ------//

let addToCart = document.getElementById("addToCart");
let cart = [];

/* on créé une classe pour le nouveau produit à ajouter au panier */
class addNewProductToCart {
  constructor(id, urlImg, name, quantity, color) {
    this.id = id;
    this.urlImg = urlImg;
    this.name = name;
    this.quantity = quantity;
    this.color = color;
  }
}

(async function () {
  const product = await getProduct();
  let idProductAddToCart = await getIdProductAddToCart(product);
  let urlImgProductAddToCart = await getUrlImgProductAddToCart(product);
  let nameProductAddToCart = await getNameProductAddToCart(product);
  pressAddToCart(
    idProductAddToCart,
    urlImgProductAddToCart,
    nameProductAddToCart
  );
})();

/* récuperation de l'id du produit */
function getIdProductAddToCart(product) {
  return product._id;
}

/* récuperation de l'URL de l'image du produit */
function getUrlImgProductAddToCart(product) {
  return product.imageUrl;
}

/* récuperation du nom du produit */
function getNameProductAddToCart(product) {
  return product.name;
}

/* message d'erreur quantité incorrecte */
function displayMessageErrorQuantity() {
  if (document.querySelector(".messageErrorQuantity")) {
    return;
  } else {
    /* sinon code en dur message d'erreur */
    let quantity = document.querySelector(".item__content__settings__quantity");
    let messageError = document.createElement("p");
    messageError.classList.add("messageErrorQuantity");
    messageError.style.color = "red";
    messageError.style.fontSize = "13px";
    messageError.innerHTML = "veuillez choisir une bonne quantité !";

    quantity.appendChild(messageError);
  }
}

/* message d'erreur couleur incorrecte */
function displayMessageErrorColor() {
  if (document.querySelector(".messageErrorColor")) {
    return;
  } else {
    /* sinon code en dur message d'erreur */
    let color = document.querySelector(".item__content__settings__color");
    let messageError = document.createElement("p");
    messageError.classList.add("messageErrorColor");
    messageError.style.color = "red";
    messageError.style.fontSize = "13px";
    messageError.innerHTML = "veuillez choisir une bonne couleur !";

    color.appendChild(messageError);
  }
}

/* message de confirmation d'ajout au panier */
function displayMessageSuccessAddToCart() {
  if (document.querySelector(".successMessage")) {
    return;
  } else {
    /* sinon code en dur message d'erreur */
    let intemContent = document.querySelector(".item__content");
    let SuccessMessage = document.createElement("p");
    SuccessMessage.classList.add("successMessage");
    SuccessMessage.style.backgroundColor = "white";
    SuccessMessage.style.color = "blue";
    SuccessMessage.style.padding = "15px";
    SuccessMessage.style.marginTop = "5%";
    SuccessMessage.style.borderRadius = "35px";
    SuccessMessage.style.fontSize = "15px";
    SuccessMessage.style.textAlign = "center";
    SuccessMessage.innerHTML =
      "Merci votre article a été ajouté avec succès au panier !";

    intemContent.appendChild(SuccessMessage);
  }
}

/* On vérifie si le produit à ajouter existe déjà dans le panier, si oui on incrémente sa quantité */
function checkProductExistes(cart, product) {
  cart = JSON.parse(localStorage.getItem("Cart"));
  for (let i = 0; i < cart.length; i++) {
    let productId = cart[i].id;
    let productColor = cart[i].color;
    let productQuantity = parseInt(cart[i].quantity);

    let idProductAdd = product.id;
    let colorProductAdd = product.color;
    let quantityProductAdd = parseInt(product.quantity);

    if (productId === idProductAdd && productColor === colorProductAdd) {
      productQuantity = productQuantity + quantityProductAdd;
      cart[i].quantity = productQuantity;

      let stringCart = JSON.stringify(cart);
      localStorage.setItem("Cart", stringCart);
      return;
    }
  }
  cart.push(product);
  let stringCart = JSON.stringify(cart);
  localStorage.setItem("Cart", stringCart);
}

/* ajout du produit dans le localStorage */
function pressAddToCart(
  idProductAddToCart,
  urlImgProductAddToCart,
  nameProductAddToCart
) {
  addToCart.addEventListener("click", function (event) {
    //modification de la couleur
    let getColor = document.getElementById("colors");
    getColor.addEventListener("change", function (event) {
      let colorSelect = getColor.options[getColor.selectedIndex].text;
      getColor.value = colorSelect;
      event.stopPropagation();
    });
    let colorSelect = getColor.value;

    /* on vérifie que la bonne couleur soit selectionnée, sinon on affiche un message d'erreur */
    if (colorSelect === "--SVP, choisissez une couleur --") {
      displayMessageErrorColor();
      return false;
    }

    /* modification de la quantité*/
    let getQuantity = document.getElementById("quantity");
    getQuantity.addEventListener("change", function (event) {
      let newQuantity = getQuantity.value;
      getQuantity.value = newQuantity;
      event.stopPropagation();
    });
    let quantityValue = getQuantity.value;

    /* on vérifie qu'une bonne quantité est saisie, sinon on affiche un message d'erreur*/
    const termQuantityAccept = /^[1-9]\d*$/; //regex sur les nombres réels differents de 0
    let verifQuantity = termQuantityAccept.test(quantityValue);
    if (verifQuantity == false) {
      displayMessageErrorQuantity();
      return false;
    }

    /* création d'un nouvel objet de produit à ajouter au panier*/
    let productAddToCart = new addNewProductToCart(
      idProductAddToCart,
      urlImgProductAddToCart,
      nameProductAddToCart,
      quantityValue,
      colorSelect
    );

    /* vérification qu'il y a bien des articles dans le panier. Si oui on les recupère avant d'ajouter le nouveau produit*/
    if (localStorage.getItem("Cart")) {
      checkProductExistes(cart, productAddToCart);
    } else {
      cart.push(productAddToCart);
      let stringCart = JSON.stringify(cart);
      localStorage.setItem("Cart", stringCart);
    }

    /* on affiche un message de confirmation d'ajout au panier */
    displayMessageSuccessAddToCart();
    event.stopPropagation;
  });
}
