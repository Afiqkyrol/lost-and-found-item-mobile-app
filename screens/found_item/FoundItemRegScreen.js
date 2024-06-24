import { useContext } from "react";
import { useState } from "react";
import { View, Image, Text, StyleSheet, Alert } from "react-native";
import { TextInput, Button, FAB } from "react-native-paper";
import { AuthContext } from "../../store/auth-context";
import {
  getPotentialOwner,
  storeFoundItem,
  storeFoundItemPhoto,
} from "../../util/http";
import { FoundItemContext } from "../../store/found-item-context";
import { launchCameraAsync } from "expo-image-picker";
import LoadingScreen from "../LoadingScreen";

function FoundItemRegScreen({ navigation }) {
  const [enteredItemName, setEnteredItemName] = useState("");
  const [enteredItemDesc, setEnteredItemDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pickedPhoto, setPickedPhoto] = useState();
  const authContext = useContext(AuthContext);
  const foundItemContext = useContext(FoundItemContext);

  function itemNameInputHandler(enteredItemName) {
    setEnteredItemName(enteredItemName);
  }

  function itemDescInputHandler(enteredItemDesc) {
    setEnteredItemDesc(enteredItemDesc);
  }

  async function takePhotoHandler() {
    const photo = await launchCameraAsync({
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

  async function submitFoundItem() {
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
      photoUrl = await storeFoundItemPhoto(pickedPhoto);
    }

    const foundItemArr = [];
    const FoundItem = {
      item_name: enteredItemName,
      item_desc: enteredItemDesc,
      item_photo: photoUrl,
      item_status: "ownerless",
      date_reported: today.toLocaleDateString(),
      userId: authContext.userId,
    };

    const item_id = storeFoundItem(FoundItem);
    await getPotentialOwner(FoundItem);

    foundItemContext.addItem(foundItemArr);
    authContext.dependencyTrigger();

    setIsLoading(false);

    navigation.navigate("List of Found Items");
  }

  if (isLoading) {
    return <LoadingScreen message={"Uploading"} />;
  }

  let photoPreview = <Text>No photo taken</Text>;
  let fab = (
    <FAB
      color="#ffffff"
      icon="camera"
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
        <Button
          mode="contained"
          buttonColor="#d4a373"
          onPress={submitFoundItem}
        >
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
