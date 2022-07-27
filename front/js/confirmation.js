/*-----------------------------------------------------
                AFFICHAGE PRODUITS
------------------------------------------------------*/
// récupération de l'url de orderID
const urlOrderId = new URL(window.location.herf);
console.log(urlOrderId);

// récupération de orderid
const orderId = url.searchParams.get("orderId");
console.log(orderId);

const confirmationOrderId = docuement.getElementById("orderId");
confirmationOrderId.innerHTML = orderId;

localStorage.clear();
