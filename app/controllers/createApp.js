const { SubscriptionsManager } = require("../filesystem");

// Subscribe Route
module.exports = function (app) {
  app.route("/createApp").post((req, res) => {
    // Get appName
    const appName = req.query.appName;
    //console.log("AppName: ", appName);

    // Send 201 - Resource Created
    res.status(201).json({});

    // Create JSON File
    SubscriptionsManager.subscribeApp(appName);
  });
};
