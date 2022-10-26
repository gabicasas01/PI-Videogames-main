const axios = require('axios');
const { Videogame, Genres, videogame_genres} = require('../db');
const {
    API_KEY,
} = process.env;


// TRAIGO LA INFO QUE NECESITO DE LA API
const getApiInfo = async () => {

    let api_games = [];
    let apiURL = `https://api.rawg.io/api/games?key=${API_KEY}`;
    let numberOfPages = 6;

    for (let i = 0; i <= numberOfPages; i++) {
        let pages = await axios.get(apiURL)
        pages.data?.results.forEach(game => {
            api_games.push({
                id: game.id,
                name: game.name,
                img: game.background_image,
                rating: game.rating,
                released: game.released,
                description: game.description,
                platforms: game.platforms.map(p => p.platform.name),
                genres: game.genres.map(g => {
                  return {
                    id: g.id,         
                    name: g.name
                  }
                })
            })
        });
        apiURL = pages.data.next;
    }

    return api_games;
};

// TRAIGO LA INFO QUE NECESITO DEl MODELO VIDEOGAME INCLUYENDO LOS GENEROS CON LOS NAMES
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

const getDetail = async (id) => {
  try {
    const apiDetail = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    
    if(apiDetail) {
      const { name, description, released, background_image, rating, platforms, genres} = apiDetail.data
      
      const gameDetail = {
        id,
        name,
        description,
        released,
        img: background_image,
        rating,
        platforms: platforms.map( p => p.platform.name),
        genres: genres.map( g => g.name)
      }
      return gameDetail;
    }
  } catch (error) {
      const dbVideogame = await getDbInfo()

      let dbVideogameFiltrado = dbVideogame.find( el => el.id === id)
      
      return dbVideogameFiltrado;
  }
}


module.exports = { getAllVideoGames, getDetail}