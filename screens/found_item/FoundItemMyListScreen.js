import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { getFoundItemByUserId } from "../../util/http";
import { FoundItemContext } from "../../store/found-item-context";
import FoundItemComponent from "../../component/FoundItemComponent";
import { FlatList } from "react-native-gesture-handler";

function FoundItemMyListScreen() {
  const authContext = useContext(AuthContext);
  const foundItemContext = useContext(FoundItemContext);
  const [myFoundItems, setMyFoundItems] = useState([]);

  useEffect(() => {
    async function fetchFoundItem() {
      const foundItem = await getFoundItemByUserId(authContext.userId);
      setMyFoundItems(foundItem);
    }

    fetchFoundItem();
  }, [foundItemContext.items]);

  if (myFoundItems.length < 1) {
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
          No found item registered.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.appContainer}>
      <View style={styles.listContainer}>
        <Text style={styles.title}>List of my found items</Text>
        <FlatList
          data={myFoundItems}
          renderItem={(itemData) => {
            return <FoundItemComponent foundItem={itemData.item} />;
          }}
          keyExtractor={(item) => {
            return item.item_id;
          }}
        />
      </View>
    </View>
  );
}
export default FoundItemMyListScreen;

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
