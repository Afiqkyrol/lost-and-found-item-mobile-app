import { useContext } from "react";
import { useState } from "react";
import { View, Image, Text, StyleSheet, Alert } from "react-native";
import { TextInput, FAB, Button } from "react-native-paper";
import { AuthContext } from "../../store/auth-context";
import { storeLostItem, storeLostItemPhoto } from "../../util/http";
import { useCameraPermissions, PermissionStatus } from "expo-image-picker";
import * as ImagePicker from "expo-image-picker";
import LoadingScreen from "../LoadingScreen";
import { LostItemContext } from "../../store/lost-item-context";

function FoundItemRegScreen({ navigation }) {
  const [enteredItemName, setEnteredItemName] = useState("");
  const [enteredItemDesc, setEnteredItemDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pickedPhoto, setPickedPhoto] = useState();
  const [cameraPemissionInformation, requestPermission] =
    useCameraPermissions();
  const authContext = useContext(AuthContext);
  const lostItemContext = useContext(LostItemContext);

  function itemNameInputHandler(enteredItemName) {
    setEnteredItemName(enteredItemName);
  }

  function itemDescInputHandler(enteredItemDesc) {
    setEnteredItemDesc(enteredItemDesc);
  }

  async function verifyPermission() {
    if (cameraPemissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPemissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Permission Denied!", "You need to grant camera permission.");
      return false;
    }

    return true;
  }

  async function takePhotoHandler() {
    const photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    const photoObj = photo.assets[0];

    setPickedPhoto(photoObj.uri);
  }

  function deletePhotoHandler() {
    setPickedPhoto();
  }

  async function submitLostItem() {
    if (enteredItemName.length < 4) {
      return Alert.alert(
        "Input Error",
        "Your item name should have 4 or more characters"
      );
    }

    if (enteredItemDesc.length < 4) {
      return Alert.alert(
        "Input Error",
        "Your item description should have 4 or more characters"
      );
    }

    setIsLoading(true);

    const today = new Date();
    let photoUrl = "no photo";

    if (pickedPhoto) {
      photoUrl = await storeLostItemPhoto(pickedPhoto);
    }

    const lostItemArr = [];
    const LostItem = {
      item_name: enteredItemName,
      item_desc: enteredItemDesc,
      item_photo: photoUrl,
      item_status: "ownerless",
      date_reported: today.toLocaleDateString(),
      userId: authContext.userId,
    };

    storeLostItem(LostItem);

    lostItemContext.addItem(lostItemArr);
    authContext.dependencyTrigger();

    setIsLoading(false);

    navigation.navigate("List of Lost Item");
  }

  if (isLoading) {
    return <LoadingScreen message={"Uploading"} />;
  }

  let photoPreview = <Text>No photo taken</Text>;
  let fab = (
    <FAB
      color="#ffffff"
      icon="image"
      style={styles.fab}
      onPress={takePhotoHandler}
    />
  );

  if (pickedPhoto) {
    photoPreview = <Image style={styles.image} source={{ uri: pickedPhoto }} />;
    fab = (
      <FAB
        color="#ffffff"
        icon="delete"
        style={styles.fab}
        size="small"
        onPress={deletePhotoHandler}
      />
    );
  }

  return (
    <View style={styles.appContainer}>
      <View>
        <View style={styles.photoPreview}>{photoPreview}</View>
        {fab}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          label={"Name of the item"}
          placeholder="#Iphone, glasses, etc"
          mode="outlined"
          activeOutlineColor="#d4a373"
          outlineColor="#faedcd"
          placeholderTextColor="#d4a373"
          selectionColor="black"
          onChangeText={itemNameInputHandler}
          value={enteredItemName}
        />
        <TextInput
          style={styles.inputBoxDesc}
          label={"Description of the Item"}
          placeholder="#Samsung galaxy a23, Glasses brand XXX, etc"
          mode="outlined"
          activeOutlineColor="#d4a373"
          outlineColor="#faedcd"
          placeholderTextColor="#d4a373"
          selectionColor="black"
          multiline={true}
          onChangeText={itemDescInputHandler}
          value={enteredItemDesc}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" buttonColor="#d4a373" onPress={submitLostItem}>
          Submit
        </Button>
      </View>
    </View>
  );
}

export default FoundItemRegScreen;

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "#e9edc9",
    flex: 1,
  },
  fab: {
    position: "absolute",
    backgroundColor: "#d4a373",
    margin: 16,
    right: 0,
    top: 0,
  },
  photoPreview: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  inputBox: {
    backgroundColor: "#fefae0",
  },
  inputBoxDesc: {
    backgroundColor: "#fefae0",
    height: 150,
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
});
