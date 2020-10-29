/* Appel éléments DOM qui seront modifiés */
const choiceNameTeddy = document.getElementById("nameTeddy");
const choiceColorTeddy = document.getElementById("colorTeddy");
const choicePriceTeddy = document.getElementById("priceTeddy");
const teddyNumber = document.getElementById("teddyNumber");
const addPanier = document.getElementById("addPanier");


/* Création fonction qui définit les option possible pour le choix de l'artice */
function choiceProduit() {
    let request = new XMLHttpRequest();

    let options = document.createElement("option");
    options.classList.add("color");
    choiceColorTeddy.appendChild(options);

    /* Fonction appelée lorsque requête "GET" au serveur effectuée */
    request.onreadystatechange = function () {

        /* Vérification état requête serveur */
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

            /* Tranformation objet JSON en objet Javascript */
            const reponse = JSON.parse(this.responseText);

                for (let i = 0; i < reponse.length; i++) {

                    /* Tranformation DOM des options possibles pour le choix de l'ours */
                    let options = document.createElement("option");
                    options.classList.add("name"+ [i]);
                    choiceNameTeddy.appendChild(options);
                    document.querySelector(".name" + [i]).innerHTML = reponse[i].name;
                }

            /* Tranformation DOM des options possibles pour le choix des couleurs selon l'index de l'ours choisi */
            choiceNameTeddy.addEventListener('change', function(Event) {

                optionColor = "";
        
                /* Faire boucle permettant de réduire le code (for color in reponse[index].colors)*/
                for (const color of reponse[choiceNameTeddy.selectedIndex].colors) {

                    optionColor += "<option>" + color + "</option>";
                    choiceColorTeddy.innerHTML = optionColor;

                }
            });
        }
    };

    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
};

choiceProduit();



/* Création fonction qui définit le nombre d'article voulu ainsi que le prix en conéquence */
function priceTeddy() {

    let plus = document.getElementById("button-addon2");
    let moins = document.getElementById("button-addon1");
    let priceNumber = 0;

    /* Création fonction permettant d'ajouter 1 élément */
    plus.addEventListener('click', function(Event) {
        priceNumber++;
        teddyNumber.innerHTML = priceNumber;
    });

    /* Création fonction permettant d'enlever 1 élément */
    moins.addEventListener('click', function(Event) {
        if (priceNumber > 0) {
        priceNumber--;
        teddyNumber.innerHTML = priceNumber;
        }
    });

    let operaTionteddyNumber = [plus, moins];

    /* Transformation du prix selon le choix de l'ours ainsi que le nombre*/
    choiceNameTeddy.addEventListener('change', function(Event) {

        priceNumber = 0;
        teddyNumber.innerHTML = priceNumber;
        choicePriceTeddy.textContent = 0;
        let request = new XMLHttpRequest();

        request.onreadystatechange = function () {

            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                const reponse = JSON.parse(this.responseText);

                operaTionteddyNumber.forEach(function(e) {
                    e.addEventListener("click", function() {

                            let entierPrice = Math.round(reponse[choiceNameTeddy.selectedIndex].price)/100;
                            choicePriceTeddy.textContent = entierPrice * priceNumber;

                    });
                });
            }
        }
        request.open("GET", "http://localhost:3000/api/teddies");
        request.send();
    })
};

priceTeddy();


/* Création fonction permettant d'ajouter les personnalisation dans un tableau pour dans le local storage pour être utilisé par la page panier.html */
function importPanier () {

    let countTable = [];

    addPanier.addEventListener('click', function(Event) {


        /* Vérification de l'utilisation de localStorage.clear() sur page panier.js pour ne pas accumuler countTable */
        if (localStorage.length == 0) {

            countTable = [];

            countTable.push(teddyNumber.innerHTML);
            countTable.push(choiceNameTeddy.value);
            countTable.push(choiceColorTeddy.value);
            countTable.push(choicePriceTeddy.innerHTML);

            localStorage.setItem('countTable', JSON.stringify(countTable));

        } else {

            countTable.push(teddyNumber.innerHTML);
            countTable.push(choiceNameTeddy.value);
            countTable.push(choiceColorTeddy.value);
            countTable.push(choicePriceTeddy.innerHTML);
    
            localStorage.setItem('countTable', JSON.stringify(countTable));
        }
    });
};

importPanier ();
