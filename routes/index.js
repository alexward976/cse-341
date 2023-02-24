const routes = require('express').Router();

const myController = require('../controllers');

routes.get('/', myController.harlanFunction);

module.exports = routes;