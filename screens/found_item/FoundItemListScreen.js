import { View, Text, StyleSheet } from "react-native";
import { Button, FAB, Searchbar } from "react-native-paper";
import { getFoundItem } from "../../util/http";
import { useEffect, useContext, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import FoundItemComponent from "../../component/FoundItemComponent";
import { FoundItemContext } from "../../store/found-item-context";

function FoundItemListScreen({ navigation }) {
  const foundItemContext = useContext(FoundItemContext);
  const [searhFilter, setSearchFilter] = useState([]);
  const [searchState, setSearchState] = useState("");

  useEffect(() => {
    async function fetchFoundItem() {
      const foundItem = await getFoundItem();
      foundItemContext.addItem(foundItem);
    }

    fetchFoundItem();
  }, [foundItemContext.items]);

  function navToFoundItemRegScreen() {
    navigation.navigate("Register Found Item");
  }

  function navToFoundItemMyListScreen() {
    navigation.navigate("My Found Items");
  }

  function onChangeSearch(enteredText) {
    let text;
    const filteredItem = [];
    for (let i = 0; i < foundItemContext.items.length; i++) {
      text = foundItemContext.items[i].item_name;
      text = text.toLowerCase();
      if (text.search(enteredText.toLowerCase()) >= 0) {
        filteredItem.push(foundItemContext.items[i]);
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
        No lost item registered.
      </Text>
    );
    if (searhFilter.length > 0) {
      content = (
        <FlatList
          data={searhFilter}
          renderItem={(itemData) => {
            return <FoundItemComponent foundItem={itemData.item} />;
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
              onPress={navToFoundItemMyListScreen}
            >
              View my found items.
            </Button>
          </View>
          <Text style={styles.title}>List of found items</Text>
          {content}
        </View>
        <FAB
          label="Register Found Item"
          color="#000000"
          icon="plus"
          style={styles.fab}
          onPress={navToFoundItemRegScreen}
        />
      </View>
    );
  } else {
    if (foundItemContext.items.length < 1) {
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
            label="Register Found Item"
            color="#000000"
            icon="plus"
            style={styles.fab}
            onPress={navToFoundItemRegScreen}
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
              onPress={navToFoundItemMyListScreen}
            >
              View my found items.
            </Button>
          </View>
          <Text style={styles.title}>List of found items</Text>
          <FlatList
            data={foundItemContext.items}
            renderItem={(itemData) => {
              return <FoundItemComponent foundItem={itemData.item} />;
            }}
            keyExtractor={(item) => {
              return item.item_id;
            }}
          />
        </View>
        <FAB
          label="Register Found Item"
          color="#000000"
          icon="plus"
          style={styles.fab}
          onPress={navToFoundItemRegScreen}
        />
      </View>
    );
  }
}

export default FoundItemListScreen;

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
