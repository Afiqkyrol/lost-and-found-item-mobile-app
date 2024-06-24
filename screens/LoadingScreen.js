import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

function LoadingScreen({ message }) {
  return (
    <View style={styles.rootContainer}>
      <ActivityIndicator size="large" color="#d4a373" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "#e9edc9",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
