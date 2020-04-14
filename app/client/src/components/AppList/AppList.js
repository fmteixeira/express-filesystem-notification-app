import React from "react";
import PropTypes from "prop-types";
import "./AppList.css";
import AppListItem from "./AppListItem/AppListItem";

function AppList(props) {
  const { global, apps, fetchApps } = props;

  return (
    <ul id="app-list">
      {apps.map((app) => (
        <AppListItem
          key={app.appName}
          appName={app.appName}
          isSubscribed={global ? true : app.isSubscribed}
          fetchApps={fetchApps}
        />
      ))}
    </ul>
  );
}

AppList.propTypes = {
  global: PropTypes.bool.isRequired,
  apps: PropTypes.arrayOf(
    PropTypes.shape({
      appName: PropTypes.string.isRequired,
      isSubscribed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  fetchApps: PropTypes.func.isRequired,
};

export default AppList;
