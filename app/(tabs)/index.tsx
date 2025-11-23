import styles from '@/styles';
import { Workout } from "@/types/workout";
import Storage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  Dialog,
  Button as PaperButton,
  Provider as PaperProvider,
  Portal,
  TextInput
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [workouts, setWorkouts] = useState<Workout[]>();

  const openPrompt = () => setVisible(true);
  const closePrompt = () => setVisible(false);

  const handleConfirm = async () => {
    const id = Date.now().toString();

    const newWorkout = {
      id,
      name: text,
      exercises: [],
    };

    await Storage.setItem(id, JSON.stringify(newWorkout));

    setText("");
    closePrompt();
    fetchAllWorkouts();
  };

  const fetchAllWorkouts = async () => {
    try {
      const keys = await Storage.getAllKeys();
      const values = await Storage.multiGet(keys);

      const parsed: Workout[] = values
  .map(([_, value]) => (value ? JSON.parse(value) as Workout : null))
  .filter((w): w is Workout => w !== null);


      setWorkouts(parsed);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    }
  };

  useEffect(() => {
    fetchAllWorkouts();
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView style={{ padding: 5 }}>
        <TouchableOpacity  testID="addWorkoutButton" style={styles.button} onPress={openPrompt}>
          <Text style={styles.buttonText}>Workout erstellen</Text>
        </TouchableOpacity>
        <Portal>
          <Dialog testID="dialogPopup" visible={visible} onDismiss={closePrompt}>
            <Dialog.Title>Workout-Namen eingeben</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Name"
                testID="workoutTextInput"
                value={text}
                onChangeText={setText}
                mode="outlined"
              />
            </Dialog.Content>
            <Dialog.Actions>
              <PaperButton onPress={handleConfirm}>OK</PaperButton>
              <PaperButton onPress={closePrompt}>Abbrechen</PaperButton>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
      <View
        style={{
          borderBottomColor: "#2b2b2b",
          borderBottomWidth: 5,
          paddingHorizontal: 5,
        }}
      />
      <View>
        <FlatList
          style={{}}
          data={workouts}
          renderItem={({ item }) => (
            <Link
              href={{ pathname: "/workouts/[id]", params: { id: item.id } }}
            >
              <TouchableOpacity testID="createdWorkout" style={styles.workoutItem}>
                <Text style={styles.workoutText}>{item.name}</Text>
              </TouchableOpacity>
            </Link>
          )}
        />
      </View>
    </PaperProvider>
  );
}


