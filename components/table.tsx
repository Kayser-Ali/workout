import React, { Component } from "react";
import { Text, View } from "react-native";

interface TableProps {
  name: string;
  repetitions: number;
}

export default class Table extends Component<TableProps> {
  renderRow(index: number) {
    for()

    return (
      <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
        <View
          style={{
            flex: 3,
            alignSelf: "stretch",
            borderWidth: 1,
            borderColor: "white",
          }}
        />
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            borderWidth: 1,
            borderColor: "white",
          }}
        />
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            borderWidth: 1,
            borderColor: "white",
          }}
        />
      </View>
    );
  }

  render() {
    const { name, repetitions } = this.props;

    const data = [1, 2, 3, 4, 5];
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ marginBottom: 10 }}>{name}</Text>
        {Array.from({ length: repetitions }).map((_, i) => this.renderRow(i))}
      </View>
    );
  }
}
 