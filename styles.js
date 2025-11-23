import { StyleSheet } from "react-native";

export default StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    position: "absolute",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 10,
    borderColor: "red",
    padding: 10,
    color: "white",
  },
  line: {
    borderBottomColor: "#414141ff",
    borderBottomWidth: 5,
    padding: 5,
    margin: 10,
  },
  workoutItem: {
    padding: 15,
    margin: 5,
    borderWidth: 5,
    borderColor: "#2196F3",
    borderRadius: 25,
  },
  workoutText: {
    color: "#ffffffff",
    fontSize: 24,
  },
  button: {
    marginHorizontal: "10%",
  },
  buttonText: {
    borderRadius: 25,
    fontSize: 24,
    color: "#ffffffff",
    backgroundColor: "#2196F3",
    textAlign: "center",
  },
});