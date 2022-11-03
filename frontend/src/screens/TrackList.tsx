import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { ListItem } from "react-native-elements";
const styles = StyleSheet.create({});

export default function TrackList({ navigation }: any) {
  const { state, fetchTracks } = useContext(TrackContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchTracks();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("trackDetail", { _id: item._id, name: item.name })
              }
            >
              <ListItem
                hasTVPreferredFocus={undefined}
                tvParallaxProperties={undefined}
              >
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
