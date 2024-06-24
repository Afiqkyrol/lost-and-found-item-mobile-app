import { useContext, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Platform } from "react-native";
import { AuthContext } from "../store/auth-context";
import { getSimilarItem } from "../util/http";
import { useState } from "react";
import { Button, FAB } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import HighMatchItemComponent from "../component/HighMatchItemComponent";
import {
  sendPushNotificationHandler,
  configurePushNotification,
  getPushToken,
} from "../util/Notifications";

function HomeScreen() {
  const authContext = useContext(AuthContext);
  const [newSimilarItem, setNewSimilarItem] = useState([]);
  const [newToken, setNewToken] = useState("");

  useEffect(() => {
    async function assignToken() {
      await configurePushNotification();
      setNewToken(await getPushToken());
    }
    assignToken();
  }, []);

  useEffect(() => {
    async function fetchSimilarItem() {
      const similarItem = await getSimilarItem(authContext.userId);
      setNewSimilarItem(similarItem);
    }

    fetchSimilarItem();
  }, [authContext.dummy]);

  function refreshMatchItemList() {
    authContext.dependencyTrigger();
  }

  let highMatchItemList = (
    <Text style={styles.emptyList}>
      If there is any found items that has high similarity with your lost item,
      it will display here. Currently there is no such item.
    </Text>
  );

  if (!newSimilarItem.length < 1) {
    highMatchItemList = (
      <FlatList
        data={newSimilarItem}
        renderItem={(itemData) => {
          return <HighMatchItemComponent highMatchItem={itemData.item} />;
        }}
        keyExtractor={(newSimilarItem) => {
          return newSimilarItem.lostitem_id + "&" + newSimilarItem.founditem_id;
        }}
      />
    );
  }

  function sendNotification() {
    sendPushNotificationHandler(newToken);
  }

  return (
    <View style={styles.appContainer}>
      <Text style={styles.welcome}>Welcome {authContext.name}</Text>

      <View>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>Your potential lost item</Text>
          <FAB
            style={styles.refreshButton}
            size="small"
            color="#ffffff"
            icon="refresh"
            onPress={refreshMatchItemList}
          />
        </View>
        <View style={styles.header}>
          <View style={styles.col1}>
            <Text style={styles.headerFont}>My Lost Item</Text>
          </View>
          <View style={styles.col2}>
            <Text style={styles.headerFont}>Similarity</Text>
          </View>
          <View style={styles.col3}>
            <Text style={styles.headerFont}>Found Item</Text>
          </View>
        </View>
        {highMatchItemList}
        {/* <Button onPress={sendNotification}>Test notification</Button> */}
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "#e9edc9",
    height: "100%",
  },
  welcome: {
    marginVertical: 20,
    marginHorizontal: 5,
    fontSize: 20,
  },
  tableHeader: {
    marginHorizontal: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tableTitle: {
    color: "#d4a373",
    fontSize: 16,
  },
  refreshButton: {
    backgroundColor: "#d4a373",
  },
  header: {
    marginHorizontal: 10,
    marginBottom: 5,
    paddingVertical: 5,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#d4a373",
    elevation: 4,
  },
  headerFont: {
    color: "white",
    fontSize: 16,
  },
  col1: {
    flex: 2,
    alignItems: "center",
  },
  col2: {
    flex: 1,
    alignItems: "center",
  },
  col3: {
    flex: 2,
    alignItems: "center",
  },
  emptyList: {
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: "center",
    color: "#d4a373",
  },
});
