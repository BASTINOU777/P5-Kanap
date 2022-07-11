
/*--------------------------------------------------------------------
APPEL DE l'API POUR IMPORTER LES PRODUITS A LA PAGE D'ACCEUIl
--------------------------------------------------------------*/

fetch ('http://localhost:3000/api/products')
//récuperation de la réponse pour la convertir en .JSON 
.then (function(res){
    if (res.ok){
        return res.json();
    }
})
.then(function(value) {
    newArticles(value);
 })

// Si Api est down alerte "products is not defined"
.catch(function(error){
    alert(error);
    console.log(error);
})

/*--------------------------------------------------------
AFFICHAGE DYNAMIQUE DES ELEMENTS DANS LA PAGE ACCEUIL
--------------------------------------------------*/
// récupération des éléments du DOM avec la variable container
let container = document.querySelector('#items')
console.log (container)

//--------récupération des éléments avec une boucle for of------------//
function newArticles(item) {
// Constante pour récupere l'iD "items" (enfant du main) dans le DOM//
    const queryItems = document.getElementById("items");
    for (let i = 0; i < item.length; i++) {
      const productItem =
// récupération du code HTML contenant les articles
        `<a href="./product.html?id=${item[i]._id}">
        <article>
            <img src="${item[i].imageUrl}" alt="${item[i].altTxt}">
            <h3 class="productName">${item[i].name}</h3>
            <p class="productDescription">${item[i].description}</p>  
        </article>
    </a>`;
      queryItems.insertAdjacentHTML("beforeend", productItem);
    }
  }
        
