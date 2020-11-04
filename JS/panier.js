/* Appel éléments du DOM */
let totalPrice = document.getElementById("totalPrice");
let deletPanier = document.getElementById("deletPanier");
let submit = document.querySelector("#form input[type='submit']");
let formContact = document.getElementById("form");

let resultPanier = JSON.parse(localStorage.getItem('countTable'));


/* Création fonction permettant l'importation des données du localStorage et la création d'un tableau dans le DOM contenant ces données */
function createTableProduit () {

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

function post(url, data) {
  const promise = new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.open("POST", url + "order");
      request.setRequestHeader("Content-Type", "application/json");
      
      request.onreadystatechange = function () {
          if (this.readyState == XMLHttpRequest.DONE && 200 < this.status < 300) {
              localStorage.setItem("order", JSON.stringify(this.responseText));
              resolve(JSON.parse(this.responseText));
          };
      };
      request.send(JSON.stringify(data));
  })
  return promise;
};


/* Foncion créant l'objet contact et products selon le choix de l'utilisateurs puis enoe via requête POST au serveur */
  submit.addEventListener('click', function(e) {

    let contact = {
      prénom : document.getElementById("prénom").value,
      nom : document.getElementById("nom").value,
      adresse : document.getElementById("adresse").value,
      ville : document.getElementById("ville").value,
      email : document.getElementById("email").value,
    };
  
    let products = [];

  /* Insértion valeurs id suivant les valeurs dans le panier */
    for (let i = 0; i < (resultPanier.length)/4 ; i++) {
      if (resultPanier[1 + i * 4] == "Norbert") {
        products.push("5be9c8541c9d440000665243")

      } else if (resultPanier[1 + i * 4] == "Arnold") {
        products.push("5beaa8bf1c9d440000a57d94")
  
      } else if (resultPanier[1 + i * 4] == "Lenny and Carl") {
        products.push("5beaaa8f1c9d440000a57d95")
          
      } else if (resultPanier[1 + i * 4] == "Gustav") {
        products.push("5beaabe91c9d440000a57d96")
  
      } else if (resultPanier[1 + i * 4] == "Garfunkel") {
        products.push("5beaacd41c9d440000a57d97")
      }
    }
  
    let commande = {
      contact,
      products
    };

    post("http://localhost:3000/api/teddies/", commande);
  });
