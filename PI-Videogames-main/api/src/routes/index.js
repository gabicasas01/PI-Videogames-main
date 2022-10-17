const { Router } = require('express');
const { Videogame, Genres, videogame_genrs} = require('../db');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRouter  = require('./videogamesRouter')
const genresRouter = require('./genresRouter')
const detailRouter = require('./detailRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogame', detailRouter)
router.use('/videogames', videogameRouter)
router.use('/genres', genresRouter)


















// CODIGO ANTIGUO SIN MODULARIZAR

/*
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);

    const apiInfo = await apiUrl.data.results.map(elem => {
    return {
      id: elem.id,
      name: elem.name,
      description: elem.description,
      released: elem.released,
      rating: elem.rating,
      platforms: elem.platforms,
      img: elem.background_image,
    }
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genres,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
};

const getAllVideoGames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);

  return infoTotal;
};


router.get('/videogames', async (req, res) => {
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
});

router.get('/genres', async (req, res) => {
  const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
  const genres = genresApi.data.results.map(el => el.name)
  
  genres.forEach(el => {
    Genres.findOrCreate({
      where: { name: el}
    })
  })

  const allGenres = await Genres.findAll();
  res.send(allGenres)
})


router.post('/videogames', async (req, res) => {
  try {
    const { name, description, rating, released, createdInDb, platforms, img, genres} = req.body;
  
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
    
  } catch (error) {
    console.log('ESTE ES EL ERROR: ', error)
    // res.status(400).send({error: error.message})
  }
  
});

router.get('/videogame/:id', async (req, res) => {
  
  try {
    const { id } = req.params;
    const allVideoGames = await getAllVideoGames();
  
    if(id) {
      let videogameId = await allVideoGames.filter( el => el.id == id)
      videogameId.length ?
      res.status(200).json(videogameId) :
      res.status(400).send('No encontré ese videojuego')
    }
    
  } catch (error) {
      console.log(error)
  }
})
*/




module.exports = router;
