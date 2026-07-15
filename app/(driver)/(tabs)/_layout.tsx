import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../../../src/styles/theme";

export default function DriverTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="driver-home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="directions-car" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="driver-requests"
        options={{
          title: "Requests",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="history" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="driver-profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
