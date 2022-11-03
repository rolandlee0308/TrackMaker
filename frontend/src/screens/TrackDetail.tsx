import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";
const styles = StyleSheet.create({});

export default function TrackDetail({ route }: any) {
  const _id = route.params._id;
  const { state } = useContext(TrackContext);

  const track = state.find((t: any) => t._id === _id);
  const initialCoords = track.locations[0].coords;
  return (
    <>
      <MapView
        initialRegion={{
          ...initialCoords,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
        style={{ height: 300 }}
      >
        <Polyline coordinates={track.locations.map((loc: any) => loc.coords)} />
      </MapView>
    </>
  );
}
