import { useLocalSearchParams } from "expo-router";
import { BookingDetailsScreen } from "../../../src/screens/BookingDetailsScreen";

export default function DriverBookingDetailsRoute() {
  const { id } = useLocalSearchParams();
  return <BookingDetailsScreen bookingId={id as string} />;
}
