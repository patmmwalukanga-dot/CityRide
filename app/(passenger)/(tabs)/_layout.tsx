import { Tabs } from "expo-router";

export default function PassengerTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="booking-history" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
