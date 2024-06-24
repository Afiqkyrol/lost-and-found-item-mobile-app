import { createStackNavigator } from "@react-navigation/stack";
import LostItemContextProvider from "../../store/lost-item-context";
import LostItemListScreen from "./LostItemListScreen";
import LostItemRegScreen from "./LostItemRegScreen";
import LostItemDetScreen from "./LostItemDetScreen";
import LostItemMyListScreen from "./LostItemMyListScreen";

const stack = createStackNavigator();

function LostItemStackScreen() {
  return (
    <LostItemContextProvider>
      <stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "#faedcd" } }}
      >
        <stack.Screen
          name="List of Lost Item"
          component={LostItemListScreen}
          options={{ headerShown: false }}
        />
        <stack.Screen name="Register Lost Item" component={LostItemRegScreen} />
        <stack.Screen name="Lost Item Details" component={LostItemDetScreen} />
        <stack.Screen name="My Lost Items" component={LostItemMyListScreen} />
      </stack.Navigator>
    </LostItemContextProvider>
  );
}

export default LostItemStackScreen;
