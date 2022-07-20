/*-------------------------------------------------------------
    RECUPERATION DES PRODUITS DU LOCAL STORAGE ET  DE l'API
---------------------------------------------------------------*/
//déclaration de ma variable contenant le tableau des articles dans le panier
let products = [];
//console.log(addProducts);
const FetchProducts = async () => {
  //attente de la promesse en allant chercher l'API avec fetch
  await fetch("http://localhost:3000/api/products/")
    //récuperation de la réponse pour la convertir en .JSON
    .then(function (res) {
      return res.json();
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      alert(error);
      // Erreur si pas d'api
      console.log(error);
    });
};

// on récup les infos dans le LS en format json
let addProducts = JSON.parse(localStorage.getItem("cart"));
console.log(addProducts);
cartProducts();
const cartProducts = async () => {
  if (addProducts) {
    await addProducts;
  }
};

for (let i = 0; i < addProducts.length; i++) {}

/*-------------------------------------------------------------
        AFFICHAGES DES PRODUITS 
------------------------------------------------------*/
//déclaration de ma fonction affichage des produits

function displayCart() {
  for (let productCart of cart) console.log(productCart);
}
