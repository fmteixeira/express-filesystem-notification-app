const applicationServerPublicKey =
  "BPf8gkZ051TIP3AiT0R3OyFUNcCwCDwHWOdlmgc6AHR96XPlbAnLwS5J3ZkTeTxxH384B5OCpcpLUfk1ykPWi30";

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function enablePushNotifications() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  const swRegistration = await getServiceWorker();
  return await swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    })
    .then(function (subscription) {
      console.log("User is subscribed: ", subscription);
      return true;
    })
    .catch(function (err) {
      console.log("Failed to subscribe the user: ", err);
      return false;
    });
}

async function getServiceWorker() {
  return await navigator.serviceWorker.ready;
}

function getUserSubscription() {
  //wait for service worker installation to be ready, and then
  return navigator.serviceWorker.ready
    .then(function (serviceWorker) {
      return serviceWorker.pushManager.getSubscription();
    })
    .then(function (pushSubscription) {
      return pushSubscription;
    });
}

async function isClientSubscribed() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    const subscription = await getUserSubscription();
    return subscription ? true : false;
  }
}

async function executeFetch(fetchCallback) {
  const pushSubscription = await getUserSubscription();
  fetchCallback(pushSubscription);
}

const subscription = {
  isClientSubscribed,
  enablePushNotifications,
  executeFetch,
};

export default subscription;
