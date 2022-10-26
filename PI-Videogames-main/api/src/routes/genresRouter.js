const { Router } = require('express');
const { Videogame, Genres, videogame_genres} = require('../db');
const axios = require('axios');
const {
  API_KEY,
} = process.env;


const genresRouter = Router();

// POR C/ GENERO DEL ARRAY QUE ME TRAIGO, HAGO UN FIND OR CREATE EN EL MODELO GENRES
genresRouter.get('/', async (req, res) => {
  try {
      const allGenres = await Genres.findAll();

      if(allGenres.length) {
        res.send(allGenres)
      } else {
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        const genres = genresApi.data.results.map(el => el.name)
        
        genres.forEach(el => {
          Genres.findOrCreate({
            where: { name: el}
          })
        })
        const allGenres = await Genres.findAll();
        res.send(allGenres)
      }
    } 
    catch (error) {
      res.status(400).send({error: error.message})
    }
  })

  
module.exports = genresRouter;