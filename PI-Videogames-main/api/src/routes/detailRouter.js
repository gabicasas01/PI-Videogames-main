const { Router } = require('express');
const {getDetail} = require('../controllers/controllers')


const detailRouter = Router();

detailRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const videoGameDetail = await getDetail(id);

    videoGameDetail?
      res.status(200).json(videoGameDetail) :
      res.status(400).send('No se encontró el videojuego')
  })

  module.exports = detailRouter;