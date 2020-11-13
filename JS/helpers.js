/* Fonction de requéte GET et récupération réponse avec promise */
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