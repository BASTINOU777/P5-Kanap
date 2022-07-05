//envoyer une requête HTTP de type GET 
fetch("http://localhost:3000/api/products") 
 //promise avec function reponse pour assurer la bonne récupération de l'API products
 .then(function(res){        
    if (res.ok){
        return res.json()
    }
})


