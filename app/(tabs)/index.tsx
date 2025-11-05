import Storage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Dialog,
  Button as PaperButton,
  Provider as PaperProvider,
  Portal,
  TextInput
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter()
  
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState('');
  const [workouts, setWorkouts] = React.useState<[string, string][]>([]); 

  const openPrompt = () => setVisible(true);
  const closePrompt = () => setVisible(false);


  const handleConfirm = async () => {
    console.log('User entered:', text);
    await Storage.setItem(Date.now().toString(), text);
    setText('');
    closePrompt();
    fetchAllWorkouts();
  };

  const fetchAllWorkouts = async () => {
    try{
      const keys = await Storage.getAllKeys(); 
      const values = await Storage.multiGet(keys); 
      setWorkouts(values as [string, string][]);
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
    }
  }

  const openWorkout = async (identity: string) => {
      const value = await Storage.getItem(identity);
      router.setParams
      router.navigate('/workout/value', value)
  }

  useEffect(() => {
    fetchAllWorkouts();
  }, []);
  
  return (
<PaperProvider>
      <SafeAreaView style={{ padding: 5 }}>
        <TouchableOpacity style={styles.button} onPress={openPrompt}>
          <Text style={styles.buttonText}>Workout erstellen</Text>
        </TouchableOpacity>
        <Portal>
          <Dialog visible={visible} onDismiss={closePrompt}>
            <Dialog.Title>Workout-Namen eingeben</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Name"
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
    <View style={{borderBottomColor: '#2b2b2b', borderBottomWidth: 5, paddingHorizontal: 5}}/>
    <View >
      <FlatList style={{}} data={workouts}   renderItem={({ item }) => (
        <Link href={{pathname: "/workouts/[id]", params: { id: item[0]}}} >
        <TouchableOpacity style={styles.workoutItem}>
        <Text style={styles.workoutText}>{item[1]}</Text>
        </TouchableOpacity>
        </Link>
  )}/>
    </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 10,
    borderColor: 'red',
    padding: 10,
    color: 'white',
  },
  line: {
    borderBottomColor: '#414141ff',
    borderBottomWidth: 5,
    padding: 5,
    margin: 10,
  },
workoutItem: {
    padding: 15,
    margin: 5,
    borderWidth: 5,
    borderColor: '#2196F3',
    borderRadius: 25,
  },
  workoutText: {
    color: '#ffffffff',
    fontSize: 24,
  },
  button: {
    marginHorizontal: '10%',
  },
    buttonText: {
    borderRadius: 25,
    fontSize: 24,
    color: '#ffffffff',
    backgroundColor: '#2196F3',
    textAlign: 'center',
  }
});
