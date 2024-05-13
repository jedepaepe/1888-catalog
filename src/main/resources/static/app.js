const div = document.getElementById("app");

const h1 = document.createElement("h1");
h1.innerText = "Catalogue";
div.append(h1);

fetch("http://localhost:8080/products")
    .then(httpResponse => httpResponse.json())
    .then(createProducts);

/**
 * crée un élément table contenant la liste des products
 * @param products : un array (liste) d'employés
 */
function createProducts(products) {
    const table = document.createElement("table");
    const tHead = document.createElement("thead");
    const tr = document.createElement("tr");
    const thId = document.createElement("th");
    thId.innerText = "identifiant";
    const thLabel = document.createElement("th");
    thLabel.innerText = "label";
    let thPrice = document.createElement("th");
    thPrice.innerText = "prix";
    tr.append(thId, thLabel, thPrice);
    tHead.append(tr)
    table.append(tHead);
    products.forEach(product => {
        const tBody = document.createElement("tbody");
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        tdId.innerText = product.id;
        const tdLabel = document.createElement("td");
        tdLabel.innerText = product.label;
        const tdPrice = document.createElement("td");
        tdPrice.innerText = product.price;
        tr.append(tdId, tdLabel, tdPrice);
        tBody.append(tr);
        table.append(tBody);
    });
    div.append(table);
    table.classList.add("table");
}