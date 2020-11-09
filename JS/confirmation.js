let prenom = document.getElementById("prénom");
let nom = document.getElementById("nom");
let orderId = document.getElementById("order_id");


let retour = JSON.parse(localStorage.getItem("order"));
console.log(retour);

let resultPanier = JSON.parse(localStorage.getItem("countTable"));
console.log(resultPanier);  



/* Création fonction permettant l'importation des données du localStorage et la création d'un tableau dans le DOM contenant ces données */
function createTableProduit () {

    prenom.innerHTML = retour.contact.firstName;
    nom.innerHTML = retour.contact.lastName;
    orderId.innerHTML = retour.orderId; 

    let total = 0;

    for (let i = 0; i < resultPanier.length ; i++) {
        
    let newTable = document.createElement("tr");
        let table = document.getElementById("corpTable");
        table.appendChild(newTable);
        newTable.innerHTML = "<td>" + resultPanier[i].number + "</td><td>" + resultPanier[i].name + "</td><td>" + resultPanier[i].color + "</td><td>" + resultPanier[i].price + "</td>";
    };

    /* Transformation du DOM au niveau de l'élément "total" selon le prix de chaque produit choisi */
    for (let i = 0; i < resultPanier.length ; i++) {
        let priceNumber = parseInt(resultPanier[i].price);
        total += priceNumber;
        };

    totalPrice.innerHTML = total;
};

createTableProduit ();
