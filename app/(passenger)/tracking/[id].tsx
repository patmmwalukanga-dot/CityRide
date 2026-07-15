import { useLocalSearchParams } from "expo-router";
import { RideTrackingScreen } from "../../../src/screens/RideTrackingScreen";

export default function TrackingRoute() {
  const { id } = useLocalSearchParams();
  return <RideTrackingScreen bookingId={id as string} />;
}
