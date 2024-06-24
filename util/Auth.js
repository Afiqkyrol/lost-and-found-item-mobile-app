import axios from "axios";
import { storeUser } from "./http";

const API_KEY = "xxx";

export async function createUser(email, password, name, phoneNum) {
  const response = await axios.post("xxx" + API_KEY, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  const userId = response.data.localId;

  const user = {
    name: name,
    email: email,
    phoneNum: phoneNum,
    userId: userId,
  };

  storeUser(user);

  const authUser = { token: token, userId: userId };

  return authUser;
}

export async function loginUser(email, password) {
  const response = await axios.post("xxx" + API_KEY, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  const userId = response.data.localId;

  const authUser = { token: token, userId: userId };
  return authUser;
}
