import type { JournalEntry } from "../types";
import dayjs from "dayjs";

export const MOCK_JOURNALS: JournalEntry[] = [
  {
    uuid: 1, // Matches a Patient CPR or ID
    journal: {
      // Spec 3.1.2: date must be 'int' (Unix Timestamp)
      date: dayjs().subtract(2, "days").unix(),
      patient_summary:
        "Patient presented with mild hypertension. Blood pressure 145/90.",
      eprescription_edispensation: "Amoxicillin 500mg - 1 tablet twice daily.",
      laboratory_results: "Blood panel clear. Cholesterol slightly elevated.",
      medical_imaging_and_reports: "Chest X-Ray: Normal findings.",
      hospital_discharge_reports:
        "Discharged from Northside Medical with follow-up in 2 weeks.",
    },
  },
  {
    uuid: 2,
    journal: {
      date: dayjs().subtract(1, "month").unix(),
      patient_summary: "Routine screening for Type 2 Diabetes management.",
      eprescription_edispensation: "Metformin 500mg.",
      laboratory_results: "HbA1c: 6.5% - Stable.",
      medical_imaging_and_reports: "N/A",
      hospital_discharge_reports: "N/A",
    },
  },
  {
    uuid: 3,
    journal: {
      date: dayjs().unix(),
      patient_summary:
        "Acute allergic reaction to pollen. Prescribed antihistamines.",
      eprescription_edispensation: "Cetirizine 10mg.",
      laboratory_results: "IgE levels elevated.",
      medical_imaging_and_reports: "N/A",
      hospital_discharge_reports:
        "Patient stabilized in clinic; no hospitalization required.",
    },
  },
];
