import { useLocalSearchParams } from "expo-router";
import { BookingDetailsScreen } from "../../../src/screens/BookingDetailsScreen";

export default function BookingDetailsRoute() {
  const { id } = useLocalSearchParams();
  return <BookingDetailsScreen bookingId={id as string} />;
}
