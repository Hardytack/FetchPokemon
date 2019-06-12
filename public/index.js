function loadUp() {
    const search = document.getElementById("pokemonName");
    search.value = "";
}

loadUp();

const searchForm = document.querySelector("form");
const search = document.querySelector("input");
const pokePic = document.getElementById("pokePic");
const returnText = document.getElementById("returnText");
const shinyCheck = document.getElementById("shinyCheck");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const pokemon = search.value.toLowerCase();
    const shiny = (shinyCheck.checked) ? 'Yes' : 'No';
    // console.log(shiny);

    fetch(`/pokemon?pokemon=${pokemon}&shiny=${shiny}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                if(data.error.type == "noConnect") {
                    returnText.innerHTML = data.error.message
                } else if (data.error.type == "noLocate") {
                    returnText.innerHTML = data.error.message
                } else if (data.error) {
                    returnText.innerHTML = data.error
                } else {
                    returnText.innerHTML = "Other error..."
                }
                pokePic.innerHTML = "<img src='./img/missing.jpg'>";
            } else {
                pokePic.innerHTML = data.pokemon;
            }
        })
    })
})