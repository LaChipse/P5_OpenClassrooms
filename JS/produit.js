/* Appel éléments du DOM */
const nameTeddy = document.getElementById("nameTeddy");
const choiceColorTeddy = document.getElementById("colorTeddy");
const choicePriceTeddy = document.getElementById("priceTeddy");
const teddyNumber = document.getElementById("teddyNumber");

/* Récupération données sotckées */
const ours_img = localStorage.getItem("ours_img");
const id_teddy = JSON.parse(localStorage.getItem("article_id"));
console.log(id_teddy);



/* Fonctions effectuées avec la réponse suivant l'id du produit qui a été choisi page d'acceuil*/
get("http://localhost:3000/api/teddies/" + id_teddy)
.then(function(reponse) {

    for (let i = 0; i < reponse.colors.length; i++) {

        /* Création élémént <option> pour le choix de la couleur de l'ours*/
        let options = document.createElement("option");
        options.classList.add("color"+ [i]);
        choiceColorTeddy.appendChild(options);
        document.querySelector(".color" + [i]).innerHTML = reponse.colors[i];
    }

    /* Création élémént <img> pour avoir une image de l'ours choisi */
    let imgOurs = document.createElement("img");
    imgOurs.setAttribute("src", ours_img);
    imgOurs.setAttribute("alt", "ours en peluche");
    imgOurs.setAttribute("style", "height: 15rem");
    document.getElementById("img_ours").appendChild(imgOurs);


    nameTeddy.innerHTML = reponse.name;

    let plus = document.getElementById("button-addon2");
    let moins = document.getElementById("button-addon1");
    let priceNumber = 0;
    teddyNumber.innerHTML = 0;
    choicePriceTeddy.textContent = 0;

    /* Création événement pour choisir le nombre d'article */
    plus.addEventListener('click', function(Event) {
        priceNumber++;
        teddyNumber.innerHTML = priceNumber;
    });
    
    moins.addEventListener('click', function(Event) {
        if (priceNumber > 0) {
        priceNumber--;
        teddyNumber.innerHTML = priceNumber;
        }
    });

    let operaTionteddyNumber = [plus, moins];

    /* Evenement permettant de voir le prix selon l'ours choisi et la quantité voulue */
    operaTionteddyNumber.forEach(function(e) {
        e.addEventListener("click", function() {
            let entierPrice = Math.round(reponse.price)/100;
            choicePriceTeddy.textContent = entierPrice * priceNumber;
        })
    })
})



/* Fonction pour stocker données concernant l'ours choisi, la couleur choisie, la quantité voulue et le prix */
function storagePanier (objet, array) {
    array.push(new objet(teddyNumber.innerHTML, nameTeddy.innerHTML, choiceColorTeddy.value, choicePriceTeddy.innerHTML, id_teddy));
    localStorage.setItem("countTable", JSON.stringify(array));
    console.log(localStorage.getItem("countTable"));
    alert("Article ajouté au panier !");
}



/* Création fonction permettant d'ajouter les personnalisation sous forme d'objet pour le localStorage puis*/
function importPanier () {

    class panier {
        constructor(number, name, color, price, id){
            this.number = number,
            this.name = name,
            this.color = color,
            this.price = price,
            this.id = id
        }
    };

    document.getElementById("addPanier").addEventListener('click', function(Event) {

        /* Vérification du choix d'unue quantité valide (non nulle) */
        if (teddyNumber.innerHTML == 0) {
            alert("Vous n'avez pas un nombre d'article valide !")
        } else {

            /* Vérification de l'utilisation de localStorage.clear() sur page panier.js */
            if (localStorage.getItem("countTable") === null) {
                let countTable = [];
                storagePanier (panier, countTable);           

            } else {
                let countTable = JSON.parse(localStorage.getItem("countTable"));
                storagePanier (panier, countTable);
        }
    }
    });
};

importPanier ();