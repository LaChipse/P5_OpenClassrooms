/* Appel éléments du DOM */
let totalPrice = document.getElementById("totalPrice");
let deletPanier = document.getElementById("deletPanier");
let submit = document.getElementById("sendContact");
let formContact = document.getElementById("form");
let input = Array.prototype.slice.call(document.querySelectorAll("input"));

let resultPanier = JSON.parse(localStorage.getItem("countTable"));
console.log(resultPanier);



/* Création fonction permettant l'importation des données stockées et l'affichage de ces données sous forme d'un tableau récapitulatif sur la page */
function createTableProduit () {

    let total = 0;
 
      for(let i = 0; i < resultPanier.length ; i++) {    
        let newTable = document.createElement("tr");
        let table = document.getElementById("corpTable");
        table.appendChild(newTable);
        newTable.innerHTML = "<td>" + resultPanier[i].number + "</td><td>" + resultPanier[i].name + "</td><td>" + resultPanier[i].color + "</td><td>" + resultPanier[i].price + "</td>" + "<td><a href='panier.html' role='button' aria-disabled='true' class='btn btn-danger' id='deletElem " + [i] + "'><i class='fas fa-trash-alt'></i></button></td>";
        let priceNumber = parseInt(resultPanier[i].price);
        total += priceNumber;

        document.getElementById("deletElem" + " " + [i]).addEventListener('click', function(e){
          resultPanier.splice([i], 1);
          localStorage.setItem("countTable", JSON.stringify(resultPanier));
          console.log(resultPanier);
        })
      };



      totalPrice.innerHTML = total;

      /* Création fonction permmettant de nettoyer le localStorage */
      deletPanier.addEventListener('click', function (e) {
        alert("Votre panier est maintenant vide")
        localStorage.removeItem("countTable");
        console.log(localStorage.setItem("countTable"));
          
      });
};

createTableProduit ();


/* Foncion créant l'objet contact avec données entrées dans le formulaire et products avec données du ou des produit(s) choisi(s) puis envoie au serveur */
submit.addEventListener('click', function(e) {  

  /* Insértion valeurs id suivant les valeurs dans le panier */
  if (resultPanier < 1) {
    alert("Votre panier est vide")
    e.preventDefault();
  } else { 
    products = [];

    resultPanier.forEach(e => {
    products.push(e.id);
    });
     
    if (input.every(e => e.validity.valid) && input.every(e => e != null)) {
        
      const contact = {
        firstName: document.getElementById("prénom").value,
        lastName: document.getElementById("nom").value,
        address: document.getElementById("adresse").value,
        city: document.getElementById("ville").value,
        email: document.getElementById("email").value,
      };

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
          document.location.href="confirmation.html"
        });
        
    } else { for (let i = 0; i < input.length; i++) {

        if(!input[i].validity.valid) {
          input[i].className = ("form-control is-invalid")
        } else {
          input[i].className = ("form-control is-valid")
        }
      }
    }
  }
});
