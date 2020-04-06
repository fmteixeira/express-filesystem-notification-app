const { SubscriptionsManager } = require("../filesystem");

// Subscribe Route
module.exports = function (app) {
  app.route("/getApps").post((req, res) => {
    // Get pushSubscription Object
    const subscription = req.body;

    SubscriptionsManager.getApps(subscription).then((apps) => res.send(apps));
  });
};
