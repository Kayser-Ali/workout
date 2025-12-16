import styles from "@/styles";
import Storage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import {
  Button,
  Dialog,
  Provider as PaperProvider,
  Portal,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { addExercises } from "./workoutStore";

export default function workout() {
  const params = useLocalSearchParams<{ id: string }>();
  const [exercise, setExercise] = useState("");
  const [exerciseList, setExerciseList] = useState("");

  const [visible, setVisible] = useState(false);
  const openPrompt = () => setVisible(true);
  const closePrompt = () => setVisible(false);

  const fetchAllExercises = async () => {
    try {
      const value = await Storage.getItem(params.id);
      if (value) {
        setExerciseList(JSON.parse(value).exercises);
      }
    } catch (error) {
      console.error("Failed to fetch exercises:", error);
    }
  };

  const handleConfirm = async () => {
    await addExercises(params.id, exercise);

    setExercise("");
    closePrompt();
    fetchAllExercises();
  };

  useEffect(() => {
    fetchAllExercises();
  }, [params.id]);

  return (
    <PaperProvider>
      <SafeAreaView>
        <TouchableOpacity
          testID="exerciseButton"
          style={styles.button}
          onPress={openPrompt}
        >
          <Text style={styles.buttonText}>Exercise hinzufügen</Text>
        </TouchableOpacity>
        <Portal>
          <Dialog
            testID="dialogPopup"
            visible={visible}
            onDismiss={closePrompt}
          >
            <Dialog.Title>Exercise-Namen eingeben</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Name"
                value={exercise}
                onChangeText={setExercise}
                mode="outlined"
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleConfirm}>OK</Button>
              <Button onPress={closePrompt}>Abbrechen</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
      <FlatList
        style={{}}
        data={exerciseList}
        renderItem={({ item }) => (
          <TouchableOpacity testID="createdExercise">
            <Text style={styles.workoutText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </PaperProvider>
  );
}
