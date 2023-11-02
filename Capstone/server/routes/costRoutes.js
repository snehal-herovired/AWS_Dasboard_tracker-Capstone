const express = require('express');
const costController = express.Router();
const {getCostUtilizationForIAMUsers} = require('../controllers/costController');

// costController.get('/cost/root',getRootCost);
costController.get('/cost/utilization',getCostUtilizationForIAMUsers);

module.exports = costController;
