import { FAB, Button, Searchbar } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import { getLostItem } from "../../util/http";
import { useEffect, useContext, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { LostItemContext } from "../../store/lost-item-context";
import LostItemComponent from "../../component/LostItemComponent";

function LostItemListScreen({ navigation }) {
  const lostItemContext = useContext(LostItemContext);
  const [searhFilter, setSearchFilter] = useState([]);
  const [searchState, setSearchState] = useState("");

  useEffect(() => {
    async function fetchFoundItem() {
      const lostItem = await getLostItem();
      lostItemContext.addItem(lostItem);
    }

    fetchFoundItem();
  }, [lostItemContext.items]);

  function navToLostItemMyListScreen() {
    navigation.navigate("My Lost Items");
  }

  function navToLostItemRegScreen() {
    navigation.navigate("Register Lost Item");
  }

  function onChangeSearch(enteredText) {
    let text;
    const filteredItem = [];
    for (let i = 0; i < lostItemContext.items.length; i++) {
      text = lostItemContext.items[i].item_name;
      text = text.toLowerCase();
      if (text.search(enteredText.toLowerCase()) >= 0) {
        filteredItem.push(lostItemContext.items[i]);
      }
    }
    setSearchFilter(filteredItem);
    setSearchState(enteredText);
  }

  if (searchState) {
    let content = (
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
    );
    if (searhFilter.length > 0) {
      content = (
        <FlatList
          data={searhFilter}
          renderItem={(itemData) => {
            return <LostItemComponent lostItem={itemData.item} />;
          }}
          keyExtractor={(item) => {
            return item.item_id;
          }}
        />
      );
    }
    return (
      <View style={styles.appContainer}>
        <View style={styles.listContainer}>
          <Searchbar
            style={styles.buttonContainer}
            placeholder="Search"
            onChangeText={onChangeSearch}
          />

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              buttonColor="#d4a373"
              onPress={navToLostItemMyListScreen}
            >
              View my lost items.
            </Button>
          </View>
          <Text style={styles.title}>List of found items</Text>
          {content}
        </View>
        <FAB
          label="Register Lost Item"
          color="#000000"
          icon="plus"
          style={styles.fab}
          onPress={navToLostItemRegScreen}
        />
      </View>
    );
  } else {
    if (lostItemContext.items.length < 1) {
      return (
        <View style={styles.appContainer}>
          <Searchbar
            style={styles.buttonContainer}
            placeholder="Search"
            onChangeText={onChangeSearch}
          />
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

          <FAB
            label="Register Lost Item"
            color="#000000"
            icon="plus"
            style={styles.fab}
            onPress={navToLostItemRegScreen}
          />
        </View>
      );
    }

    return (
      <View style={styles.appContainer}>
        <View style={styles.listContainer}>
          <Searchbar
            style={styles.buttonContainer}
            placeholder="Search"
            onChangeText={onChangeSearch}
          />

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              buttonColor="#d4a373"
              onPress={navToLostItemMyListScreen}
            >
              View my lost items.
            </Button>
          </View>
          <Text style={styles.title}>List of found items</Text>
          <FlatList
            data={lostItemContext.items}
            renderItem={(itemData) => {
              return <LostItemComponent lostItem={itemData.item} />;
            }}
            keyExtractor={(item) => {
              return item.item_id;
            }}
          />
        </View>
        <FAB
          label="Register Lost Item"
          color="#000000"
          icon="plus"
          style={styles.fab}
          onPress={navToLostItemRegScreen}
        />
      </View>
    );
  }
}

export default LostItemListScreen;

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "#e9edc9",
    flex: 1,
  },
  listContainer: {
    flex: 10,
  },

  buttonContainer: {
    marginHorizontal: 15,
    marginTop: 15,
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
