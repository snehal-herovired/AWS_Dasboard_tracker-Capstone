const express = require('express');
const rootController = express.Router();
const { getCostRootForIAMUsers } = require('../controllers/costRoot.controller');

// costController.get('/cost/root',getRootCost);
rootController.get('/cost/root', getCostRootForIAMUsers);

module.exports = rootController;