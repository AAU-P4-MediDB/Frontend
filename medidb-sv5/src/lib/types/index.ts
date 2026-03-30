// src/lib/types.ts

/**
 * CUR (Central User Register) - Spec 1.1.1 & 1.3
 */
export interface User {
  uuid: string; // PRIMARY KEY [cite: 50, 72]
  email: string; // NOT NULL, < 200 chars [cite: 51, 73]
  name: string; // NOT NULL, < 1000 chars [cite: 53, 76]
  phone: number; // INT, NOT NULL (Danish +45) [cite: 68, 70, 84]
  clinic: string; // UUID Foreign Key to CCR [cite: 65, 66, 79]
  position: 1 | 2 | 3 | 4 | 5; // 1: Secretary, 2: Nurse, 3: Doctor, 4: Local Admin, 5: Sys Admin [cite: 60, 274-279]
  pfp?: string; // Storage path to PFP (Optional) [cite: 63, 64, 83]
  imageUrl?: string; // UI Helper (optional)
}

/**
 * PR (Patient Register) - Spec 2.1.1
 */
export interface Patient {
  uuid: string; // PRIMARY KEY [cite: 96]
  name: string; // NOT NULL [cite: 100]
  dob: string; // DATE format (First half of CPR) [cite: 102, 152]
  cpr_key: number; // INT 0-9999 (Last 4 of CPR) [cite: 106, 108]
  bio_gender: boolean; // BOOL (Biological gender) [cite: 109, 110]
  pronouns?: string; // TEXT [cite: 111, 112]
  clinic: string; // UUID Foreign Key (CCR) [cite: 113, 115]
  doctor: string; // UUID Foreign Key (CUR) [cite: 116, 118]
  weight: number; // DECIMAL [cite: 119, 120]
  height: number; // SMALL INT [cite: 122, 123]
  diagnoses: string[]; // Array of strings [cite: 125, 126]
  vitals: VitalsData; // JSON [cite: 127, 128]
  prescriptions: any; // JSON [cite: 130]
  pfp?: string; // Path to patient pfp [cite: 131, 132]
}

/**
 * Vitals Data Structure - Spec 3.1.1
 */
export interface VitalsData {
  date: number; // INT (Unix timestamp) [cite: 404]
  "heart rate": string; // [cite: 406]
  "blood pressure": string; // [cite: 407]
  Sp02: string; // [cite: 409]
}

/**
 * Journal Entry - Spec 3.1.2
 */
export interface JournalResponse {
  date: number; // INT (Unix timestamp) [cite: 424]
  patient_summary: string; // [cite: 426]
  eprescription_edispensation: string; // [cite: 427]
  laboratory_results: string; // [cite: 428]
  medical_imaging_and_reports: string; // [cite: 429]
  hospital_discharge_reports: string; // [cite: 430]
}

export interface JournalEntry {
  uuid: number; // Patient ID (INT) [cite: 422]
  journal: JournalResponse; // [cite: 423]
}

/**
 * Appointments - Spec 3.1.5
 */
export interface Appointment {
  appointment_id: number; // INT [cite: 467]
  date: string; // DATE (YYYY-MM-DD) [cite: 468]
  time: string; // TIME (HH:MM) [cite: 469]
  doctor: string; // UUID (Reference to CUR) [cite: 470]
  clinic: string; // UUID (Reference to CCR) [cite: 472]
  note: string; // Note text [cite: 471]
  // UI Helpers
  status: "completed" | "in-progress" | "upcoming" | "cancelled";
  app_type:
    | "routine-checkup"
    | "follow-up"
    | "consultation"
    | "immunization"
    | "screening";
}
