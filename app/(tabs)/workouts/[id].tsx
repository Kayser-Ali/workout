import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function workout() {
const params = useLocalSearchParams<{ id: string }>()

return(
  <Text>{ params.id }</Text>
)
}