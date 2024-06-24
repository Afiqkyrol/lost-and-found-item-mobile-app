import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { Button, TextInput } from "react-native-paper";

function ProfileScreen({ navigation }) {
  const authContext = useContext(AuthContext);

  function navToProfileUpdateScreen() {
    navigation.navigate("Profile Update");
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.nameSection}>
        <Text style={styles.nameText}>{authContext.name}</Text>
      </View>
      <View style={styles.detailSection}>
        <View style={styles.detailContent}>
          <Text style={styles.userId}>
            <Text style={styles.label}>User ID: </Text>
            {authContext.userId}
          </Text>
          <Text style={styles.userDetails}>
            <Text style={styles.label}>Email: </Text>
            {" " + authContext.email}
          </Text>
          <Text style={styles.userDetails}>
            <Text style={styles.label}>Phone Number: </Text>
            {" " + authContext.phoneNum}
          </Text>
          <Button
            style={styles.editButton}
            icon="pen"
            mode="contained"
            buttonColor="#d4a373"
            onPress={navToProfileUpdateScreen}
          >
            Edit
          </Button>
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "#e9edc9",
    height: "100%",
  },
  nameSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#d4a373",
  },
  detailSection: {
    flex: 4,
    backgroundColor: "#fefae0",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 1,
  },
  detailContent: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  userId: {
    textAlign: "center",
    marginBottom: 40,
    fontSize: 12,
  },
  label: {
    fontWeight: "bold",
  },
  userDetails: {
    marginBottom: 20,
    fontSize: 18,
  },
  editButton: {
    width: "30%",
    marginVertical: 16,
    borderWidth: 1,
  },
});
