const fs = require("fs-extra");
const sha256 = require("js-sha256").sha256;

const subDir = "/data/subscriptions/";
const subGlobalDir = "/data/subscriptionsGlobal/";

class SubscriptionsManager {
  static async subscriptionExists(dir, subscription) {
    const fileName =
      subscription !== undefined
        ? sha256(JSON.stringify(subscription.keys))
        : "";
    return fs.pathExists(dir + fileName).then((exists) => exists); // => false
  }

  static async subscribeApp(appName, subscription) {
    const path = subDir + appName + "/";
    // Ensure App Path exists
    FileSystemManager.ensureDirectory(path).then((result) => {
      // Add subscription if one was given
      if (result & (subscription !== undefined)) {
        FileSystemManager.writeJSON(path, subscription);
      }
    });
  }

  static async unsubscribeApp(appName, subscription) {
    const path = subDir + appName + "/";
    FileSystemManager.removeJSON(path, subscription);
  }

  static async isSubscribedToApp(appName, subscription) {
    const path = subDir + appName + "/";
    return SubscriptionsManager.subscriptionExists(path, subscription);
  }

  static async getApps(subscription) {
    return fs.readdir(subDir).then(async (apps) => {
      return Promise.all(
        apps.map(async (app) => {
          if (JSON.stringify(subscription) !== "{}") {
            return SubscriptionsManager.isSubscribedToApp(
              app,
              subscription
            ).then((isSubscribed) => {
              return {
                appName: app,
                isSubscribed: isSubscribed,
              };
            });
          } else {
            return {
              appName: app,
              isSubscribed: false,
            };
          }
        })
      );
    });
  }
}

class FileSystemManager {
  static async createDefaultDirectories() {
    FileSystemManager.ensureDirectory(subDir);
    FileSystemManager.ensureDirectory(subGlobalDir);
  }

  static async ensureDirectory(dir) {
    return fs
      .ensureDir(dir)
      .then(() => {
        console.log("Ensure Directory -> Success: ", dir);
        return true;
      })
      .catch((err) => {
        console.error(err);
        return false;
      });
  }

  static async writeJSON(dir, subscription) {
    const fileName = sha256(JSON.stringify(subscription.keys));

    fs.writeJson(dir + fileName, subscription)
      .then(() => {
        console.log("Write JSON -> Success: ", dir + fileName);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  static async removeJSON(dir, subscription) {
    const fileName = sha256(JSON.stringify(subscription.keys));

    fs.remove(dir + fileName, subscription)
      .then(() => {
        console.log("Remove JSON -> Success: ", dir + fileName);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = { SubscriptionsManager, FileSystemManager };
