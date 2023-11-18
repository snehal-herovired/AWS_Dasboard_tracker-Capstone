const express = require('express');
const costController = express.Router();
const {getCostUtilizationForIAMUsers} = require('../controllers/costOptimization.controller');

// costController.get('/cost/root',getRootCost);
costController.get('/api/utilization',getCostUtilizationForIAMUsers);

module.exports = costController;