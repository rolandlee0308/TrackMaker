import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Spacer from "./Spacer";

const styles = StyleSheet.create({
  link: {
    color: "blue",
  },
});

export default function NavLink({ text, routeName }: any) {
  const navigation = useNavigation();
  return (
    // @ts-ignore
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
}
