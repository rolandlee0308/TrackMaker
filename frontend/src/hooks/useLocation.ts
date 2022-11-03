import { useState, useEffect } from "react";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
  LocationSubscription,
} from "expo-location";

export default function useLocation(shouldTrack: boolean, callback: any) {
  const [err, setErr] = useState("");
  // const [subscriber, setSubscriber] = useState<LocationSubscription | null>(
  //   null
  // );

  useEffect(() => {
    let subscriber: any;
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          setErr("Location permission not granted");
        }

        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );
        // setSubscriber(sub);
      } catch (e: any) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber!.remove();
      }
      subscriber = null;
    }
    return () => {
      if (subscriber) subscriber!.remove();
    };
  }, [shouldTrack, callback]);

  return [err];
}

/**
Avoid Stale References:
1. always add props in useEffect dependency array (if props are getting updated). (Note: do not use setter in useEffect which might trigger infinite re-render)
2. don't define helper functions that reference props, state, or context outside of useEffect
 */
