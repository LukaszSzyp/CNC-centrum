let addBasketButtons = document.querySelectorAll("#addBasket");
let basketTag = document.querySelector("#koszyk");

let basketData = [];


addBasketButtons.forEach(element => {
    element.addEventListener("click", (e) => {
        if (readBasketData() !== null) {
            basketData = readBasketData()
        }

        const basketItem = {
            id: Math.floor(Math.random() * 100000).toString(),
            title: e.target.name
        }
        basketData.push(basketItem);
        basketTag.innerHTML = basketData[0].title;
        sendBasketData(basketData);
    })
});


function sendBasketData(basketDataArray) {
    const basketDataAsString = JSON.stringify(basketDataArray);
    localStorage.setItem("basketItems", basketDataAsString);
}

function readBasketData() {
    const basketData = localStorage.getItem("basketItems");
    const basketDataAsArray = JSON.parse(basketData);
    return basketDataAsArray;
}

function basketState() {
    const basketItems = readBasketData();
    if (basketItems.length > 0) {
        basketTag.innerHTML = basketItems[0].title;
    } else {
        basketTag.innerHTML = "(Pusty)"
    }
}

basketState();

let basket = document.querySelector("#basket");
let basketElementContainer = document.querySelector(".basketItems");

function printBasketData() {
    let basketItems = readBasketData();
    basketElementContainer.innerHTML = "";
    basketItems.forEach((element) => {
        let basketElement = document.createElement("div");
        basketElement.className = "basketElement";
        basketElement.dataset.id = element.id;
        basketElement.innerHTML = element.title + ' <i class="far fa-times-circle"></i>';
        basketElement.addEventListener("click", (e) => {
            console.log(e.currentTarget.dataset.id);
            deleteBasketItems(e.currentTarget.dataset.id);
        });
        basketElementContainer.appendChild(basketElement);
    });
    document.getElementById("myForm").style.display = "block"
}

basket.addEventListener("click", () => {
    printBasketData();

})

let bntClose = document.querySelector(".cancel");
bntClose.addEventListener("click", () => {
    document.getElementById("myForm").style.display = "none";
    basketState();
    basketElementContainer.innerHTML = "";
})

function deleteBasketItems(id) {
    let basketData = readBasketData();
    console.log(basketData);
    let newData = basketData.filter((element) => element.id != id);
    console.log(newData);
    sendBasketData(newData);
    printBasketData();
}