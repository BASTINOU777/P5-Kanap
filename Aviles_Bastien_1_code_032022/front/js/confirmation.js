/*-----------------------------------------------------
                AFFICHAGE PRODUITS
------------------------------------------------------*/

const orderNumber = document.getElementById("orderId");

// récupération de l'url de orderID
const param = new URL(document.location).searchParams;
// récupération de orderid
const orderId = param.get("orderId");

orderNumber.textContent = orderId;

localStorage.clear();
