import { createStackNavigator } from "@react-navigation/stack";
import FoundItemListScreen from "./FoundItemListScreen";
import FoundItemRegScreen from "./FoundItemRegScreen";
import FoundItemDetScreen from "./FoundItemDetScreen";
import FoundItemContextProvider from "../../store/found-item-context";
import FoundItemMyListScreen from "./FoundItemMyListScreen";

const Stack = createStackNavigator();

function FoundItemStackScreen() {
  return (
    <FoundItemContextProvider>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "#faedcd" } }}
      >
        <Stack.Screen
          name="List of Found Items"
          component={FoundItemListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register Found Item"
          component={FoundItemRegScreen}
        />
        <Stack.Screen
          name="Found Item Details"
          component={FoundItemDetScreen}
        />
        <Stack.Screen name="My Found Items" component={FoundItemMyListScreen} />
      </Stack.Navigator>
    </FoundItemContextProvider>
  );
}

export default FoundItemStackScreen;
