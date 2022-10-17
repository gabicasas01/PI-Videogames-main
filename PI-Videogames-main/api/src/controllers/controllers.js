const axios = require('axios');
const { Videogame, Genres, videogame_genres} = require('../db');
const {
    API_KEY,
} = process.env;


const getApiInfo = async () => {

    let page1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    .then (response => response.data.results)
    .catch(error => error);

    let page2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
    .then (response => response.data.results)
    .catch(error => error);

    let page3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
    .then (response => response.data.results)
    .catch(error => error);

    let page4 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
    .then (response => response.data.results)
    .catch(error => error);

    let page5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    .then (response => response.data.results)
    .catch(error => error);


    let total = page1.concat(page2, page3, page4, page5);

    let api_games = total?.map(game => {
      return {
        id: game.id,
        name: game.name,
        img: game.background_image,
        rating: game.rating,
        released: game.released,
        description: game.description,
        platforms: game.platforms.map(p => p.platform.name),
        genres: game.genres.map(g => {
          return {
            name: g.name          
          }
        })
      }
    })
  
    return api_games;
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

const getDetail = async (id) => {
  const apiDetail = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
  
  //console.log('ESTO ES GET DETAIL: ', apiDetail.data)

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


module.exports = { getAllVideoGames, getDetail}