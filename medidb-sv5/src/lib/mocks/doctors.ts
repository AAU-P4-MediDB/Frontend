import type { User } from "../types";
import { MOCK_USERS } from "./users";

export interface Doctor extends User {
  specialty: string;
  assignedPatients: string[]; // Array of Patient UUIDs
  assignedNotifications: string[]; // Array of Notification UUIDs
}

export const MOCK_DOCTORS: Doctor[] = [
  {
    ...MOCK_USERS[0],
    specialty: "General Practice",
    assignedPatients: [
      "p-001",
      "p-002",
      "p-003",
      "p-004",
      "p-005",
      "p-006",
      "p-007",
      "p-008",
    ],
    assignedNotifications: ["n-011"],
  },
  {
    ...MOCK_USERS[1],
    specialty: "Hematology",
    assignedPatients: ["p-009", "p-010", "p-011", "p-012"],
    assignedNotifications: ["n-012"],
  },
];
