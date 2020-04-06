const fs = require("fs-extra");
const sha256 = require("js-sha256").sha256;

const subDir = "/data/subscriptions/";
const subGlobalDir = "/data/subscriptionsGlobal/";

class SubscriptionsManager {
  // Validate a given subcription
  static validateSubscription(subscription) {
    return JSON.stringify(subscription) === "{}" || subscription === undefined
      ? false
      : true;
  }

  // Check if a subscription exists
  static async subscriptionExists(dir, subscription) {
    const fileName = SubscriptionsManager.validateSubscription(subscription)
      ? sha256(JSON.stringify(subscription.keys))
      : "";
    return fs.pathExists(dir + fileName).then((exists) => exists);
  }

  // Check if a given subscription is subscribed to a given app
  static async isSubscribedToApp(appName, subscription) {
    const path = subDir + appName + "/";
    return SubscriptionsManager.subscriptionExists(path, subscription);
  }

  // Subscribe a given subscription to a given app
  static async subscribeApp(appName, subscription) {
    const path = subDir + appName + "/";
    // Ensure App Path exists
    FileSystemManager.ensureDirectory(path).then((result) => {
      // Add subscription if one was given
      if (result & SubscriptionsManager.validateSubscription(subscription)) {
        FileSystemManager.writeSubscription(path, subscription);
      }
    });
  }

  // Unsubscribe a given subcription from a given app
  static async unsubscribeApp(appName, subscription) {
    const path = subDir + appName + "/";
    FileSystemManager.unwriteSubscription(path, subscription);
  }

  // Check if a given subcription is in the global list
  static async isSubscribedGlobal(subscription) {
    if (SubscriptionsManager.validateSubscription(subscription)) {
      return SubscriptionsManager.subscriptionExists(
        subGlobalDir,
        subscription
      );
    }
  }

  // Subscribe a given subscription to the global list
  static async subscribeGlobal(subscription) {
    if (SubscriptionsManager.validateSubscription(subscription)) {
      FileSystemManager.writeSubscription(subGlobalDir, subscription);
    }
  }

  // Unsubscribe a given subscription from the global list
  static async unsubscribeGlobal(subscription) {
    if (SubscriptionsManager.validateSubscription(subscription)) {
      FileSystemManager.unwriteSubscription(subGlobalDir, subscription);
    }
  }

  // Get the apps' subscription state in the following format: { global: boolean, apps: Array<{ appName: string, isSubscribed: boolean }> }
  static async getApps(subscription) {
    return fs.readdir(subDir).then(async (apps) => {
      return {
        global: await SubscriptionsManager.isSubscribedGlobal(subscription),
        apps: await Promise.all(
          apps.map(async (app) => {
            if (SubscriptionsManager.validateSubscription(subscription)) {
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
        ),
      };
    });
  }
}

class FileSystemManager {
  // Create the default directories that store the subscriptions
  static async createDefaultDirectories() {
    FileSystemManager.ensureDirectory(subDir);
    FileSystemManager.ensureDirectory(subGlobalDir);
  }

  // Ensures a directory existance
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

  // Write a subscription file
  static async writeSubscription(dir, subscription) {
    const fileName = sha256(JSON.stringify(subscription.keys));

    fs.writeJson(dir + fileName, subscription)
      .then(() => {
        console.log("Write JSON -> Success: ", dir + fileName);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Remove a subcription file
  static async unwriteSubscription(dir, subscription) {
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
