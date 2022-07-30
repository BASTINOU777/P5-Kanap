/*--------------------------------------------------------------------
APPEL DE l'API POUR IMPORTER LES PRODUITS A LA PAGE D'ACCUEIl
--------------------------------------------------------------*/

productDisplay();

/*importation du contenu de l'api*/
async function getProduct() {
  var api = await fetch("http://localhost:3000/api/products");
  return await api.json();
}

/*création d'une fonction afin d'afficher tous les produits de l'api dans la page d'accueil*/
async function productDisplay() {
  var res = await getProduct()
    .then(function (data) {
      const products = data;
      for (let product in products) {
        /*insertion d'un lien vers le produit*/
        let productLink = document.createElement("a");
        document.querySelector(".items").appendChild(productLink);
        productLink.href = `product.html?id=${data[product]._id}`;

        /*insertion d'un article pour contenir le produit*/
        let productArticle = document.createElement("article");
        productLink.appendChild(productArticle);

        /*insertion de l'image du produit et de sa description*/
        let productImg = document.createElement("img");
        productArticle.appendChild(productImg);
        productImg.src = data[product].imageUrl;
        productImg.alt = data[product].altTxt;

        /*insertion du nom du produit*/
        let productName = document.createElement("h3");
        productArticle.appendChild(productName);
        productName.classList.add("productName");
        productName.innerHTML = data[product].name;

        /*insertion de la descrption du produit*/
        let productDescription = document.createElement("p");
        productArticle.appendChild(productDescription);
        productDescription.classList.add("productName");
        productDescription.innerHTML = data[product].description;
      }
    })
    // Si Api est down alerte "products is not defined"
    .catch(function (error) {
      return error;
      console.log(error);
    });
}
