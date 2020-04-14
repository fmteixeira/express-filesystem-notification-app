import React from "react";
import PropTypes from "prop-types";
import { config } from "../../../Api";
import subscription from "../../../subscription";

function AppListItem(props) {
  const { appName, isSubscribed, fetchApps } = props;

  const onClick = () => {
    if (!isSubscribed) {
      // Subscribe to App
      subscription.executeFetch((subscription) => {
        console.log(`Sending Subscription to ${appName}`);
        fetch(`${config.url.API_URL}/subscribe?appName=${appName}`, {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "content-type": "application/json",
          },
        }).then((res) => {
          console.log("Subscription Response: ", res);
          // Fetch Apps
          fetchApps();
        });
      });
    } else {
      // Unsubscribe from App
      subscription.executeFetch((subscription) => {
        console.log(`Sending Unsubscription to ${appName}`);
        fetch(`${config.url.API_URL}/unsubscribe?appName=${appName}`, {
          method: "DELETE",
          body: JSON.stringify(subscription),
          headers: {
            "content-type": "application/json",
          },
        }).then((res) => {
          console.log("Subscription Response: ", res);
          // Fetch Apps
          fetchApps();
        });
      });
    }
  };

  return (
    <>
      <li className={isSubscribed ? "subscribed" : "unsubscribed"}>
        <a onClick={onClick}>{appName}</a>
      </li>
    </>
  );
}

AppListItem.propTypes = {
  appName: PropTypes.string.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  fetchApps: PropTypes.func.isRequired,
};

export default AppListItem;
