import { API_BASE_URL } from "../constants/config";
import type { Booking, BookingStatus } from "../types";

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL_NOT_SET");
  }
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "content-type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export const bookingApi = {
  list: () => request<Booking[]>("/bookings"),
  get: (id: string) => request<Booking>(`/bookings/${id}`),
  create: (booking: Partial<Booking>) =>
    request<Booking>("/bookings", {
      method: "POST",
      body: JSON.stringify(booking),
    }),
  accept: (id: string, driverId: string, driverName: string) =>
    request<Booking>(`/bookings/${id}/accept`, {
      method: "PATCH",
      body: JSON.stringify({ driverId, driverName, status: "accepted" }),
    }),
  updateStatus: (id: string, status: BookingStatus) =>
    request<Booking>(`/bookings/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};
