const titre = document.getElementById('test');

function okTest () {
        let okok = localStorage.getItem('testeu');
        titre.textContent = okok;
};

okTest ();