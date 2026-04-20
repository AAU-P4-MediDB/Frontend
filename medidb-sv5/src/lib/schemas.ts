import { z } from 'zod';

// -------------------------
// Shared primitives
// -------------------------

const uuid = z.string().uuid();
const danishPhone = z.number().int().min(0).max(99999999);
const cprKey = z.number().int().min(0).max(9999);

// Position enum matches backend: 0=Secretary, 1=Nurse, 2=Doctor, 3=LocalAdmin, 4=SysAdmin
const position = z.number().int().min(0).max(4);

// -------------------------
// 1.y.z - User Management
// -------------------------

// 1.1.1 - User Registration
export const userRegistrationSchema = z.object({
    email: z.string().email().max(200),
    password: z.string().min(8),
    name: z.string().min(1).max(1000),
    clinic: uuid,
    position,
    phone: danishPhone,
    pfp: z.string().optional(), // storage path, optional
});

// 1.1.2 - User Login
export const userLoginSchema = z.object({
    email: z.string().email().max(200),
    password: z.string().min(1),
});

// 1.3 - User Fetching
export const userFetchSchema = z.object({
    email: z.string().email().max(200),
});

// 1.4 - User Password Reset
export const userPasswordResetSchema = z.object({
    email: z.string().email().max(200),
    new_pass: z.string().min(8),
});

// -------------------------
// 2.y.z - Patient Management
// -------------------------

// 2.1 - Patient Registration
export const patientRegistrationSchema = z.object({
    name: z.string().min(1).max(100),
    pronouns: z.string().max(50).optional(),
    clinic: uuid,
    bday: z.string().date(), // DD/MM/YYYY per spec, use string and validate format
    weight: z.number().positive(),
    bio_sex: z.boolean(),
    CPR: cprKey,
    diagnoses: z.array(z.string()).optional(),
    vitals: z.record(z.unknown()),
    prescriptions: z.record(z.unknown()).optional(),
    pfp: z.string().optional(),
});

// 2.3.2 - Patient Assignment
export const patientAssignmentSchema = z.object({
    uuid_pt: uuid,
    uuid_dr: uuid,
});

// -------------------------
// 3.1 - Doctor-Patient Fetching
// -------------------------

const cprRequest = z.object({
    CPR_pt: z.number().int(),
});

export const vitalsFetchSchema = cprRequest;
export const journalFetchSchema = cprRequest;
export const prescriptionFetchSchema = cprRequest;
export const diagnosisFetchSchema = cprRequest;
export const appointmentFetchSchema = cprRequest;
export const personInfoFetchSchema = cprRequest;
export const labResultFetchSchema = cprRequest;

// -------------------------
// 3.2 - Doctor-Patient Updating
// -------------------------

// 3.2.1 - Vitals Updating
export const vitalsUpdateSchema = z.object({
    vitals: z.object({
        date: z.number().int(),
        heart_rate: z.string().optional(),
        blood_pressure: z.string().optional(),
        SpO2: z.string().optional(),
    }).passthrough(), // passthrough since vitals fields aren't finalised in spec
});

// 3.2.2 - Journal Updating
export const journalUpdateSchema = z.object({
    journal: z.object({
        date: z.number().int(),
        patient_summary: z.string().optional(),
        eprescription_edispensation: z.string().optional(),
        laboratory_results: z.string().optional(),
        medical_imaging_and_reports: z.string().optional(),
        hospital_discharge_reports: z.string().optional(),
    }).passthrough(),
});

// 3.2.3 - Prescription Updating
export const prescriptionUpdateSchema = z.object({
    prescriptions: z.record(z.unknown()),
});

// 3.2.4 - Diagnosis Updating
export const diagnosisUpdateSchema = z.object({
    diagnoses: z.array(z.string()),
});

// 3.2.5 - Appointment Updating
export const appointmentUpdateSchema = z.object({
    appointment: z.object({
        appointment_id: uuid,
        date: z.string().date(),
        time: z.string(),
        doctor: uuid,
        clinic: uuid,
        notes: z.string().optional(),
    }),
});

// 3.2.6 - Person Info Updating
export const personInfoUpdateSchema = z.object({
    cpr_key: cprKey,
    name: z.string().min(1).max(100),
    pronouns: z.string().max(50).optional(),
    bday: z.string().date(),
    bio_sex: z.boolean(),
    pfp: z.string().optional(),
});

// 3.2.7 - Lab Result Updating
export const labResultUpdateSchema = z.object({
    lab_result: z.object({
        test_issuer: uuid,
        test_issuer_clinic: uuid,
        test_executor: z.string(),
        test_executor_phone: danishPhone,
        result_id: z.number().int(),
        date: z.string().date(),
        test_name: z.string(),
        result: z.string(),
        unit: z.string(),
        reference_range: z.string(),
        notes: z.string().optional(),
    }),
});

// -------------------------
// 3.5 - Permission Management
// -------------------------

const drPermEntry = z.object({
    'dr. uuid': z.number().int(),
    'perm int': z.number().int(),
});

// 3.5.1 - Permission Updating
export const permissionUpdateSchema = z.record(drPermEntry);

// 3.5.3 - Permission Requesting
export const permissionRequestSchema = z.object({
    'Pt. CPR': z.string(),
    'Dr. UUID': z.number().int(),
    'Perm. Int': z.number().int(),
    'Note': z.string().optional(),
});

// -------------------------
// 3.6 - Doctor Timeline
// -------------------------

const timelineEntry = z.object({
    date: z.number().int(),
    patient: z.string(),
    doctor_accessing: z.string(),
    data_type: z.string(),
    changes: z.string(),
    severity: z.number().int().min(0),
});

export const timelineUpdateSchema = z.object({
    journal: timelineEntry,
});

// -------------------------
// 4.y.z - Sysadmin
// -------------------------

// 4.1.1 - Create Clinic
export const createClinicSchema = z.object({
    name: z.string().min(1).max(1000),
    location: z.string().min(1).max(1000),
    email: z.string().email().max(100).optional(),
    phone: danishPhone,
    cvr: z.number().int().min(0).max(99999999),
});

// 4.1.2 - Fetch Clinic
export const fetchClinicSchema = z.object({
    email: z.string().email().max(100),
});

// 4.2.1 - Create Local Admin
export const createLocalAdminSchema = z.object({
    email: z.string().email().max(200),
    password: z.string().min(8),
    name: z.string().min(1).max(1000),
    clinic: uuid,
    phone: danishPhone,
    pfp: z.string().optional(),
    position: z.literal(4), // always sysadmin per spec comment
});

// 4.2.3 - Fetch Local Admin
export const fetchLocalAdminSchema = z.object({
    email: z.string().email().max(200),
});
