const express = require('express');

const SessionController = require('./controllers/SessionController');
const InflowController = require('./controllers/InflowController');
const OutflowController = require('./controllers/OutflowController');
const BalanceController = require('./controllers/BalanceController');


const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.get('/inflow', InflowController.index);
routes.post('/inflow', InflowController.store);
routes.delete('/inflow', InflowController.destroy);

routes.get('/outflow', OutflowController.index);
routes.post('/outflow', OutflowController.store);
routes.delete('/outflow', OutflowController.destroy);

routes.get('/dashboard', BalanceController.show);

module.exports = routes;