const AWS = require("aws-sdk");
const costexplorer = new AWS.CostExplorer();

module.exports = {
  getCostUtilizationForIAMUsers: (req, res) => {
    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate); //YYYY-mm-dd

    // Format the dates as strings in the "yyyy-MM-dd" format
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // console.log(formattedStartDate,formattedEndDate);

    function formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    const params = {
      TimePeriod: {
        // startDate=2023-10-01T00:00:00Z&endDate=2023-10-10T23:59:59Z

        Start: formattedStartDate,
        End: formattedEndDate,
      },
      Granularity: "DAILY",
      Metrics: ["UsageQuantity"],
      GroupBy: [
        {
          Type: "DIMENSION",
          Key: "SERVICE",
        },
      ],
    };

    costexplorer.getCostAndUsage(params, (err, data) => {
      if (err) {
        console.error("Error retrieving cost utilization data:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.json(data);
    });
  },
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
