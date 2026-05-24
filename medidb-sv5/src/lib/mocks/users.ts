/*
 * DISCLAIMER: All personal identifiers, including Emails, contained within this file
 * are fictitious and randomly generated for testing purposes only. No data in this file
 * relates to or is capable of identifying any natural person, whether directly or indirectly.
 * Accordingly, this data does not constitute "personal data" within the meaning of Article 4(1)
 * of the General Data Protection Regulation (EU) 2016/679, as it falls outside the scope
 * of the GDPR in accordance with Recital 26 thereof.
 */


import type { User } from "../types";

const PFP = 'https://www.nicepng.com/png/full/367-3671905_person-icon-person-icon-silhouette.png';

export const MOCK_USERS: User[] = [
  {
    uuid: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    name: "Jane Doe",
    email: "jane@clinic.dk",
    phone: 4512345678,
    clinic: "north-clinic-uuid",
    position: 2, // Doctor
    pfp: PFP,
  },
  {
    uuid: "a2b3c4d5-e6f7-g8h9-i0j1-k2l3m4n5o6p7",
    name: "John Doe",
    email: "john@clinic.dk",
    phone: 4588888888,
    clinic: "south-clinic-uuid",
    position: 2, // Doctor
    pfp: PFP,
  },
  {
    uuid: "sec-001",
    name: "Jane Sophia Lee",
    email: "js@clinic.dk",
    phone: 4511223344,
    clinic: "north-clinic-uuid",
    position: 4, // Secretary
    pfp: PFP,
  },
  {
    uuid: "admin-001",
    name: "System Administrator",
    email: "admin@medidb.dk",
    phone: 4500000000,
    clinic: "central-office-uuid",
    position: 4, // Sys Admin (Spec 1.1.1)
    pfp: PFP,
  },
];

