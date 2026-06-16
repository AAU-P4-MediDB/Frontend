import type { Notification } from "../types";

const SOPHIA_LEE_UUID = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";
const JOHN_CENA_UUID = "a2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7";

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    notificationId: "n-011",
    doctor: SOPHIA_LEE_UUID,
    message: "New lab results available",
    type: "info" as const,
    read: false,
  },
  {
    notificationId: "n-012",
    doctor: JOHN_CENA_UUID,
    message: "Appointment starts in 15 mins",
    type: "urgent" as const,
    read: false,
  },
];
