import axios from "axios";
import { calcJaroDist, removeQuotes } from "./Misc";
import { storage } from "./FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  getPushTokenByUserId,
  sendNotificationToPotentialOwner,
} from "./Notifications";

const url =
  "https://fyptest-c386f-default-rtdb.asia-southeast1.firebasedatabase.app/";

////////////////////////////////////////////////////////////////////////////////////////////////////

export function storeUser(user) {
  axios.post(url + "user.json", user);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function updateUser(user) {
  const userDetails = await getUserDetails(user.userId);
  await axios.put(url + `/user/${userDetails.userKey}.json`, user);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getUserDetails(userId) {
  const response = await axios.get(url + "user.json");
  let name = "";
  let email = "";
  let phoneNum = "";
  let userID = "";
  let userKey = "";

  for (const key in response.data) {
    if (userId === response.data[key].userId) {
      name = removeQuotes(JSON.stringify(response.data[key].name));
      email = removeQuotes(JSON.stringify(response.data[key].email));
      phoneNum = removeQuotes(JSON.stringify(response.data[key].phoneNum));
      userID = removeQuotes(JSON.stringify(response.data[key].userId));
      userKey = removeQuotes(JSON.stringify(key));
    }
  }

  const userDetails = {
    name: name,
    email: email,
    phoneNum: phoneNum,
    userId: userID,
    userKey: userKey,
  };

  return userDetails;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function storeFoundItem(FoundItem) {
  const response = await axios.post(url + "found_item.json", FoundItem);

  return removeQuotes(JSON.stringify(response.data.name));
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function storeLostItem(LostItem) {
  const response = await axios.post(url + "lost_item.json", LostItem);

  return removeQuotes(JSON.stringify(response.data.name));
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function storeFoundItemPhoto(photoUri) {
  const response = await fetch(photoUri);
  const blob = await response.blob();

  const filename = photoUri.substring(photoUri.lastIndexOf("/") + 1);
  const metadata = {
    contentType: "image/jpeg",
  };
  const storageRef = ref(storage, `FoundItem/${filename}`);
  await uploadBytesResumable(storageRef, blob, metadata);

  const downloadUrl = await getDownloadURL(storageRef);

  return downloadUrl;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function storeLostItemPhoto(photoUri) {
  const response = await fetch(photoUri);
  const blob = await response.blob();

  const filename = photoUri.substring(photoUri.lastIndexOf("/") + 1);
  const metadata = {
    contentType: "image/jpeg",
  };
  const storageRef = ref(storage, `LostItem/${filename}`);
  await uploadBytesResumable(storageRef, blob, metadata);

  const downloadUrl = await getDownloadURL(storageRef);

  return downloadUrl;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getFoundItem() {
  const response = await axios.get(url + "found_item.json");
  const foundItem = [];

  for (const key in response.data) {
    if (response.data[key].item_status === "ownerless") {
      const foundItemObj = {
        item_id: removeQuotes(JSON.stringify(key)),
        item_name: removeQuotes(JSON.stringify(response.data[key].item_name)),
        item_desc: removeQuotes(JSON.stringify(response.data[key].item_desc)),
        item_status: removeQuotes(
          JSON.stringify(response.data[key].item_status)
        ),
        item_photo: removeQuotes(JSON.stringify(response.data[key].item_photo)),
        date_reported: removeQuotes(
          JSON.stringify(response.data[key].date_reported)
        ),
        user_id: removeQuotes(JSON.stringify(response.data[key].userId)),
      };

      foundItem.push(foundItemObj);
    }
  }

  return foundItem;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getFoundItemByUserId(userId) {
  const response = await axios.get(url + "found_item.json");
  const foundItem = [];

  for (const key in response.data) {
    if (
      userId === response.data[key].userId &&
      response.data[key].item_status === "ownerless"
    ) {
      const foundItemObj = {
        item_id: removeQuotes(JSON.stringify(key)),
        item_name: removeQuotes(JSON.stringify(response.data[key].item_name)),
        item_desc: removeQuotes(JSON.stringify(response.data[key].item_desc)),
        item_status: removeQuotes(
          JSON.stringify(response.data[key].item_status)
        ),
        item_photo: removeQuotes(JSON.stringify(response.data[key].item_photo)),
        date_reported: removeQuotes(
          JSON.stringify(response.data[key].date_reported)
        ),
        user_id: removeQuotes(JSON.stringify(response.data[key].userId)),
      };

      foundItem.push(foundItemObj);
    }
  }

  return foundItem;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getLostItem() {
  const response = await axios.get(url + "lost_item.json");
  const lostItem = [];

  for (const key in response.data) {
    if (response.data[key].item_status === "ownerless") {
      const lostItemObj = {
        item_id: removeQuotes(JSON.stringify(key)),
        item_name: removeQuotes(JSON.stringify(response.data[key].item_name)),
        item_desc: removeQuotes(JSON.stringify(response.data[key].item_desc)),
        item_status: removeQuotes(
          JSON.stringify(response.data[key].item_status)
        ),
        item_photo: removeQuotes(JSON.stringify(response.data[key].item_photo)),
        date_reported: removeQuotes(
          JSON.stringify(response.data[key].date_reported)
        ),
        user_id: removeQuotes(JSON.stringify(response.data[key].userId)),
      };

      lostItem.push(lostItemObj);
    }
  }

  return lostItem;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getLostItemByUserId(userId) {
  const response = await axios.get(url + "lost_item.json");
  const lostItem = [];

  for (const key in response.data) {
    if (
      userId === response.data[key].userId &&
      response.data[key].item_status === "ownerless"
    ) {
      const lostItemObj = {
        item_id: removeQuotes(JSON.stringify(key)),
        item_name: removeQuotes(JSON.stringify(response.data[key].item_name)),
        item_desc: removeQuotes(JSON.stringify(response.data[key].item_desc)),
        item_status: removeQuotes(
          JSON.stringify(response.data[key].item_status)
        ),
        item_photo: removeQuotes(JSON.stringify(response.data[key].item_photo)),
        date_reported: removeQuotes(
          JSON.stringify(response.data[key].date_reported)
        ),
        user_id: removeQuotes(JSON.stringify(response.data[key].userId)),
      };

      lostItem.push(lostItemObj);
    }
  }

  return lostItem;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function deleteLostItemById(item_id) {
  axios.delete(url + `lost_item/${item_id}.json`);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function deleteFoundItemById(item_id) {
  axios.delete(url + `found_item/${item_id}.json`);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function updateLostItemById(item_id, data) {
  axios.put(url + `lost_item/${item_id}.json`, data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function updateFoundItemById(item_id, data) {
  axios.put(url + `found_item/${item_id}.json`, data);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getPotentialOwner(FoundItem) {
  let simIndex;
  const lostItem = await getLostItem();
  const aFoundItem = FoundItem.item_name + " " + FoundItem.item_desc;
  console.log(aFoundItem);
  for (let i = 0; i < lostItem.length; i++) {
    let simIndex1 = calcJaroDist(
      aFoundItem,
      lostItem[i].item_name + " " + lostItem[i].item_desc
    );
    let simIndex2 = calcJaroDist(
      lostItem[i].item_name + " " + lostItem[i].item_desc,
      aFoundItem
    );
    if (simIndex1 > simIndex2) {
      simIndex = simIndex1;
    } else {
      simIndex = simIndex2;
    }

    if (simIndex >= 50) {
      const pushTokenArr = await getPushTokenByUserId(lostItem[i].user_id);
      for (let j = 0; j < pushTokenArr.length; j++) {
        sendNotificationToPotentialOwner(pushTokenArr[j]);
      }
    }
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getSimilarItem(userId) {
  const lostItem = await getLostItemByUserId(userId);
  const foundItem = await getFoundItem();
  const highMatchItem = [];
  let simIndex;
  let highMatchItemObj;

  for (let i = 0; i < lostItem.length; i++) {
    for (let j = 0; j < foundItem.length; j++) {
      let simIndex1 = calcJaroDist(
        lostItem[i].item_name + " " + lostItem[i].item_desc,
        foundItem[j].item_name + " " + foundItem[j].item_desc
      );
      let simIndex2 = calcJaroDist(
        foundItem[j].item_name + " " + foundItem[j].item_desc,
        lostItem[i].item_name + " " + lostItem[i].item_desc
      );
      if (simIndex1 > simIndex2) {
        simIndex = simIndex1;
      } else {
        simIndex = simIndex2;
      }

      if (simIndex >= 50) {
        highMatchItemObj = {
          lostitem_id: lostItem[i].item_id,
          lostitem_name: lostItem[i].item_name,
          lostitem_desc: lostItem[i].item_desc,
          lostitem_status: lostItem[i].item_status,
          lostitem_photo: lostItem[i].item_photo,
          lostuser_id: lostItem[i].user_id,
          simIndex: simIndex,
          founditem_id: foundItem[j].item_id,
          founditem_name: foundItem[j].item_name,
          founditem_desc: foundItem[j].item_desc,
          founditem_status: foundItem[j].item_status,
          founditem_photo: foundItem[j].item_photo,
          founddate_reported: foundItem[j].date_reported,
          founduser_id: foundItem[j].user_id,
        };
        highMatchItem.push(highMatchItemObj);
      }
    }
  }

  return highMatchItem;
}
