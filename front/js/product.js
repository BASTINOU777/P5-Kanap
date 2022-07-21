/*------------------------------------------------------------
lien entre produit de la page d’accueil et de la page Produit
------------------------------------------------------------*/

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
    //appel function de l'affichage des produits de l'API
    registerProductOnLocalStorage(dataBase);
    selectProduct(dataBase);
  })
  .catch((error) => {
    alert(error);
  });

/*-----------------------------------------------------
                AFFICHAGE PRODUITS
------------------------------------------------------*/

//initialisation des variable dans le DOM
const selectColors = document.querySelector("#colors");
const selectQuantity = document.querySelector("#quantity");
const button = document.querySelector("#addToCart");
let selectProduct = (dataBase) => {
  document.querySelector("head > title").textContent = dataBase.name;
  document.querySelector(
    ".item__img"
  ).innerHTML += `<img src="${dataBase.imageUrl}" alt="${dataBase.altTxt}">`;
  //ajout prix, titre et description
  document.querySelector("#price").textContent += dataBase.price;
  document.querySelector("#title").textContent += dataBase.name;
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
//function appel produits de l'API
let registerProductOnLocalStorage = (dataBase) => {
  //utilisation de la méthode addEventListener pour ajouter le clik du bouton
  button.addEventListener("click", (event) => {
    event.preventDefault();

    if (selectColors.value == false) {
      confirm("Veuillez selectionner une couleur");
    } else if (selectQuantity.value == 0) {
      confirm("Veuillez sélectionner le nombre d'articles souhaités");
    } else {
      alert("Votre article a bien été ajouté au panier");
      /* ------------------------------------------------------------------
                  AJOUT PRODUIT DANS LE PANIER ET LOCAL STORAGE
--------------------------------------------------------------*/
      //on récupère les valeurs des produits dans le local storage
      let selectProduct = {
        name: dataBase.name,
        id: dataBase._id,
        img: dataBase.imageUrl,
        altTxt: dataBase.altTxt,
        description: dataBase.description,
        color: dataBase.value,
        quantity: parseInt(selectQuantity.value, 10),
      };
      console.log(selectProduct);

      // on récupère les valeurs des produits dans le local storage  et on les ajoute au panier
      // utilisation de JSON.parse pour convertir les données json du LS en éléments JS
      let basket = JSON.parse(localStorage.getItem("cart"));

      // si il y à un produit dans le panier
      if (basket) {
        console.log("il y a des articles dans le panier,on compare les donnés");

        //on se sert de la méthode find pour comparer les options des produits dans le LS
        let articles = basket.find(
          (articles) =>
            articles.id == selectProduct.id &&
            articles.color == selectProduct.color
        );
        //si oui, on incrémente des nouvelles quantités et on met à jour le prix total
        if (articles) {
          articles.quantity = articles.quantity + selectProduct.quantity;
          articles.totalPrice += articles.price * selectProduct.quantity;
          localStorage.setItem("cart", JSON.stringify(basket));
          console.log("Quantité ajouté au panier");
          return;
        }
        //si il n'y a pas le meme article, alors on push le nouveau article dans le panier
        basket.push(selectProduct);
        localStorage.setItem("cart", JSON.stringify(basket));
        console.log("Le produit a été ajouté au panier");
      } // sinon création d'un tableau, et on push "selectProduct"
      else {
        // sinon creation d'un tableau vide dans lequel on push selectProduct
        let localStorageTable = [];
        localStorageTable.push(selectProduct);
        localStorage.setItem("cart", JSON.stringify(localStorageTable));
        console.log("panier vide, veuillez ajouté un article");
      }
    }
  });
};
