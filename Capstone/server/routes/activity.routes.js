const express = require('express');
// const activityController = require('../controllers/activity.controller');

const router = express.Router();

const { 
    getRecentActivities, 
    // getActivityForUser 
} = require ('../controllers/activity.controller');
 

router.get('/recent', getRecentActivities);
// router.get('/userActivity/:userName', getActivityForUser);

 
module.exports = router;