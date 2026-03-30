import { MOCK_USERS } from "../mocks/users";
import { MOCK_DOCTORS } from "../mocks/doctors";
import { MOCK_PATIENTS } from "../mocks/patients";
import { MOCK_NOTIFICATIONS } from "../mocks/notifications";
import { MOCK_APPOINTMENTS } from "../mocks/appointments";
import { MOCK_JOURNALS } from "../mocks/journals";
import type { JournalEntry } from "../types";

const networkDelay = () => new Promise((res) => setTimeout(res, 400));

export const api = {
  users: {
    getByEmail: async (email: string) => {
      await networkDelay();
      return MOCK_USERS.find((u) => u.email === email);
    },
    getById: async (uuid: string) => {
      await networkDelay();
      return MOCK_USERS.find((u) => u.uuid === uuid);
    },
  },

  doctors: {
    getAll: async () => {
      await networkDelay();
      return MOCK_USERS.filter((u) => u.position === 3);
    },
    getById: async (uuid: string) => {
      await networkDelay();
      return MOCK_USERS.find((u) => u.uuid === uuid && u.position === 3);
    },
  },
  patients: {
    getAssignedToDoctor: async (doctorUuid: string) => {
      await networkDelay();
      // Find the doctor's assigned IDs
      const doctor = MOCK_DOCTORS.find((d) => d.uuid === doctorUuid);
      if (!doctor) return [];

      // Return the full patient objects for those IDs
      return MOCK_PATIENTS.filter((p) =>
        doctor.assignedPatients.includes(p.uuid),
      );
    },
  },

  assignToDoctor: async (uuid_pt: string, uuid_dr: string) => {
    await networkDelay();
    console.log(`Assigning Patient ${uuid_pt} to Doctor ${uuid_dr}`);
    return { success: true, code: 0 };
  },

  notifications: {
    getUnread: async () => {
      await networkDelay();
      return MOCK_NOTIFICATIONS.filter((n) => !n.read);
    },
  },

  appointments: {
    getByPatient: async (cpr_pt: number) => {
      await networkDelay();
      return MOCK_APPOINTMENTS;
    },
    getById: async (id: number) => {
      await networkDelay();
      return MOCK_APPOINTMENTS.find((e) => e.appointment_id === id);
    },
  },

  journals: {
    getByPatient: async (cpr_pt: number): Promise<JournalEntry | undefined> => {
      await networkDelay();
      return MOCK_JOURNALS.find((j) => j.uuid === cpr_pt);
    },
    update: async (uuid: number, updatedJournal: any) => {
      await networkDelay();
      console.log("Journal updated for patient:", uuid);
      return { success: true, code: 0 };
    },
  },
};
