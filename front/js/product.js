/*------------------------------------------------------------
lien entre produit de la page d’accueil et de la page Produit
------------------------------------------------------*/
// utilisation de la méthode URLSearchParams pour récuperer l'iD du produit
const getProductId = () => {
  //nous retourne l'URL
  return new URL(location.href).searchParams.get("id");
};
const productId = getProductId();

//récupération des produits dans l'API grâce à la méthode fetch
fetch(`http://localhost:3000/api/products/${productId}`)
  //Si Api fonction resp.ok en .json
  .then((response) => response.json())
  .then((dataBase) => {
    registerProductOnLocalStorage(dataBase);
    selectProduct(dataBase);
  })
  .catch((error) => {
    alert(error);
  });

/*-------------------------------------------------------------
        AFFICHAGE PRODUITS
------------------------------------------------------*/

//selection de l'iD Colors
const selectColors = document.querySelector("#colors");
//selection del'iD Quantity
const selectQuantity = document.querySelector("#quantity");
// ajout du bouton Ajouter au panier
const button = document.querySelector("#addToCart");

//fonction qui récupère les données de ma promesse dataBase
let selectProduct = (dataBase) => {
  //ajout des données HTML
  document.querySelector("head > title").textContent = dataBase.title;
  document.querySelector(
    ".item__img"
  ).innerHTML += `<img src="${dataBase.imageUrl}" alt="${dataBase.altTxt}">`;
  //ajout prix, titre et description
  document.querySelector("#price").textContent += dataBase.price;
  document.querySelector("#title").textContent += dataBase.title;
  document.querySelector("#description").textContent += dataBase.description;

  //Boucle for of pour chercher les différentes couleurs ( en fonction de sa valeur et de sa clef) dans le HTML
  for (let color of dataBase.colors) {
    //création d'un élément "option"
    let option = document.createElement("option");
    // option de couleurs en fonction des valeurs
    option.innerHTML = `${color}`;
    option.value = `${color}`;
    selectColors.appendChild(option);

    console.log("afficher les couleurs disponible du kanap");
    console.log(option);
  }
};
/* ------------------------------------------------------------------
                  AJOUT OBJET ET BOUTON
--------------------------------------------------------------*/
let registerProductOnLocalStorage = (dataBase) => {
  //utilisation de la méthode addEventListener pour ajouter le clik du bouton
  button.addEventListener("clik", (event) => {
    event.preventDefault();

    if (selectColors.value == false) {
      confirm("Veuillez selectionner une couleur");
    } else if (selectQuantity.value == 0) {
      confirm("Veuillez sélectionner le nombre d'articles souhaités");
    } else {
      alert("Votre article a bien été ajouté au panier");
      /* ------------------------------------------------------------------
                  AJOUT PRODUIT DANS LE PANIER
--------------------------------------------------------------*/
      //on récupère les valeurs des produits du panier
      let selectProduct = {
        name: dataBase.title,
        id: dataBase._id,
        img: dataBase.imageUrl,
        altTxt: dataBase.altTxt,
        description: dataBase.description,
        color: dataBase.value,
        qantity: parseInt(selectQuantity.value, 10),
      };
      console.log(selectProduct);

      /* ------------------------------------------------------------------
                  AJOUT DU LOCAL STORAGE
--------------------------------------------------------------*/

      // récupération des valeurs des produits dans le local storage , utilisation de JSON.parse pour convertir les données json du LS en éléments JS
      let basket = JSON.parse(localStorage.getItem("cart"));
      // si il y à un produit dans le LS
      if (basket) {
        console.log("il y a des articles dans le panier,on compare les donnés");
        //utilisation de la méthode find pour analyser les options des articles
        let articles = basket.find(
          (articles) =>
            articles.id == selectProduct.id &&
            articles.color == selectProduct.color
        );
        //si oui, ajout nouvelle quantité et , mise à jour du totalprice
        if (articles) {
          articles.totalPrice += articles.price * selectProduct.quantity;
          articles.totalQuantity = articles.quantity + selectProduct.quantity;
          localStorage.setItem("cart", JSON.stringify(basket));
          console.log("Quantité ajouté au panier");
          return;
        }
        //si pas d'ajout de quantités , alors on push le prochain article dans le panier
        basket.push(selectProduct);
        localStorage.setItem("cart", JSON.stringify(basket));
        console;
        log("produits ajoutés au panier");
      } // sinon création d'un tableau, et on push "selectProduct"
      else {
        let localStorageTable = [];
        localStorageTable.push(selectProduct);
        localStorage.setItem("cart", JSON.stringify(localStorageTable));
        console.log("panier vide, veuillez ajouté un article");
      }
    }
  });
};
