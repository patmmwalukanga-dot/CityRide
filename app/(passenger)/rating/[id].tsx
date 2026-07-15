import { useLocalSearchParams } from "expo-router";
import { RatingScreen } from "../../../src/screens/RatingScreen";

export default function RatingRoute() {
  const { id } = useLocalSearchParams();
  return <RatingScreen bookingId={id as string} />;
}
