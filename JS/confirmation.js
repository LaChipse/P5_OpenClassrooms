/* Appel éléments stockées*/
let retour = JSON.parse(localStorage.getItem("order"));
console.log(retour);

let resultPanier = JSON.parse(localStorage.getItem("countTable"));
console.log(resultPanier);  



/* Création fonction permettant l'importation des données stockées et modification DOM */
function createTableProduit () {

    /* Modification élément selon le nom et prénom entré dans le formulaire ainsi que le numéro commande donné par le serveur */
    document.getElementById("prénom").innerHTML = retour.contact.firstName;
    document.getElementById("nom").innerHTML = retour.contact.lastName;
    document.getElementById("order_id").innerHTML = retour.orderId; 

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

document.getElementById("back").addEventListener('click', function(e) {
    localStorage.clear();
});
