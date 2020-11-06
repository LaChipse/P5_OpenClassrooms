/* Appel éléments du DOM */
let totalPrice = document.getElementById("totalPrice");
let deletPanier = document.getElementById("deletPanier");
let submit = document.querySelector("#form input[type='submit']");
let formContact = document.getElementById("form");

let resultPanier = JSON.parse(localStorage.getItem('countTable'));
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
            localStorage.clear();
        });
};

createTableProduit ();

function post(url, data) {
  const promise = new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.open("POST", url + "order");
      request.setRequestHeader("Content-Type", "application/json");
      
      request.onreadystatechange = function () {
          if (this.readyState == XMLHttpRequest.DONE && this.status == 400) {
            console.log(this.responseText);
            resolve(JSON.parse(this.responseText));
          };
      };
      request.send(JSON.stringify(data));
  })
  return promise;
};


/* Foncion créant l'objet contact et products selon le choix de l'utilisateurs puis enoe via requête POST au serveur */
  submit.addEventListener('click', function(e) {

    e.preventDefault();

    const contact = {
      firstname: document.getElementById("prénom").value,
      name: document.getElementById("nom").value,
      adress: document.getElementById("adresse").value,
      city: document.getElementById("ville").value,
      mail: document.getElementById("email").value,
    };
  
    const products = [];

  /* Insértion valeurs id suivant les valeurs dans le panier */
    for (let i = 0; i < resultPanier.length; i++) {
      if (resultPanier[i].name == "Norbert") {
        products.push("5be9c8541c9d440000665243")

      } else if (resultPanier[i].name == "Arnold") {
        products.push("5beaa8bf1c9d440000a57d94")
  
      } else if (resultPanier[i].name == "Lenny and Carl") {
        products.push("5beaaa8f1c9d440000a57d95")
          
      } else if (resultPanier[i].name == "Gustav") {
        products.push("5beaabe91c9d440000a57d96")
  
      } else if (resultPanier[i].name == "Garfunkel") {
        products.push("5beaacd41c9d440000a57d97")
      }
    }
  
    const commande = [];
    commande.push(contact, products);
    console.log(commande);

    post("http://localhost:3000/api/teddies/", commande);

    

  });
