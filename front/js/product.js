getArticle();

function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })
}