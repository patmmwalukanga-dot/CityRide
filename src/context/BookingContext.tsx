import React, { createContext, useState, type ReactNode } from "react";
import type { Booking, BookingStatus } from "../types";

export interface BookingContextValue {
  bookings: Booking[];
  requestBooking: (input: {
    passengerId: string;
    passengerName: string;
    pickup: string;
    destination: string;
    fare?: number;
  }) => Booking;
  acceptBooking: (id: string, driverId: string, driverName: string) => void;
  updateStatus: (id: string, status: BookingStatus) => void;
  bookingsForPassenger: (uid: string) => Booking[];
  availableRequests: () => Booking[];
}

export const BookingContext = createContext<BookingContextValue | undefined>(
  undefined,
);

const now = Date.now();

const seed: Booking[] = [
  {
    id: "b-1001",
    passengerId: "p-demo",
    passengerName: "Amina J.",
    pickup: "City Center",
    destination: "Airport Terminal 2",
    status: "requested",
    fare: 12,
    createdAt: now - 1000 * 60 * 5,
    updatedAt: now - 1000 * 60 * 5,
  },
  {
    id: "b-1002",
    passengerId: "p-demo",
    passengerName: "Amina J.",
    pickup: "Market Road",
    destination: "Hospital Gate B",
    status: "completed",
    driverId: "d-demo",
    driverName: "Kelvin M.",
    fare: 8,
    createdAt: now - 1000 * 60 * 60 * 3,
    updatedAt: now - 1000 * 60 * 60 * 2,
  },
];

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(seed);

  const requestBooking: BookingContextValue["requestBooking"] = (input) => {
    const booking: Booking = {
      id: `b-${Date.now()}`,
      passengerId: input.passengerId,
      passengerName: input.passengerName,
      pickup: input.pickup,
      destination: input.destination,
      status: "requested",
      fare: input.fare,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setBookings((prev) => [booking, ...prev]);
    return booking;
  };

  const acceptBooking: BookingContextValue["acceptBooking"] = (
    id,
    driverId,
    driverName,
  ) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: "accepted", driverId, driverName, updatedAt: Date.now() }
          : b,
      ),
    );
  };

  const updateStatus: BookingContextValue["updateStatus"] = (id, status) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status, updatedAt: Date.now() } : b,
      ),
    );
  };

  const bookingsForPassenger = (uid: string) =>
    bookings.filter((b) => b.passengerId === uid);

  const availableRequests = () =>
    bookings.filter((b) => b.status === "requested");

  return (
    <BookingContext.Provider
      value={{
        bookings,
        requestBooking,
        acceptBooking,
        updateStatus,
        bookingsForPassenger,
        availableRequests,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
