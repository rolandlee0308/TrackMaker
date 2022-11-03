import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";

export default function Resolve({ navigation, route }: any) {
  const { localSignin } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      localSignin();
    });

    return unsubscribe;
  }, [navigation]);

  return <></>;
}
