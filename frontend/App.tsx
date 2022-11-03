import React from "react";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";

import Account from "./src/screens/Account";
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import Resolve from "./src/screens/Resolve";
import TrackCreate from "./src/screens/TrackCreate";
import TrackDetail from "./src/screens/TrackDetail";
import TrackList from "./src/screens/TrackList";

import { navigationRef } from "./src/navigationRef";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { Icon } from "react-native-elements";

const Drawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();
const TrackStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function getHeaderTitle(route: any) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route);
  switch (routeName) {
    case "signin":
    case "signup":
      return "Authentication";
    default:
      return "";
  }
}

function LoginSignup() {
  return (
    <AuthStack.Navigator initialRouteName="default">
      <AuthStack.Screen
        name="default"
        component={Resolve}
        options={{ header: () => <></> }}
      />
      <AuthStack.Screen
        name="signup"
        component={Signup}
        options={{ header: () => <></> }}
      />
      <AuthStack.Screen
        name="signin"
        component={Signin}
        options={{ header: () => <></> }}
      />
    </AuthStack.Navigator>
  );
}

function TrackListScreen() {
  return (
    <TrackStack.Navigator>
      <TrackStack.Screen
        name="trackList"
        component={TrackList}
        options={{ headerTitle: "Tracks", headerTitleAlign: "center" }}
      />
      <TrackStack.Screen
        name="trackDetail"
        component={TrackDetail}
        options={({ route }: any) => {
          return { headerTitle: route.params.name };
        }}
      />
    </TrackStack.Navigator>
  );
}

function MainScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="createTrack"
        component={TrackCreate}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="add-to-list"
              type="entypo"
              color={color}
              tvParallaxProperties={undefined}
            />
          ),
          tabBarLabel: "CreateTrack",
        }}
      />
      <Tab.Screen
        name="account"
        component={Account}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="user"
              type="font-awesome"
              color={color}
              tvParallaxProperties={undefined}
            />
          ),
          tabBarLabel: "Account",
        }}
      />
      <Tab.Screen
        name="track"
        component={TrackListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="go-kart-track"
              type="material-community"
              color={color}
              tvParallaxProperties={undefined}
            />
          ),
          tabBarLabel: "Track",
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator>
        <Drawer.Screen
          name="loginFlow"
          component={LoginSignup}
          options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            title: "Authentication",
          })}
        />
        <Drawer.Screen name="mainFlow" component={MainScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
