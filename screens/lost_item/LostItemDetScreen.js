import { View, StyleSheet, Linking, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, Card } from "react-native-paper";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import {
  deleteLostItemById,
  getUserDetails,
  updateLostItemById,
} from "../../util/http";

function LostItemDetScreen({ route }) {
  const navigation = useNavigation();
  const item_id = route.params?.item_id;
  const item_name = route.params?.item_name;
  const item_desc = route.params?.item_desc;
  const item_photo = route.params?.item_photo;
  const date_reported = route.params?.date_reported;
  const user_id = route.params?.user_id;
  const authContext = useContext(AuthContext);

  async function contactFinder() {
    const userDetails = await getUserDetails(user_id);
    const phone_num = userDetails.phoneNum;

    const url = `whatsapp://send?phone=+6${phone_num}&text=test`;
    await Linking.openURL(url);
  }

  async function deleteLostItem() {
    Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this lost item?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteLostItemById(item_id);
            authContext.dependencyTrigger();
            navigation.navigate("List of Lost Item");
          },
        },
        {
          text: "No",
        },
      ]
    );
  }

  async function completeLostItem() {
    Alert.alert("Are your sure?", "Have you found this item?", [
      {
        text: "Yes",
        onPress: () => {
          const data = {
            item_name: item_name,
            item_desc: item_desc,
            item_photo: item_photo,
            item_status: "complete",
            date_reported: date_reported,
            userId: user_id,
          };
          updateLostItemById(item_id, data);
          authContext.dependencyTrigger();
          navigation.navigate("List of Lost Item");
        },
      },
      {
        text: "No",
      },
    ]);
  }

  let actionSection = (
    <Card style={styles.cardAction}>
      <Card.Actions>
        <Button onPress={contactFinder}>Contact owner</Button>
      </Card.Actions>
    </Card>
  );

  if (authContext.userId === route.params?.user_id) {
    actionSection = (
      <Card style={styles.cardAction}>
        <Card.Actions>
          <Button onPress={deleteLostItem}>Delete</Button>
          <Button onPress={completeLostItem}>Complete</Button>
        </Card.Actions>
      </Card>
    );
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: route.params?.item_photo }} />
          <Card.Content style={styles.cardContent}>
            <Text variant="titleLarge">{route.params?.item_name}</Text>
            <Text variant="bodyMedium">{route.params?.item_desc}</Text>
            <Text variant="bodyMedium">
              Date reported: {route.params?.date_reported}
            </Text>
          </Card.Content>
        </Card>
        {actionSection}
      </View>
    </View>
  );
}

export default LostItemDetScreen;

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "#e9edc9",
    flex: 1,
  },
  content: {
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 1,
    gap: 10,
  },
  card: {
    backgroundColor: "#fefae0",
    flex: 10,
  },
  cardContent: {
    marginTop: 10,
  },
  cardAction: {
    backgroundColor: "#fefae0",
    flex: 1,
  },
});
