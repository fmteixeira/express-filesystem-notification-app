import React, { useState, useEffect } from "react";
import subscription from "../../subscription";

export default function PushButton() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleClick = () => {
    subscription
      .enablePushNotifications()
      .then((subscriptionResult) => setIsSubscribed(subscriptionResult));
  };

  useEffect(() => {
    subscription.isClientSubscribed().then((isSubscribed) => {
      setIsSubscribed(isSubscribed);
    });
  }, []);

  return (
    <button id="push-btn" onClick={handleClick} disabled={isSubscribed}>
      Activate Push Notifications
    </button>
  );
}
