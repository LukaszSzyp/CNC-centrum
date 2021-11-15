const dropDownMenuData = [
    {
        category: "prowadniceLinioweHiwin",
        subCategory: ["Wózek HGH", "Wózek HGW", "Prowadnica HGR", "Zgarniacze HG"]
    },
    {
        category: "prowadniceLiniowePMI",
        subCategory: ["Seria: MSA-Wózki bez kołnierza", "Seria: MSA-Wózki z kołnierzem", "Seria: MSA-Prowadnice liniowe",]
    }
];

const asideMenu = document.querySelectorAll(".aside-with-items div");

function expandDropDownMenu(valueArray, idTarget) {
    let targetDropDownMenu = document.getElementById(idTarget);
    if (targetDropDownMenu.dataset.state == "closed") {
        targetDropDownMenu.dataset.state = "open"
        valueArray.forEach(element => {
            let dropDownMenuElement = document.createElement("div");
            dropDownMenuElement.className = "dropDownMenu-element";
            dropDownMenuElement.innerHTML = '<i class="fas fa-chevron-right"></i> ' + element;
            targetDropDownMenu.parentNode.insertBefore(dropDownMenuElement, targetDropDownMenu.nextSibling);
        });
        let icon = document.querySelector("#" + idTarget + " i");
        icon.className = "fas fa-minus"
    } else {
        let dropDownMenuElement = document.querySelectorAll(".dropDownMenu-element");
        dropDownMenuElement.forEach(element => {
            element.remove();
        });
        targetDropDownMenu.dataset.state = "closed";
        let icon = document.querySelector("#" + idTarget + " i");
        icon.className = "fas fa-plus"
    }
};

asideMenu.forEach(element => {
    element.addEventListener("click", (e) => {
        let valueArray = dropDownMenuData.find((item) => item.category === e.currentTarget.id);
        expandDropDownMenu(valueArray.subCategory, e.currentTarget.id)
    })
});