const AWS = require('aws-sdk');

const ce = new AWS.CostExplorer();

async function getCostRoot(req, res) {
  try {
    const { startTime, endTime } = req.query; // Extract start and end time from the request query parameters

    // Fetch cost optimization data using AWS SDK
    const costParams = {
      TimePeriod: {
        Start: startTime,
        End: endTime
      },
      Granularity: 'MONTHLY',
      Metrics: ['UnblendedCost'],
      Filter: {
        Dimensions: {
          Key: 'LINKED_ACCOUNT',
          Values: ['YOUR_ROOT_ACCOUNT_ID'] // Replace with your root AWS account ID
        }
      }
    };

    const costData = await ce.getCostAndUsage(costParams).promise();

    // Send the response to the client
    res.json(costData.ResultsByTime);
  } catch (error) {
    console.error('Error fetching cost data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getCostRoot
};




// Get the current date
// const today = new Date();

// // Get the year and month of the current date
// const year = today.getFullYear();
// const month = today.getMonth(); // Month is 0-based

// // Calculate the start date (first day of the current month)
// const startDay = new Date(year, month, 1);
// const formattedStartDate = startDay.toISOString().split('T')[0]; // Format as yyyy-MM-dd

// // Calculate the end date (last day of the current month)
// const endDay = new Date(year, month + 1, 0);
// const formattedEndDate = endDay.toISOString().split('T')[0]; // Format as yyyy-MM-dd