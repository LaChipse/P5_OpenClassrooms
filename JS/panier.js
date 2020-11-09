/* Appel éléments du DOM */
let totalPrice = document.getElementById("totalPrice");
let deletPanier = document.getElementById("deletPanier");
let submit = document.querySelector("#form input[type='submit']");
let formContact = document.getElementById("form");

let resultPanier = JSON.parse(localStorage.getItem("countTable"));
console.log(resultPanier);


/* Création fonction permettant l'importation des données du localStorage et la création d'un tableau dans le DOM contenant ces données */
function createTableProduit () {

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

    /* Création fonction permmettant de nettoyer le localStorage */
    deletPanier.addEventListener('click', function (e) {
            localStorage.removeItem("countTable");
        });
};

createTableProduit ();

function post(url, data) {
  const promise = new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.open("POST", url + "order");
      request.setRequestHeader("Content-Type", "application/json");
      
      request.onreadystatechange = function () {
          if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            localStorage.setItem("order", this.responseText);
            resolve(JSON.parse(this.responseText));
          }
      };
      request.send(JSON.stringify(data));
  })
  return promise;
};


/* Foncion créant l'objet contact et products selon le choix de l'utilisateurs puis enoe via requête POST au serveur */
  submit.addEventListener('click', function(e) {

    const contact = {
      firstName: document.getElementById("prénom").value,
      lastName: document.getElementById("nom").value,
      address: document.getElementById("adresse").value,
      city: document.getElementById("ville").value,
      email: document.getElementById("email").value,
    };
  
    const products = [];

  /* Insértion valeurs id suivant les valeurs dans le panier */
  resultPanier.forEach(e => {
      products.push(e.id);
    });
  
    const commande = {
      contact,
      products
    }

    console.log(commande);
    console.log(JSON.stringify(commande));

    post("http://localhost:3000/api/teddies/", commande)
    .then(function(reponse) {
      console.log(reponse)
    });
  });
