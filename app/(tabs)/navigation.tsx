import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Workout: {id: string}
};

const Stack = createNativeStackNavigator<RootStackParamList>();
