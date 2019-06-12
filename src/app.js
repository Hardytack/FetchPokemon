const express = require('express');
const path = require('path');
const request = require('request');

const pokemonSearch = require('./utils/pokemon');

const app = express();

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get('/pokemon', (req, res) => {
    if(!req.query.pokemon) {
        return res.send({
            error: 'A Pokemon is required'
        });
    }

    pokemonSearch(req.query.pokemon, req.query.shiny, (error, {pokemon, name} = {}) => {
        if (error) {
            return res.send({error});
        }

        else {
            res.send({
                pokemon,
                name
            })
        }
    })


})


app.listen(port, () => {
    console.log("server started on port " + port);
})