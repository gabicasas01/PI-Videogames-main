const { Router } = require('express');
const {getDetail} = require('../controllers/controllers')


const detailRouter = Router();

detailRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const videoGameDetail = await getDetail(id);
  
    if(videoGameDetail) {
      res.status(200).json(videoGameDetail) 
    }
    
  } catch (error) {
    console.log(error)
      // res.status(400).send({error: error.message})
  }
})

  module.exports = detailRouter;