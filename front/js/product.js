/*------------------------------------------------------------
lien entre produit de la page d’accueil et de la page Produit
------------------------------------------------------------*/

class Products {
  constructor(id, name, imageUrl, description, altTxt, price, colors) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.altTxt = altTxt;
    this.price = price;
    this.colors = colors;
  }
}

/*obtention de l'id du produit*/
let params = new URLSearchParams(window.location.search);
let productId = params.get("id");

/*définition de l'adresse url de chaque produit grâce à l'id*/
const productUrl = `http://localhost:3000/api/products/${productId}`;
/*saisie des éléments à modifier dans le DOM*/
const headTitle = document.head.getElementsByTagName("title");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const img = document.getElementsByClassName("item__img");
const colorsId = document.getElementById("colors");

/*affichage de la page produit grâce à l'adresse Url*/
fetch(productUrl)
  .then(function (response) {
    return response.json();
  })
  /*Création d'une fonction pour afficher les détails du produit et d'une fonction pour l'ajouter au panier */
  .then(function (data) {
    productCart(data);
    productPages(data);
  });

/*affichage des éléments de la page produit*/
function productPages(data) {
  headTitle[0].innerHTML = data.name;
  title.innerHTML = data.name;
  price.innerHTML = data.price;
  description.innerHTML = data.description;
  img[0].innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
  colorsId.innerHTML += `
  <option>${data.colors[0]}</option>
  <option>${data.colors[1]}</option>
  `;
  if (data.colors.length === 3) {
    colorsId.innerHTML += `
      <option>${data.colors[2]}</option>
      `;
  } else if (data.colors.length === 4) {
    colorsId.innerHTML += `
      <option>${data.colors[3]}</option>
  `;
  }
}

/*Ajout du produit et ses informations au panier avec la fonction productCart*/
function productCart(data) {
  let cartButton = document.getElementById("addToCart");

  /*Création du tableau localCart pour sauvegarder les produits du panier*/
  localCart = localStorage.getItem("cart");
  if (localCart === null) {
    localCart = [];
    localStorage.setItem("cart", JSON.stringify(localCart));
  }
  localCart = localStorage.getItem("cart");
  localCart = JSON.parse(localCart);

  /*Ecoute du bouton "Ajouter au Panier"*/
  cartButton.addEventListener("click", () => {
    let quantities = document.getElementById("quantity");
    let colorsOption = document.getElementById("colors");

    /*Création de l'objet newProduct qui contient les informations du produit ajouté au panier*/
    let newProduct = {
      productId,
      productName: data.name,
      productImg: data.imageUrl,
      productDescription: data.description,
      productTxt: data.altTxt,
      productPrice: data.price,
      productColors: colorsOption.value,
      productQuantity: quantities.value,
    };

    let verif = quantities.value > 0 && quantities.value < 101;
    /*Création de la condition pour gérer l'ajout d'un produit ayant la même couleur et le même id au panier pour augmenter seulement la quantité*/
    if (colorsOption.value != "" && verif) {
      const alreadyIn = localCart.find(
        (obj) =>
          obj.productId === newProduct.productId &&
          obj.productColors === newProduct.productColors
      );
      if (alreadyIn) {
        let fixQuantity =
          parseInt(newProduct.productQuantity) +
          parseInt(alreadyIn.productQuantity);
        alreadyIn.productQuantity = fixQuantity;
        localStorage.setItem("canap", JSON.stringify(localCart));
        alert("Produit ajouté au panier");
      } else {
        localCart.push(newProduct);
        localStorage.setItem("canap", JSON.stringify(localCart));
        alert("Produit ajouté au panier");
      }
    } else {
      alert("Veuillez choisir une couleur/ une quantité");
    }
  });
}
