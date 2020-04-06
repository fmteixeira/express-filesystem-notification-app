// Subscribe Route
module.exports = function (app) {
  app.route("/getApps").post((req, res) => {
    // Get pushSubscription Object
    const subscription = req.body;
    console.log("Subscription", subscription);

    // Send 201 - Resource Created
    res.send([
      { appName: "monitor", isSubscribed: true },
      { appName: "globaleda", isSubscribed: false },
      { appName: "lagoa", isSubscribed: false },
    ]);
  });
};
