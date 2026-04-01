// src/lib/mocks/users.ts
import type { User } from "../types";

export const MOCK_USERS: User[] = [
  {
    uuid: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    name: "Sophia Lee",
    email: "lee@clinic.dk",
    phone: 4512345678,
    clinic: "north-clinic-uuid",
    position: 2, // Doctor
    pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2bc07d8ed9",
  },
  {
    uuid: "a2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7",
    name: "John Cena",
    email: "john@clinic.dk",
    phone: 4588888888,
    clinic: "south-clinic-uuid",
    position: 2, // Doctor
    pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2b06880c98",
  },
  {
    uuid: "sec-001",
    name: "Sophia Nguyen",
    email: "nguyen@clinic.dk",
    phone: 4511223344,
    clinic: "north-clinic-uuid",
    position: 0, // Secretary
    pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2c853ba9ef",
  },
  {
    uuid: "admin-001",
    name: "System Administrator",
    email: "admin@medidb.dk",
    phone: 4500000000,
    clinic: "central-office-uuid",
    position: 4, // Sys Admin (Spec 1.1.1)
    pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba24b41ed4ea",
  },
];
