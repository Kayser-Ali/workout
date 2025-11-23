import type { Workout } from "@/types/workout";
import Storage from "@react-native-async-storage/async-storage";
const workouts: Record<string, Workout> = {};

export async function getWorkout(id: string): Promise<Workout | null> {
  if (workouts[id]) return workouts[id];
  const value = await Storage.getItem(id);
  if (!value) return null;
  const workout = JSON.parse(value) as Workout;
  workouts[id] = workout;
  return workout;
}

export async function addExercises(id: string, exercise: string): Promise<Workout | null> {
    let workout = workouts[id];
    if (!workout) workout = await getWorkout(id) as Workout;
    if (!workout) return null;

    workout.exercises.push(exercise);
    workouts[id] = workout;

    await Storage.setItem(id, JSON.stringify(workout));
    return workout;
}