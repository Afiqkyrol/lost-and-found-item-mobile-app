import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Image } from "react-native";
import { Card, TouchableRipple } from "react-native-paper";

function HighMatchItemComponent(props) {
  const navigation = useNavigation();

  const founditem_name = props.highMatchItem.founditem_name;
  const founditem_desc = props.highMatchItem.founditem_desc;
  const founditem_status = props.highMatchItem.founditem_status;
  const founditem_id = props.highMatchItem.founditem_id;
  const founddate_reported = props.highMatchItem.founddate_reported;
  const founduser_id = props.highMatchItem.founduser_id;

  let lostPhotoUrl = props.highMatchItem.lostitem_photo;
  let foundPhotoUrl = props.highMatchItem.founditem_photo;

  if (props.highMatchItem.lostitem_photo === "no photo") {
    lostPhotoUrl =
      "https://firebasestorage.googleapis.com/v0/b/fyptest-c386f.appspot.com/o/LostItem%2FNoImage.jpg?alt=media&token=636b63e4-77f7-4723-9233-f19d3654d83c";
  }

  if (props.highMatchItem.founditem_photo === "no photo") {
    foundPhotoUrl =
      "https://firebasestorage.googleapis.com/v0/b/fyptest-c386f.appspot.com/o/FoundItem%2FNoImage.jpg?alt=media&token=cdfdf5f4-f739-424f-be9a-fbe89f0fe5d3";
  }

  function navToHighSimItemDetScreen() {
    navigation.navigate("Potential Item Details", {
      item_id: founditem_id,
      item_name: founditem_name,
      item_desc: founditem_desc,
      item_photo: foundPhotoUrl,
      date_reported: founddate_reported,
      user_id: founduser_id,
    });
  }

  return (
    <TouchableRipple
      style={styles.touchableContainer}
      borderless={true}
      onPress={navToHighSimItemDetScreen}
    >
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.leftSection}>
            <Image style={styles.image} src={lostPhotoUrl} />
          </View>
          <View style={styles.middleSection}>
            <View style={styles.percentageNumCont}>
              <Text style={styles.percentageNum}>
                {props.highMatchItem.simIndex}%
              </Text>
            </View>
            <View style={styles.percentageMatchCont}>
              <Text>Match</Text>
            </View>
          </View>
          <View style={styles.rightSection}>
            <Image style={styles.image} src={foundPhotoUrl} />
          </View>
        </View>
        <View style={styles.itemNameContainer}>
          <View style={styles.leftSection}>
            <Text>{props.highMatchItem.lostitem_name}</Text>
          </View>
          <View style={styles.middleSection}></View>
          <View style={styles.rightSection}>
            <Text>{props.highMatchItem.founditem_name}</Text>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
}

export default HighMatchItemComponent;

const styles = StyleSheet.create({
  touchableContainer: {
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 130,
    elevation: 1,
  },
  cardContainer: {
    borderRadius: 10,
    height: 130,
    elevation: 1,
  },
  card: {
    backgroundColor: "#fefae0",
    flex: 5,
    flexDirection: "row",
  },
  leftSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 7,
    marginVertical: 7,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#d4a373",
  },
  middleSection: {
    flex: 1,
  },
  rightSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 7,
    marginVertical: 7,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#d4a373",
  },
  image: {
    width: "100%",
    height: "100%",

    borderRadius: 10,
  },
  percentageNumCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  percentageNum: {
    fontSize: 20,
  },
  percentageMatchCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  itemNameContainer: {
    backgroundColor: "#fefae0",
    flex: 2,
    flexDirection: "row",
  },
});
