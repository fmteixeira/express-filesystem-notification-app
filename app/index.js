const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { FileSystemManager } = require("./filesystem");

const app = express().use(bodyParser.json());
app.use(cors());

// Set Static Path
app.use(express.static(path.join(__dirname, "client/build")));

// Create filesystem default paths
FileSystemManager.createDefaultDirectories().then(() => {
  // Setup & Start Server
  const publicVapidKey =
    "BPf8gkZ051TIP3AiT0R3OyFUNcCwCDwHWOdlmgc6AHR96XPlbAnLwS5J3ZkTeTxxH384B5OCpcpLUfk1ykPWi30";
  const privateVapidKey = "Aa_SeNHd-pgyURBsr59VFtkL1YzAYBtJ2ZBCN7JEilA";

  webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
  );

  // Start Server
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server started on port ${port}`));

  // Router
  app.use(function (req, res, next) {
    next();
  });

  require("./routes/router")(app);
});
