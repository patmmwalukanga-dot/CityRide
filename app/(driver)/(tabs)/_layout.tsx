import { Tabs } from "expo-router";

export default function DriverTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="driver-requests" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
