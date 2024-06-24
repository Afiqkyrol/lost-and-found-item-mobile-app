import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function LostItemComponent(props) {
  const navigation = useNavigation();
  const item_name = props.lostItem.item_name;
  const item_desc = props.lostItem.item_desc;
  const item_status = props.lostItem.item_status;
  const item_id = props.lostItem.item_id;
  const item_photo = props.lostItem.item_photo;
  const date_reported = props.lostItem.date_reported;
  const user_id = props.lostItem.user_id;

  function navToLostItemDetScreen() {
    navigation.navigate("Lost Item Details", {
      item_id: item_id,
      item_name: item_name,
      item_desc: item_desc,
      item_photo: photoUrl,
      date_reported: date_reported,
      user_id: user_id,
    });
  }

  let photoUrl = item_photo;

  if (item_photo === "no photo") {
    photoUrl =
      "https://firebasestorage.googleapis.com/v0/b/fyptest-c386f.appspot.com/o/LostItem%2FNoImage.jpg?alt=media&token=636b63e4-77f7-4723-9233-f19d3654d83c";
  }

  return (
    <TouchableRipple
      style={styles.cardContainer}
      borderless={true}
      onPress={navToLostItemDetScreen}
    >
      <View style={styles.card}>
        <View style={styles.cardPhoto}>
          <Image style={styles.image} src={photoUrl} />
        </View>
        <View style={styles.cardDetails}>
          <View style={styles.cardTitle}>
            <Text style={styles.textTitle}>{item_name}</Text>
          </View>
          <View style={styles.cardDesc}>
            <Text style={styles.textDesc}>{item_desc}</Text>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
}

export default LostItemComponent;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 100,
    elevation: 1,
  },
  card: {
    backgroundColor: "#fefae0",
    flex: 1,
    flexDirection: "row",
  },
  cardPhoto: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  cardDetails: {
    flex: 2,
    marginLeft: 10,
  },
  cardTitle: {
    flex: 1,
    fontSize: 2,
    marginTop: 10,
  },
  cardDesc: {
    flex: 2,
    marginBottom: 5,
  },
  textTitle: {
    fontSize: 16,
  },
  textDesc: {
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
