let ca = document.getElementById("cards_article");
let images_ours = ["images/produits/teddy_1.jpg", "images/produits/teddy_2.jpg", "images/produits/teddy_3.jpg", "images/produits/teddy_4.jpg", "images/produits/teddy_5.jpg"];


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

get("http://localhost:3000/api/teddies/")
.then(function(reponse) {
    for (let i = 0; i < reponse.length; i++) {

        let col = document.createElement("div");
        col.classList.add("col-3");
        col.setAttribute("id", "col_img" + [i]);
        ca.appendChild(col);

        let cards = document.createElement("div");
        cards.classList.add("card");
        cards.classList.add("mb-5");
        cards.setAttribute("style", "width : 15rem");
        cards.setAttribute("id", "img_card" + [i]);
        document.getElementById("col_img" + [i]).appendChild(cards);

        let images = document.createElement("img");
        images.setAttribute("id", "images" + [i]);
        images.classList.add("card_img_top");
        images.setAttribute("style", "height: 10rem");
        images.setAttribute("alt", "ours en peluche");
        images.setAttribute("src", images_ours[i]);
        document.getElementById("img_card" + [i]).appendChild(images);

        let card_body = document.createElement("div");
        card_body.setAttribute("id", "card_body" + [i]);
        card_body.classList.add("card-body");
        document.getElementById("img_card" + [i]).appendChild(card_body);

        let card_title = document.createElement("h5");
        card_title.setAttribute("id", "card_title" + [i]);
        card_title.classList.add("card-title");
        document.getElementById("card_body" + [i]).appendChild(card_title);
        document.getElementById("card_title" + [i]).innerHTML = reponse[i].name;

        let card_price = document.createElement("h6");
        card_price.setAttribute("id", "card_price" + [i]);
        card_price.classList.add("card-subtitle");
        card_price.classList.add("text-muted");
        card_price.classList.add("mb-3");
        document.getElementById("card_body" + [i]).appendChild(card_price);
        document.getElementById("card_price" + [i]).innerHTML = Math.round(reponse[i].price)/100 + "€";

        let link_produit = document.createElement("a");
        link_produit.setAttribute("id", "link_produit"+ [i]);
        link_produit.setAttribute("href", "produit.html");
        link_produit.classList.add("btn");
        link_produit.classList.add("btn-primary");
        document.getElementById("card_body" + [i]).appendChild(link_produit);
        document.getElementById("link_produit" + [i]).innerHTML = "Voir cet article";

        document.getElementById("link_produit" + [i]).addEventListener('click', function(e) {
            localStorage.setItem("article_id", JSON.stringify(reponse[i]._id));
            localStorage.setItem("ours_img", document.getElementById("images" + [i]).getAttribute("src"));
            console.log(localStorage.getItem("article_id"));
            console.log(localStorage.getItem("ours_img"));
        })
    }
});


