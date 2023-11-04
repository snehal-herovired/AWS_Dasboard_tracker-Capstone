const AWS = require("aws-sdk");

const cloudTrail = new AWS.CloudTrail();

const getRecentActivities = async (req, res) => {
  try {
    const currentTime = new Date();
    const twentyFourHoursAgo = new Date(currentTime - 24 * 60 * 60 * 1000);
    const params = {
      StartTime: twentyFourHoursAgo,
      EndTime: currentTime,
    };
    const cloudTrailLogs = await cloudTrail.lookupEvents(params).promise();
    console.log(params);
    res.send(cloudTrailLogs.Events);
  } catch (error) {
    console.error("Error fetching CloudTrail logs:", error);
    throw error;
  }
};

// const getActivityForUser = async (req, res) => {
//   const { Username } = req.params;
//   try {
//     const userActivityLogs = await activityModel.getActivityForUser(Username);
//     console.log(userActivityLogs);
//     res.json(userActivityLogs);
//   } catch (error) {
//     console.error(`Error fetching activity logs for user ${Username}:`, error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
module.exports = { getRecentActivities, 
  // getActivityForUser 
};
