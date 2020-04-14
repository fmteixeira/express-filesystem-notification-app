import React, { useState } from "react";
import PropTypes from "prop-types";
import "./GlobalButton.css";
import { config } from "../../Api";
import subscription from "../../subscription";

function GlobalButton(props) {
  const { global, fetchApps } = props;

  const handleClick = () => {
    // Subscribe/Unsubscribe Globally
    subscription.executeFetch((subscription) => {
      fetch(global ? "/unsubscribeGlobal" : "/subscribeGlobal", {
        method: "POST",
        body: subscription ? JSON.stringify(subscription) : undefined,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Toggle Global Response: ", res);
          // Fetch Apps
          fetchApps();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  return (
    <>
      <p>Global Subscription</p>
      <label className="switch">
        <input
          id="global-checkbox"
          type="checkbox"
          checked={global}
          onClick={handleClick}
        />
        <span className="slider round"></span>
      </label>
    </>
  );
}

GlobalButton.propTypes = {
  global: PropTypes.bool.isRequired,
  fetchApps: PropTypes.func.isRequired,
};

export default GlobalButton;
