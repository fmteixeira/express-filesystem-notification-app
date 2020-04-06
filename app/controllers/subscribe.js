const { FileSystemManager } = require("../filesystem");
const webpush = require("web-push");

// Subscribe Route
module.exports = function (app) {
  app.route("/subscribe").post((req, res) => {
    // Get pushSubscription Object
    const subscription = req.body;
    // Get appName
    const appName = req.query.appName;

    // Send 201 - Resource Created
    res.status(201).json({});

    /*
    // Create Payload
    const payload = `You unsubscribed from App: ${appName}`;
    // Send Notification
    webpush
      .sendNotification(subscription, payload)
      .catch((error) => console.error(error));
    */

    // Create JSON File
    FileSystemManager.createAppSubscription(appName, subscription);
  });
};
