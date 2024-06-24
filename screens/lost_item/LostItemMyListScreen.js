import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { getLostItemByUserId } from "../../util/http";
import { FlatList } from "react-native-gesture-handler";
import { LostItemContext } from "../../store/lost-item-context";
import LostItemComponent from "../../component/LostItemComponent";

function LostItemMyListScreen() {
  const authContext = useContext(AuthContext);
  const lostItemContext = useContext(LostItemContext);
  const [myLostItems, setMyLostItems] = useState([]);

  useEffect(() => {
    async function fetchLostItem() {
      const lostItem = await getLostItemByUserId(authContext.userId);
      setMyLostItems(lostItem);
    }

    fetchLostItem();
  }, [lostItemContext.items]);

  if (myLostItems.length < 1) {
    return (
      <View style={styles.appContainer}>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          No lost item registered.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.appContainer}>
      <View style={styles.listContainer}>
        <Text style={styles.title}>List of my lost items</Text>
        <FlatList
          data={myLostItems}
          renderItem={(itemData) => {
            return <LostItemComponent lostItem={itemData.item} />;
          }}
          keyExtractor={(item) => {
            return item.item_id;
          }}
        />
      </View>
    </View>
  );
}
export default LostItemMyListScreen;

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "#e9edc9",
    flex: 1,
  },
  listContainer: {
    flex: 10,
  },
  footerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    marginHorizontal: 15,
    marginVertical: 5,
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#d4a373",
  },
});
