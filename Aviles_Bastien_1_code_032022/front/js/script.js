/*--------------------------------------------------------------------
APPEL DE l'API POUR IMPORTER LES PRODUITS A LA PAGE D'ACCUEIl
--------------------------------------------------------------*/
/* déclaration de la fonction asyncrone "products" qui nous permettra de récupérer tous les produits dans l'api */
(async function () {
  const products = await getProducts();
  addProductsToHome(products);
})();

/*importation des données de l'api*/
function getProducts() {
  return fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (products) {
      return products;
    })
    .catch(function (error) {
      alert(error);
    });
}

/* Ajout des produits à la page d'accueil*/
function addProductsToHome(products) {
  let i = 0;
  /* récupèration de tous mes produits au dessus de 0 */
  while (i < products.length) {
    /* ajout des id dans les liens des produits */
    let lienProduct = document.createElement("a");
    lienProduct.href = "./product.html" + "?id=" + products[i]._id;

    let contentProduct = document.createElement("article");

    /* récuperation des URL des produits */
    let imageProduct = document.createElement("img");
    imageProduct.alt = products[i].altTxt;
    imageProduct.src = products[i].imageUrl;

    /* récuperation des noms des produits */
    let nomProduct = document.createElement("h3");
    nomProduct.classList.add("productName");
    nomProduct.innerText = products[i].name;

    /* récuperation des descriptions des produits */
    let descrisptionProduct = document.createElement("p");
    descrisptionProduct.classList.add("productDescription");
    descrisptionProduct.innerText = products[i].description;

    document
      .getElementById("items")
      .appendChild(lienProduct)
      .appendChild(contentProduct);

    contentProduct.appendChild(imageProduct);
    contentProduct.appendChild(nomProduct);
    contentProduct.appendChild(descrisptionProduct);
    i++;
  }
}
