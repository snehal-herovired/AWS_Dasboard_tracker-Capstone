const express = require('express');
const costController = express.Router();
const {getCostUtilizationForIAMUsers} = require('../controllers/costController');

// costController.get('/cost/root',getRootCost);
costController.get('/api/getAll',getCostUtilizationForIAMUsers);

module.exports = costController;
