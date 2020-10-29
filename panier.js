let totalPrice = document.getElementById("totalPrice");
let deletPanier = document.getElementById("deletPanier");
let deletPanier = document.getElementById("sendContact");

/* Création fonction permettant l'importation des données du localStorage et la création d'un tableau contenant ces données */
function createTableProduit () {

    let resultPanier = JSON.parse(localStorage.getItem('countTable'));
    let total = 0;

    for (let i = 0; i < (resultPanier.length)/4 ; i++) {
        
    let newTable = document.createElement("tr");
        let table = document.getElementById("corpTable");
        table.appendChild(newTable);
        newTable.innerHTML = "<td>" + resultPanier[0 + i * 4] + "</td><td>" + resultPanier[1  + i * 4] + "</td><td>" + resultPanier[2 + i * 4] + "</td><td>" + resultPanier[3 + i * 4] + "</td>";
    };

    /* Transformation du DOM au niveau de l'élément "total" selon le prix de chaque produit choisi */
    for (let i = 0; i < (resultPanier.length)/4 ; i++) {

        let priceNumber = parseInt(resultPanier[3 + i *4]);
        total += priceNumber;
        };

    totalPrice.innerHTML = total;

    /* Création fonction permmettant de nettoyer le localStorage */
    deletPanier.addEventListener('click', function (e) {

            localStorage.clear();
        });
};

createTableProduit ();



function sendContactProduit () {



}