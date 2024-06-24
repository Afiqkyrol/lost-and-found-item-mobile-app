import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import HighSimItemDetScreen from "./HighSimItemDetScreen";

const Stack = createStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#faedcd" } }}
    >
      <Stack.Screen
        name="Home stack"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Potential Item Details"
        component={HighSimItemDetScreen}
      />
    </Stack.Navigator>
  );
}

export default HomeStackScreen;
