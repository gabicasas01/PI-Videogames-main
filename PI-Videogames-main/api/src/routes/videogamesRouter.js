const { Router } = require('express');
const { Videogame, Genres, videogame_genres} = require('../db');
const {getAllVideoGames} = require('../controllers/controllers')

const videogameRouter = Router();

videogameRouter.get('/', async (req, res) => {
    try {
      const name = req.query.name
      let videogamesTotal = await getAllVideoGames();
    
      if(name) {
        let videogameName = await videogamesTotal.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
    
        videogameName.length ?
        res.status(200).send(videogameName) :
        res.status(404).send('No está el videojuego')
      } else {
        res.status(200).send(videogamesTotal)
      }
    } 
    catch (error) {
        res.status(400).send({error: error.message})
    }
  });


videogameRouter.post('/', async (req, res) => {
  const { name, description, rating, released, createdInDb, platforms, img, genres} = req.body;
  if(!name || !description || !platforms) return res.status(400).send('Falta alguno de los campos obligatorios')

  const findName = await Videogame.findAll({
    where: {name: name}
  })

  if(findName.length) return res.status(400).send('El nombre del juego está ocupado')

  try {
      let videogameCreated = await Videogame.create({ 
        name, 
        description, 
        rating, 
        released, 
        platforms, 
        img,
        createdInDb 
        });
     
      let genreDb = await Genres.findAll({ where: { name: genres } });
      videogameCreated.addGenres(genreDb);

      res.send('Videojuego creado con exito')
    } 
    catch (error) {
      res.status(400).send({error: error.message})
    }
});


module.exports = videogameRouter;