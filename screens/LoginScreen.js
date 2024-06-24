import { View, Alert, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useContext, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { loginUser } from "../util/Auth";
import { AuthContext } from "../store/auth-context";
import { getUserDetails, updateUser } from "../util/http";
import { getPushToken, handlePushToken } from "../util/Notifications";
import { isEmail } from "../util/Misc";

function LoginScreen({ navigation }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authContext = useContext(AuthContext);

  function emailInputHandler(enteredEmail) {
    setEnteredEmail(enteredEmail);
  }

  function passwordInputHandler(enteredPassword) {
    setEnteredPassword(enteredPassword);
  }

  async function login() {
    const email = enteredEmail.trim();
    const password = enteredPassword;

    if (email.length < 1) {
      return Alert.alert("Input Error", "You need to enter the email");
    }

    if (!isEmail(email)) {
      return Alert.alert("Input Error", "Invalid email format");
    }

    if (password.length < 1) {
      return Alert.alert("Input Error", "You need to enter the password");
    }

    setIsAuthenticating(true);
    try {
      const authUser = await loginUser(email, password);
      handlePushToken(authUser.userId, "login");
      const userDetails = await getUserDetails(authUser.userId);
      authContext.authenticate(
        authUser.token,
        authUser.userId,
        userDetails.name,
        userDetails.email,
        userDetails.phoneNum
      );

      authContext.dependencyTrigger();
    } catch (error) {
      Alert.alert(
        "Failed to login",
        "Please check your email and password or try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingScreen message={"Logging in..."} />;
  }

  function navToRegisterScreen() {
    navigation.navigate("Register");
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="#example@email.com"
          onChangeText={emailInputHandler}
          label={"Email"}
          mode="outlined"
          activeOutlineColor="#d4a373"
          outlineColor="#faedcd"
          placeholderTextColor="#d4a373"
          selectionColor="black"
        />
        <TextInput
          style={styles.inputBox}
          placeholder="#password"
          secureTextEntry={true}
          onChangeText={passwordInputHandler}
          label={"Password"}
          mode="outlined"
          activeOutlineColor="#d4a373"
          outlineColor="#faedcd"
          placeholderTextColor="#d4a373"
          selectionColor="black"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon="login"
          mode="contained"
          buttonColor="#d4a373"
          onPress={login}
        >
          Login
        </Button>
        <Button mode="text" textColor="#d4a373" onPress={navToRegisterScreen}>
          Register
        </Button>
      </View>
    </View>
  );
}

export default LoginScreen;

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
    flex: 1,
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
  },
});
