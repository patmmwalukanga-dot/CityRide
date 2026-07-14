export type UserRole = "passenger" | "driver";

export interface User {
  uid: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  createdAt: number;
}

export type BookingStatus =
  | "requested"
  | "accepted"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  passengerId: string;
  passengerName: string;
  pickup: string;
  destination: string;
  status: BookingStatus;
  driverId?: string;
  driverName?: string;
  fare?: number;
  createdAt: number;
  updatedAt: number;
}
