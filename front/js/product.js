/*------------------------------------------------------------
lien entre produit de la page d’accueil et de la page Produit
------------------------------------------------------*/
// utilisation de la méthode window.location.herf pour récuperer l'url de product
let params = new URL(window.location.href).searchParams;

let newID = params.get("id");
console.log(newID);
//récupération des produits dans l'API grâce à la méthode fetch

fetch("http://localhost:3000/api/products/" + newID);
