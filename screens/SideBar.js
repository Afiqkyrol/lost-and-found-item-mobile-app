import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import HomeScreen from "./HomeScreen";
import { Button } from "react-native-paper";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import FoundItemStackScreen from "./found_item/FoundItemStackScreen";
import LostItemStackScreen from "./lost_item/LostItemStackScreen";
import ProfileStackScreen from "./user_profile/ProfileStackScreen";
import { updateUser } from "../util/http";
import { handlePushToken } from "../util/Notifications";
import HomeStackScreen from "./HomeStackScreen";

const Drawer = createDrawerNavigator();

function SideBar() {
  const authContext = useContext(AuthContext);

  async function logoutHandler() {
    handlePushToken(authContext.userId, "logout");
    authContext.logout();
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#d4a373", elevation: 4 },
        drawerContentStyle: { backgroundColor: "#ccd5ae" },
        drawerActiveBackgroundColor: "#e9edc9",
        drawerLabelStyle: { color: "black" },
        drawerActiveTintColor: "black",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          headerRight: () => (
            <Button
              icon="logout"
              mode="text"
              textColor="#000000"
              onPress={logoutHandler}
            >
              Logout
            </Button>
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          headerRight: () => (
            <Button
              icon="logout"
              mode="text"
              textColor="#000000"
              onPress={logoutHandler}
            >
              Logout
            </Button>
          ),
        }}
      />
      <Drawer.Screen
        name="Found Item"
        component={FoundItemStackScreen}
        options={{
          headerRight: () => (
            <Button
              icon="logout"
              mode="text"
              textColor="#000000"
              onPress={logoutHandler}
            >
              Logout
            </Button>
          ),
        }}
      />
      <Drawer.Screen
        name="Lost Item"
        component={LostItemStackScreen}
        options={{
          headerRight: () => (
            <Button
              icon="logout"
              mode="text"
              textColor="#000000"
              onPress={logoutHandler}
            >
              Logout
            </Button>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default SideBar;

const styles = StyleSheet.create({
  sideBarContainer: {
    backgroundColor: "e9edc9",
  },
});
