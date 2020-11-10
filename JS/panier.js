/* Appel éléments du DOM */
let totalPrice = document.getElementById("totalPrice");
let deletPanier = document.getElementById("deletPanier");
let submit = document.getElementById("sendContact");
let formContact = document.getElementById("form");
let input = Array.prototype.slice.call(document.querySelectorAll("input"));
console.log(input);

let resultPanier = JSON.parse(localStorage.getItem("countTable"));
console.log(resultPanier);



/* Création fonction permettant l'importation des données stockées et l'affichage de ces données sous forme d'un tableau récapitulatif sur la page */
function createTableProduit () {

    let total = 0;

    if (resultPanier === null) {
      alert("Votre panier est vide")
      submit.addEventListener('click', function(e) {
        e.preventDefault();
      });
    } else { 
      for(let i = 0; i < resultPanier.length ; i++) {    
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
    }
};

createTableProduit ();



/* Fonction de requéte POST et récupération réponse avec promise */
function post(url, data) {
  return new Promise((resolve) => {
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
};

  /* Foncion créant l'objet contact avec données entrées dans le formulaire et products avec données du ou des produit(s) choisi(s) puis envoie au serveur */
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
    if (resultPanier === null) {
      alert("Votre panier est vide")
      } else { resultPanier.forEach(e => {
        products.push(e.id);
      });
  
      const commande = {
        contact,
        products
      }

      console.log(commande);
      console.log(JSON.stringify(commande));

      /* Appel fonction post puis après le stockage des données, on verifie la validité des champs pour ensuite être redirigé vers la page de confirmation */
      post("http://localhost:3000/api/teddies/", commande)
      .then(function(reponse) {
        console.log(reponse)
          if (input.every(e => e.validity.valid)) {
            document.location.href="confirmation.html"
          } else if (!input[4].validity.valid) {
              alert("Ce n'est pas un email valid");
          } else {
            alert("Champs incorrect. N'oublier pas les majuscules !")
          }
      })
    }
  });
