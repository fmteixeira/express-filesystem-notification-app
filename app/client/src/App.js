import React, { useState, useEffect } from "react";
import "./App.css";
import PushButton from "./components/PushButton/PushButton";
import CreateApp from "./components/CreateApp/CreateApp";
import GlobalButton from "./components/GlobalButton/GlobalButton";
import AppList from "./components/AppList/AppList";
import Offline from "./components/Offline/Offline";
import { config } from "./Api";
import subscription from "./subscription";

function App() {
  const [appData, setAppData] = useState({ global: false, apps: [] });
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  const fetchApps = () => {
    subscription.executeFetch((pushSubscription) => {
      fetch(`${config.url.API_URL}/getApps`, {
        method: "POST",
        body: pushSubscription ? JSON.stringify(pushSubscription) : undefined,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          const apps = await res.json();
          console.log("Fetched Apps: ", apps);
          setAppData(apps);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setOffline(true);
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return (
    <div className="App">
      <h1>Notifications</h1>
      {loading ? (
        <p>Loading ...</p>
      ) : !offline ? (
        <>
          <PushButton />
          <CreateApp fetchApps={fetchApps} />
          <GlobalButton global={appData.global} fetchApps={fetchApps} />
          <AppList
            global={appData.global}
            apps={appData.apps}
            fetchApps={fetchApps}
          />
          <pre>
            <code className="js-subscription-json"></code>
          </pre>
        </>
      ) : (
        <Offline />
      )}
    </div>
  );
}

export default App;
