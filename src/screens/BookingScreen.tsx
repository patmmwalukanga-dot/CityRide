import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useBookings } from "../hooks/useBookings";
import { theme } from "../styles/theme";

export function BookingScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const { requestBooking } = useBookings();

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState("");

  const onSubmit = () => {
    if (!pickup || !destination || !user) return;
    requestBooking({
      passengerId: user.uid,
      passengerName: user.name,
      pickup,
      destination,
      fare: fare ? Number(fare) : undefined,
    });
    router.back();
  };

  return (
    <Screen title={t("booking.title")}>
      <Input
        label={t("booking.pickup")}
        value={pickup}
        onChangeText={setPickup}
        placeholder="e.g. City Center"
      />
      <Input
        label={t("booking.destination")}
        value={destination}
        onChangeText={setDestination}
        placeholder="e.g. Airport"
      />
      <Input
        label={t("booking.fare")}
        value={fare}
        onChangeText={setFare}
        keyboardType="numeric"
        placeholder="0.00"
      />
      <View style={styles.action}>
        <Button label={t("booking.confirm")} onPress={onSubmit} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  action: {
    marginTop: theme.spacing(2),
  },
});
