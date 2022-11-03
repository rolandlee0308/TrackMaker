import { View, Text, StyleSheet } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  spacer: {
    margin: 15,
  },
});

export default function Spacer({ children }: any) {
  return <View style={styles.spacer}>{children}</View>;
}
