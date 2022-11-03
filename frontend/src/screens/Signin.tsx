import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    marginBottom: 250,
  },
});

export default function Signin({ navigation }: any) {
  const { state, signin, clearErrorMsg } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      clearErrorMsg();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Don't have an account? Sign up instead"
        routeName="signup"
      />
    </View>
  );
}
