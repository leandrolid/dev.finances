const { response } = require('express');
const express = require('express');

const routes = express.Router();



routes.post('/users', (require, response) => {
    return response.json(require.body)
});

module.exports = routes;