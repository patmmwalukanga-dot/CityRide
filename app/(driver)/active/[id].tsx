import { useLocalSearchParams } from "expo-router";
import { DriverActiveTripScreen } from "../../../src/screens/DriverActiveTripScreen";

export default function DriverActiveTripRoute() {
  const { id } = useLocalSearchParams();
  return <DriverActiveTripScreen bookingId={id as string} />;
}
