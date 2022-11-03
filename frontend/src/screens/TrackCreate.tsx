import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import React, { useContext, useCallback } from "react";
import Map from "../components/Map";
import "../_mockLocation"; //Test purpose
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import { useIsFocused } from "@react-navigation/native";
import TrackForm from "../components/TrackForm";
const styles = StyleSheet.create({});

export default function TrackCreate() {
  const { state, addLocation } = useContext(LocationContext);
  const isFocused = useIsFocused();
  const callback = useCallback(
    (location: any) => {
      addLocation(location, state.recording);
    },
    [state.recording]
  );

  const [err] = useLocation(isFocused || state.recording, callback);
  return (
    <>
      <Text h3>Create a Track</Text>
      <Map />
      {err && <Text style={{ color: "red" }}>{err}</Text>}
      <TrackForm />
    </>
  );
}
