const { SubscriptionsManager } = require("../filesystem");
const webpush = require("web-push");

// Subscribe Route
module.exports = function (app) {
  app.route("/unsubscribeGlobal").post((req, res) => {
    // Get pushSubscription Object
    const subscription = req.body;

    // Send 201 - Resource Created
    res.status(201).json({});

    // Remove JSON File
    SubscriptionsManager.unsubscribeGlobal(subscription);

    /*
    // Create Payload
    const payload = `You subscribed to App: ${appName}`;
    // Send Notification
    webpush
      .sendNotification(subscription, payload)
      .catch((error) => console.error(error));
    */
  });
};
