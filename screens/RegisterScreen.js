import { View, Alert, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useContext, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { createUser } from "../util/Auth";
import { AuthContext } from "../store/auth-context";
import { getUserDetails } from "../util/http";
import { getPushToken, handlePushToken } from "../util/Notifications";
import { isEmail, onlyDigits } from "../util/Misc";

function RegisterScreen() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredPhoneNum, setEnteredPhoneNum] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authContext = useContext(AuthContext);

  function emailInputHandler(enteredEmail) {
    setEnteredEmail(enteredEmail);
  }

  function passwordInputHandler(enteredPassword) {
    setEnteredPassword(enteredPassword);
  }

  function confirmPasswordHandler(enteredConfirmPassword) {
    setEnteredConfirmPassword(enteredConfirmPassword);
  }

  function nameInputHandler(enteredName) {
    setEnteredName(enteredName);
  }

  function phoneNumInputHandler(enteredPhoneNum) {
    setEnteredPhoneNum(enteredPhoneNum);
  }

  async function register() {
    const email = enteredEmail.trim();
    const password = enteredPassword;
    const name = enteredName;
    const phoneNum = enteredPhoneNum.trim();
    const confirmPassword = enteredConfirmPassword;

    if (name.length < 4) {
      return Alert.alert(
        "Input Error",
        "Your name should have 4 or more characters"
      );
    }

    if (!onlyDigits(phoneNum) || phoneNum.length < 10 || phoneNum.length > 11) {
      return Alert.alert("Input Error", "Invalid phone number format");
    }

    if (!isEmail(email) || email.length < 1) {
      return Alert.alert("Input Error", "Invalid email format");
    }

    if (password.length < 6) {
      return Alert.alert(
        "Input Error",
        "Your password should have 6 or more characters"
      );
    }

    if (password != confirmPassword) {
      return Alert.alert(
        "Input Error",
        "Password not match with confirm password"
      );
    }

    setIsAuthenticating(true);
    try {
      const authUser = await createUser(email, password, name, phoneNum);
      const userDetails = await getUserDetails(authUser.userId);
      handlePushToken(authUser.userId, "register");
      authContext.authenticate(
        authUser.token,
        authUser.userId,
        userDetails.name,
        userDetails.email,
        userDetails.phoneNum
      );
    } catch (error) {
      Alert.alert("Register failed", "Please try again later");
      setIsAuthenticating(false);
      console.log(error);
    }
  }

  if (isAuthenticating) {
    return <LoadingScreen message={"Creating user..."} />;
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.inputBox}
          label={"Full Name"}
          placeholder="#John Smith"
          mode="outlined"
          activeOutlineColor="#d4a373"
          outlineColor="#faedcd"
          placeholderTextColor="#d4a373"
          selectionColor="black"
          onChangeText={nameInputHandler}
        />
        <TextInput
          style={styles.inputBox}
          label={"Phone Number"}
          placeholder="#0123456789"
          mode="outlined"
          activeOutlineColor="#d4a373"
          outlineColor="#faedcd"
          placeholderTextColor="#d4a373"
          selectionColor="black"
          onChangeText={phoneNumInputHandler}
        />
        <TextInput
          style={styles.inputBox}
          label={"Email"}
          placeholder="#example@email.com"
          mode="outlined"
          activeOutlineColor="#d4a373"
          outlineColor="#faedcd"
          placeholderTextColor="#d4a373"
          selectionColor="black"
          onChangeText={emailInputHandler}
        />
        <TextInput
          style={styles.inputBox}
          label={"Password"}
          placeholder="#password"
          mode="outlined"
          activeOutlineColor="#d4a373"
          outlineColor="#faedcd"
          placeholderTextColor="#d4a373"
          selectionColor="black"
          secureTextEntry={true}
          onChangeText={passwordInputHandler}
        />
        <TextInput
          style={styles.inputBox}
          label={"Confirm Password"}
          placeholder="#confirm password"
          mode="outlined"
          activeOutlineColor="#d4a373"
          outlineColor="#faedcd"
          placeholderTextColor="#d4a373"
          selectionColor="black"
          secureTextEntry={true}
          onChangeText={confirmPasswordHandler}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon="login"
          mode="contained"
          buttonColor="#d4a373"
          onPress={register}
        >
          Register
        </Button>
      </View>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "#e9edc9",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  inputContainer: {
    width: "80%",
    flex: 2,
    justifyContent: "flex-end",
    paddingBottom: 5,
  },
  buttonContainer: {
    width: "80%",
    flex: 1,
    paddingTop: 5,
  },

  title: {
    fontSize: 60,
    textAlign: "center",
  },

  inputBox: {
    backgroundColor: "#fefae0",
    marginBottom: 5,
  },
});
