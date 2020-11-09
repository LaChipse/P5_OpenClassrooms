/* Appel éléments du DOM */
const nameTeddy = document.getElementById("nameTeddy");
const choiceColorTeddy = document.getElementById("colorTeddy");
const choicePriceTeddy = document.getElementById("priceTeddy");
const teddyNumber = document.getElementById("teddyNumber");
const addPanier = document.getElementById("addPanier");
const imgChoiceTeddy = document.getElementById("img_ours");

const ours_img = localStorage.getItem("ours_img");
const id_teddy = JSON.parse(localStorage.getItem("article_id"));
console.log(id_teddy);

let countTable = [];

/* Fonction "GET" avec promise */
function get(url) {
    const promise = new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                console.log(JSON.parse(this.responseText));
                resolve(JSON.parse(this.responseText));
            };
        };
        request.send();
    })
    return promise;
};



/* Fonctions effectuées une fois résultat promise */
get("http://localhost:3000/api/teddies/" + id_teddy)
.then(function(reponse) {

    for (let i = 0; i < reponse.colors.length; i++) {

        /* Création div des options possibles pour le choix de l'ours selon reponse GET*/
        let options = document.createElement("option");
        options.classList.add("color"+ [i]);
        choiceColorTeddy.appendChild(options);
        document.querySelector(".color" + [i]).innerHTML = reponse.colors[i];
    }

    imgChoiceTeddy.setAttribute("src", ours_img);
    imgChoiceTeddy.setAttribute("alt", "ours en peluche");
    imgChoiceTeddy.setAttribute("style", "height: 15rem");

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



function storagePanier (objet) {
    countTable.push(new objet(teddyNumber.innerHTML, nameTeddy.innerHTML, choiceColorTeddy.value, choicePriceTeddy.innerHTML, id_teddy));
    localStorage.setItem("countTable", JSON.stringify(countTable));
    alert("Article ajouté au panier !");
    console.log(localStorage.getItem('countTable'));
    console.log(JSON.parse(localStorage.getItem('countTable')));
}



/* Création fonction permettant d'ajouter les personnalisation dans un tableau pour dans le local storage pour être utilisé par la page panier.html */
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

    addPanier.addEventListener('click', function(Event) {

        if (teddyNumber.innerHTML == 0) {
            alert("Vous n'avez pas un nombre d'article valide !")
        } else {

            /* Vérification de l'utilisation de localStorage.clear() sur page panier.js pour ne pas accumuler countTable */
            if (localStorage.length == 0) {
                countTable = [];
                storagePanier (panier);           

            } else {
                storagePanier (panier);
        }
    }
    });
};

importPanier ();