const express = require('express');

const SessionController = require('./controllers/SessionController');
const InflowController = require('./controllers/InflowController');
const OutflowController = require('./controllers/OutflowController');

const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.get('/inflow', InflowController.index);
routes.post('/inflow', InflowController.store);

routes.get('/outflow', OutflowController.index);
routes.post('/outflow', OutflowController.store);

module.exports = routes;