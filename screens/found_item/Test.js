import { View, Text } from "react-native";

function Test({ route }) {
  return (
    <View>
      <Text>{route.params.id}</Text>
    </View>
  );
}

export default Test;
