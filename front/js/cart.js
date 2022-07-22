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
function getCart(){
  // si pas d'élements et quantités et prix null ,alors le panier est vide 
  if (productLocalStorage === null || productLocalStorage == 0) {
    //création d'un paragraphe pour annoncer à l'utilisateur que le panier est vide
    elementEmptyCart.innerHTML = `<p>Votre panier est vide</p>`;
} else {
  // sinon je regarde dans l'API si il y des éléments 
  for (let product in productLocalStorage){
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
    .then( async function (apiElement) {
      articles = await apiElement;

      if (articles){
        let productPrice= 0;
        
    //récupération des éléments "article"
        let elementArticle = document.createElement ("article");
        document.getElementById("cart__items").apprendChild(productElement)
        elementArticle.className = "cart__items";
        elementArticle.setAttribute("data-id",product.productId);

        //récupération des éléments "div"
        let elementDiv =document.createElement("div");
        elementArticle.appendChild(elementDiv);
        elementDiv.className ="cart__item";
      }

    }
    
    
    )
}