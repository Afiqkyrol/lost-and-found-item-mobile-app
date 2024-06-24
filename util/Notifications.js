import { Platform } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import axios from "axios";
import { removeQuotes } from "./Misc";

const url =
  "https://fyptest-c386f-default-rtdb.asia-southeast1.firebasedatabase.app/";

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function configurePushNotification() {
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  if (finalStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Permission required", "Push Notification need a permission");
    return;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getPushToken() {
  const pushToken = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId,
  });
  return pushToken.data;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function handlePushToken(userId, action) {
  const pushToken = await getPushToken();
  const response = await axios.get(url + "notification.json");

  for (const key in response.data) {
    if (pushToken === response.data[key].pushToken) {
      const notification_key = removeQuotes(JSON.stringify(key));
      await axios.delete(url + `/notification/${notification_key}.json`);
    }
  }
  if (action === "register" || action === "login") {
    const notificationObj = { userId: userId, pushToken: pushToken };
    axios.post(url + "notification.json", notificationObj);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getPushTokenByUserId(userId) {
  const response = await axios.get(url + "notification.json");
  const pushTokenArr = [];

  for (const key in response.data) {
    if (userId === response.data[key].userId) {
      pushTokenArr.push(response.data[key].pushToken);
    }
  }

  return pushTokenArr;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function deletePushToken() {
  const pushToken = await getPushToken();
  const response = await axios.get(url + "notification.json");
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export function sendPushNotificationHandler(pushToken) {
  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: pushToken,
      title: "hello",
      body: "world",
    }),
  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export function sendNotificationToPotentialOwner(pushToken) {
  fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: pushToken,
      title: "Your new potential item",
      body: "Someone registered new found item that has high similarity with one of your registered lost item",
    }),
  });
}
