import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const testBooking = async () => {
  try {
    await addDoc(collection(db, "bookings"), {
      name: "Test User",
      from: "CBD",
      to: "Kabulonga",
      time: new Date(),
    });
    console.log("Booking saved to Firebase!");
  } catch (e) {
    console.error("Error: ", e);
  }
};
