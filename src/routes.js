const { Router } = require('express')
const TrainerController = require('./controllers/TrainerController')

const routes = Router()

routes.post('/profile', TrainerController.createProfile)
// routes.put('/devs/:cd', DevController.update)

module.exports = routes