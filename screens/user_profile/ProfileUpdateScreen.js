import { useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { AuthContext } from "../../store/auth-context";
import { useState } from "react";
import { updateUser } from "../../util/http";
import LoadingScreen from "../LoadingScreen";
import { onlyDigits } from "../../util/Misc";

function ProfileUpdateScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [enteredName, setEnteredName] = useState(authContext.name);
  const [enteredPhoneNum, setEnteredPhoneNum] = useState(authContext.phoneNum);
  const [isUpdating, setIsUpdating] = useState(false);

  function nameInputHandler(enteredName) {
    setEnteredName(enteredName);
  }

  function phoneNumInputHandler(enteredPhoneNum) {
    setEnteredPhoneNum(enteredPhoneNum);
  }

  async function updateProfile() {
    if (enteredName.length < 4) {
      return Alert.alert(
        "Input Error",
        "Your name should have 4 or more characters"
      );
    }

    if (
      !onlyDigits(enteredPhoneNum) ||
      enteredPhoneNum.length < 10 ||
      enteredPhoneNum.length > 11
    ) {
      return Alert.alert("Input Error", "Invalid phone number format");
    }

    setIsUpdating(true);

    const user = {
      name: enteredName,
      email: authContext.email,
      phoneNum: enteredPhoneNum,
      userId: authContext.userId,
    };

    await updateUser(user);
    authContext.updateUserDetails(enteredName, enteredPhoneNum);

    setIsUpdating(false);

    navigation.navigate("User Profile");
  }

  if (isUpdating) {
    return <LoadingScreen message={"Updating..."} />;
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.profileContainer}>
        <TextInput
          style={styles.inputName}
          label={"Fullname"}
          placeholder="#John Smith"
          mode="outlined"
          activeOutlineColor="#d4a373"
          outlineColor="#faedcd"
          placeholderTextColor="#d4a373"
          selectionColor="black"
          onChangeText={nameInputHandler}
          value={enteredName}
        />
        <TextInput
          style={styles.inputPhone}
          label={"Phone Number"}
          placeholder="#0123456789"
          mode="outlined"
          activeOutlineColor="#d4a373"
          outlineColor="#faedcd"
          placeholderTextColor="#d4a373"
          selectionColor="black"
          onChangeText={phoneNumInputHandler}
          value={enteredPhoneNum}
        />
        <Button
          icon="pen"
          mode="contained"
          buttonColor="#d4a373"
          onPress={updateProfile}
        >
          Save
        </Button>
      </View>
    </View>
  );
}

export default ProfileUpdateScreen;

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "#e9edc9",
    height: "100%",
  },
  profileContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
    margin: "5%",
  },
  inputName: {
    width: "100%",
  },
  inputPhone: {
    width: "50%",
  },
  row1: {
    flexDirection: "row",
  },
  row2: {
    flexDirection: "row",
  },
  row3: {
    flexDirection: "row",
  },
});
