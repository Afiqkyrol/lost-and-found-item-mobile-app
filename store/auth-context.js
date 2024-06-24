import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  userId: "",
  name: "",
  email: "",
  phoneNum: "",
  dummy: [],
  isAuthenticated: false,
  authenticate: (token, userId, name, email, phoneNum) => {},
  updateUserDetails: (name, phoneNum) => {},
  dependencyTrigger: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [uid, setUid] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhoneNum, setUserPhoneNum] = useState(null);
  const [newDummy, setNewDummy] = useState([]);

  function authenticate(token, userId, name, email, phoneNum) {
    setAuthToken(token);
    setUid(userId);
    setUserName(name);
    setUserEmail(email);
    setUserPhoneNum(phoneNum);

    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("userId", userId);
  }

  function updateUserDetails(name, phoneNum) {
    setUserName(name);
    setUserPhoneNum(phoneNum);
  }

  function dependencyTrigger() {
    setNewDummy([1, 2]);
  }

  function logout() {
    setAuthToken(null);
    setUid(null);
    setUserName(null);
    setUserEmail(null);
    setUserPhoneNum(null);

    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
  }

  const value = {
    token: authToken,
    userId: uid,
    name: userName,
    email: userEmail,
    phoneNum: userPhoneNum,
    dummy: newDummy,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    updateUserDetails: updateUserDetails,
    dependencyTrigger: dependencyTrigger,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
