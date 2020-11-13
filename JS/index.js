/* Fonction qui va modifier le DOM suivant la réponse */
get("http://localhost:3000/api/teddies/")
.then(function(reponse) {
    for (let i = 0; i < reponse.length; i++) {

        /* Variable contenant tableau avec lien vers les images car non récupérables via url */
        let images_ours = ["images/produits/teddy_1.jpg", "images/produits/teddy_2.jpg", "images/produits/teddy_3.jpg", "images/produits/teddy_4.jpg", "images/produits/teddy_5.jpg"];

        /* Création <div> avec la taille colonne */
        let col = document.createElement("div");
        col.classList.add("col");
        col.setAttribute("id", "col_img" + [i]);
        document.getElementById("cards_article").appendChild(col);

        /* Création <div> card */
        let cards = document.createElement("div");
        cards.classList.add("card");
        cards.classList.add("mb-5");
        cards.setAttribute("style", "width : 15rem");
        cards.setAttribute("id", "img_card" + [i]);
        document.getElementById("col_img" + [i]).appendChild(cards);

        /* Création élément <img> qui aura un attribut "src" définit selon le tableau des liens d'images */
        let images = document.createElement("img");
        images.setAttribute("id", "images" + [i]);
        images.classList.add("card_img_top");
        images.setAttribute("style", "height: 10rem");
        images.setAttribute("alt", "ours en peluche");
        images.setAttribute("src", images_ours[i]);
        document.getElementById("img_card" + [i]).appendChild(images);

        /* Création <div> card-body pour ajour d'élément sous l'image*/
        let card_body = document.createElement("div");
        card_body.setAttribute("id", "card_body" + [i]);
        card_body.classList.add("card-body");
        document.getElementById("img_card" + [i]).appendChild(card_body);

        /* Création <div> card_title pour le titre (nom de l'article */
        let card_title = document.createElement("h5");
        card_title.setAttribute("id", "card_title" + [i]);
        card_title.classList.add("card-title");
        document.getElementById("card_body" + [i]).appendChild(card_title);
        document.getElementById("card_title" + [i]).innerHTML = reponse[i].name;

        /* Création <div> card-subtitle pour le prix */
        let card_price = document.createElement("h6");
        card_price.setAttribute("id", "card_price" + [i]);
        card_price.classList.add("card-subtitle");
        card_price.classList.add("text-muted");
        card_price.classList.add("mb-3");
        document.getElementById("card_body" + [i]).appendChild(card_price);
        document.getElementById("card_price" + [i]).innerHTML = Math.round(reponse[i].price)/100 + "€";

        /* Création d'un lien sous forme d'un bouton qui permettra à l'utilisateur d'aller vers la page du produit choisi */
        let link_produit = document.createElement("a");
        link_produit.setAttribute("id", "link_produit"+ [i]);
        link_produit.setAttribute("href", "produit.html");
        link_produit.classList.add("btn");
        link_produit.classList.add("btn-primary");
        document.getElementById("card_body" + [i]).appendChild(link_produit);
        document.getElementById("link_produit" + [i]).innerHTML = "Voir cet article";

        /* Fonction qui stockera les données du produit choisi (id et image) pour la page produit */
        document.getElementById("link_produit" + [i]).addEventListener('click', function(e) {
            localStorage.setItem("article_id", JSON.stringify(reponse[i]._id));
            localStorage.setItem("ours_img", document.getElementById("images" + [i]).getAttribute("src"));
        })
    }
});


