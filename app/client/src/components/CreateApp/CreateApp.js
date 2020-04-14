import React, { useState } from "react";
import PropTypes from "prop-types";

function CreateApp(props) {
  const [input, setInput] = useState("");

  const handleClick = () => {
    const appName = input;
    console.log("CREATE APP", appName);
    // Create new App
    fetch(`/createApp?appName=${appName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("Create Response: ", res);
        // Fetch Apps
        props.fetchApps();
        // Clear Input
        setInput("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <br />
      <br />
      <button id="create-app-btn" onClick={handleClick}>
        Create App
      </button>
      <input
        id="input"
        type="text"
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <br />
    </div>
  );
}

CreateApp.propTypes = {
  fetchApps: PropTypes.func.isRequired,
};

export default CreateApp;
