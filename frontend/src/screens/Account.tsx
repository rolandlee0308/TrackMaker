import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Button } from "react-native-elements";
import Spacer from "../components/Spacer";

const styles = StyleSheet.create({});

export default function Account() {
  const { signout } = useContext(AuthContext);

  return (
    <>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </>
  );
}
