const request = require("request");


const pokemonSearch = (pokemon, shiny, callback) => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;

    request({url, json: true}, (error, {body}) => {
        console.log(shiny);
        if(error) {
            callback({
                message: 'Unable to connect to PokeAPI',
                type: 'noConnect'
            }, undefined);
        } else if (body == "Not Found") {
            callback({
                message: 'Unable to locate Pokemon',
                type: 'noLocate'
            }, undefined);
        } else if (shiny == "Yes") {
            callback(undefined, {
                pokemon: `<img src=${body.sprites.front_shiny}>`
            })
        } else {
            callback(undefined, {
                pokemon: `<img src=${body.sprites.front_default}>`
            }) 
        }
    })
}

module.exports = pokemonSearch;