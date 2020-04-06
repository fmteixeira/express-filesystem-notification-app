module.exports = function (app) {
  // Plans
  require("../controllers/subscribe")(app);
  require("../controllers/unsubscribe")(app);
  require("../controllers/subscribeGlobal")(app);
  require("../controllers/unsubscribeGlobal")(app);
  require("../controllers/getApps")(app);
  require("../controllers/createApp")(app);
};
