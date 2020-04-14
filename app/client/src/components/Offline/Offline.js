import React from "react";

export default function Offline() {
  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div>
      <p>Looks like you lost your connection. Please check it and try again.</p>
      <button onClick={refreshPage}>Try Again</button>
    </div>
  );
}
