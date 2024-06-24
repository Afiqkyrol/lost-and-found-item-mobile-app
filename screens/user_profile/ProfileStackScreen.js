import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import ProfileUpdateScreen from "./ProfileUpdateScreen";

const stack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#faedcd" } }}
    >
      <stack.Screen
        name="User Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen name="Profile Update" component={ProfileUpdateScreen} />
    </stack.Navigator>
  );
}

export default ProfileStackScreen;
