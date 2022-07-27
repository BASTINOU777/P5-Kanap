function getBasket() {
  let array = JSON.parse(localStorage.getItem("panier"));
  if (array) {
    return array;
  } else {
    return 0;
  }
}
const allPrices = [];

//affichage des produits
function displayProducts(product) {
  // ici ton code pour afficher tes produits

  // Pour calculer ton total dans la fonction juste en dessous
  let total = product.price * product.quantity;
  allPrices.push(total);
}

//calcul du total du panier
function totalCart() {
  const reducer = (previousValue, currentValue) => previousValue + currentValue; //gestion de tableau pour calculter le total
  return allPrices.reduce(reducer);
}

//Fonction d'écoute du formulaire et methode POST vers l'api
function listenForm() {
  //ici ton code pour faire ton POST
}

//IMPORTANT : Tu réunis toute tes fonction dans UNE fonction main. C'est ce que tu fais dans le langage C par exemple.
//C'est plus organisé
function main() {
  let array = getBasket(); //tu récupères tes produits
  for (i of array) {
    //tu boucles dans ton tableau
    displayProducts(i); //tu affiches ton article
  }
  document.querySelector(".totalCart").textContent = totalCart(); //Tu affiches ton total
  listenForm(); // tu appelles ta fonction pour faire ton post

  document.querySelector(".delete").addEventListener("click", function () {
    //fonction BONUS pour vider le panier et retourner a l'accueil au cas où
    localStorage.clear();
    window.location.href = "index.html";
  });
}

main(); //T'appeles ton main et c'est FINI.
