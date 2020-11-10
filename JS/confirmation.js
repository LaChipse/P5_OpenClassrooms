/* Appel éléments du DOM */
let prenom = document.getElementById("prénom");
let nom = document.getElementById("nom");
let orderId = document.getElementById("order_id");
let back = document.getElementById("back");

/* Appel éléments stockées*/
let retour = JSON.parse(localStorage.getItem("order"));
console.log(retour);

let resultPanier = JSON.parse(localStorage.getItem("countTable"));
console.log(resultPanier);  



/* Création fonction permettant l'importation des données stockées et modification DOM */
function createTableProduit () {

    /* Modification élément selon le nom et prénom entré dans le formulaire ainsi que le numéro commande donné par le serveur */
    prenom.innerHTML = retour.contact.firstName;
    nom.innerHTML = retour.contact.lastName;
    orderId.innerHTML = retour.orderId; 

    let total = 0;

    /* Création tableau récapitulatif des produits commandés à affciher sur la page */
    for (let i = 0; i < resultPanier.length ; i++) {
        
    let newTable = document.createElement("tr");
        let table = document.getElementById("corpTable");
        table.appendChild(newTable);
        newTable.innerHTML = "<td>" + resultPanier[i].number + "</td><td>" + resultPanier[i].name + "</td><td>" + resultPanier[i].color + "</td><td>" + resultPanier[i].price + "</td>";

        let priceNumber = parseInt(resultPanier[i].price);
        total += priceNumber;
    };

    totalPrice.innerHTML = total;
};

createTableProduit ();

back.addEventListener('click', function(e) {
    localStorage.clear();
});
