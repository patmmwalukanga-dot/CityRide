import { useLocalSearchParams } from "expo-router";
import { DriverRideRequestScreen } from "../../../src/screens/DriverRideRequestScreen";

export default function DriverRequestRoute() {
  const { id } = useLocalSearchParams();
  return <DriverRideRequestScreen bookingId={id as string} />;
}
