/* Appel éléments du DOM */
const choiceNameTeddy = document.getElementById("nameTeddy");
const choiceColorTeddy = document.getElementById("colorTeddy");
const choicePriceTeddy = document.getElementById("priceTeddy");
const teddyNumber = document.getElementById("teddyNumber");
const addPanier = document.getElementById("addPanier");

/* Fonction "GET" avec promise */
function get(url) {
    const promise = new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            };
        };
        request.send();
    })
    return promise;
};



/* Fonctions effectuées une fois résultat promise */
get("http://localhost:3000/api/teddies")
    .then(function(reponse) {

        let options = document.createElement("option");
        options.classList.add("color");
        choiceColorTeddy.appendChild(options);

        for (let i = 0; i < reponse.length; i++) {

            /* Création div des options possibles pour le choix de l'ours selon reponse GET*/
            let options = document.createElement("option");
            options.classList.add("name"+ [i]);
            choiceNameTeddy.appendChild(options);
            document.querySelector(".name" + [i]).innerHTML = reponse[i].name;
        }

        /* Modification valeurs des choix de la couleur et du prix suivant le choix de l'ours */
        choiceNameTeddy.addEventListener('change', function(Event) {

            optionColor = "";

            /* Création div des options possibles pour le choix de la couleur */
            for (const color of reponse[choiceNameTeddy.selectedIndex].colors) {
                optionColor += "<option>" + color + "</option>";
                choiceColorTeddy.innerHTML = optionColor;
            }

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
                    let entierPrice = Math.round(reponse[choiceNameTeddy.selectedIndex].price)/100;
                    choicePriceTeddy.textContent = entierPrice * priceNumber;
                })
            })
        })
    })




/* Création fonction permettant d'ajouter les personnalisation dans un tableau pour dans le local storage pour être utilisé par la page panier.html */
function importPanier () {

    let countTable = [];

    function storageProduit () {

        countTable.push(teddyNumber.innerHTML);
        countTable.push(choiceNameTeddy.value);
        countTable.push(choiceColorTeddy.value);
        countTable.push(choicePriceTeddy.innerHTML);

        localStorage.setItem('countTable', JSON.stringify(countTable));
    };

    addPanier.addEventListener('click', function(Event) {

        /* Vérification de l'utilisation de localStorage.clear() sur page panier.js pour ne pas accumuler countTable */
        if (localStorage.length == 0) {
            countTable = [];
            storageProduit ();

        } else {
            storageProduit ();
        }
    });
};

importPanier ();