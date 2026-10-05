/* ============ MediCare Hospital — App Shell ============ */
"use strict";

/* ============================================================
   Patient Data Model
   ============================================================ */
const DEPARTMENTS = [
  "Cardiology",
  "Medicine",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Emergency",
];

const PRIORITIES = ["Low", "Medium", "High", "Critical"];

const STATUSES = ["Waiting", "Admitted", "Discharged", "Emergency"];

/* A patient object:
   {
     id: "P-0001",
     name: "...",
     age: 45,
     gender: "Male" | "Female",
     phone: "01XXXXXXXXX",
     department: one of DEPARTMENTS,
     doctor: "...",
     priority: one of PRIORITIES,
     status: one of STATUSES,
     admissionDate: "YYYY-MM-DD"
   } */

function createPatient({ id, name, age, gender, phone, department, doctor, priority, status, admissionDate }) {
  if (!STATUSES.includes(status)) throw new Error(`Invalid status: ${status}`);
  if (!PRIORITIES.includes(priority)) throw new Error(`Invalid priority: ${priority}`);
  if (!DEPARTMENTS.includes(department)) throw new Error(`Invalid department: ${department}`);
  return { id, name, age, gender, phone, department, doctor, priority, status, admissionDate };
}

/* --- Sample (fictional) patients for visual testing --- */
const SAMPLE_PATIENTS = [
  createPatient({
    id: "P-0001", name: "Rahim Uddin", age: 45, gender: "Male",
    phone: "01712345678", department: "Cardiology", doctor: "Dr. Anisur Rahman",
    priority: "High", status: "Admitted", admissionDate: "2026-09-30",
  }),
  createPatient({
    id: "P-0002", name: "Fatema Begum", age: 29, gender: "Female",
    phone: "01823456789", department: "Medicine", doctor: "Dr. Salma Khatun",
    priority: "Medium", status: "Waiting", admissionDate: "2026-10-01",
  }),
  createPatient({
    id: "P-0003", name: "Abdul Karim", age: 63, gender: "Male",
    phone: "01934567890", department: "Neurology", doctor: "Dr. Tanvir Hasan",
    priority: "Critical", status: "Emergency", admissionDate: "2026-10-03",
  }),
  createPatient({
    id: "P-0004", name: "Nusrat Jahan", age: 34, gender: "Female",
    phone: "01645678901", department: "Orthopedics", doctor: "Dr. Mahmudul Hasan",
    priority: "Low", status: "Discharged", admissionDate: "2026-09-22",
  }),
  createPatient({
    id: "P-0005", name: "Hasan Ali", age: 51, gender: "Male",
    phone: "01556789012", department: "Pediatrics", doctor: "Dr. Rezwana Chowdhury",
    priority: "Medium", status: "Admitted", admissionDate: "2026-10-04",
  }),
  createPatient({
    id: "P-0006", name: "Shirin Akter", age: 27, gender: "Female",
    phone: "01767890123", department: "Emergency", doctor: "Dr. Fahim Ahmed",
    priority: "Critical", status: "Emergency", admissionDate: "2026-10-05",
  }),
  createPatient({
    id: "P-0007", name: "Jahangir Alam", age: 58, gender: "Male",
    phone: "01878901234", department: "Medicine", doctor: "Dr. Salma Khatun",
    priority: "High", status: "Waiting", admissionDate: "2026-10-05",
  }),
  createPatient({
    id: "P-0008", name: "Mst. Rokeya Islam", age: 67, gender: "Female",
    phone: "01989012345", department: "Cardiology", doctor: "Dr. Anisur Rahman",
    priority: "High", status: "Admitted", admissionDate: "2026-10-02",
  }),
];

/* ============================================================
   Appointment Data Model
   ============================================================ */
const APPOINTMENT_STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"];

const APPOINTMENT_PRIORITIES = ["Normal", "Medium", "High", "Emergency"];

/* Simple static doctor directory (name -> department). */
const DOCTORS = [
  { name: "Dr. Tanvir Hasan", department: "Cardiology" },
  { name: "Dr. Anisur Rahman", department: "Cardiology" },
  { name: "Dr. Salma Khatun", department: "Medicine" },
  { name: "Dr. Farhan Kabir", department: "Medicine" },
  { name: "Dr. Sadia Islam", department: "Neurology" },
  { name: "Dr. Rahman Ahmed", department: "Orthopedics" },
  { name: "Dr. Nusrat Jahan", department: "Pediatrics" },
  { name: "Dr. Fahim Ahmed", department: "Emergency" },
];

/** Department for a doctor name, or "" when unknown. */
function doctorDepartment(name) {
  const found = DOCTORS.find((d) => d.name === name);
  return found ? found.department : "";
}

/* An appointment object:
   {
     id: "APT-0001",
     patientId: "P-0001",
     patientName: "...",
     doctor: "...",
     department: one of DEPARTMENTS,
     date: "YYYY-MM-DD",
     time: "HH:MM",
     purpose: "...",
     priority: one of APPOINTMENT_PRIORITIES,
     status: one of APPOINTMENT_STATUSES,
     createdAt: "YYYY-MM-DDTHH:MM:SS.sssZ"
   } */
function createAppointment({ id, patientId, patientName, doctor, department, date, time, purpose, priority, status, createdAt }) {
  if (!APPOINTMENT_STATUSES.includes(status)) throw new Error(`Invalid appointment status: ${status}`);
  if (!APPOINTMENT_PRIORITIES.includes(priority)) throw new Error(`Invalid appointment priority: ${priority}`);
  if (!DEPARTMENTS.includes(department)) throw new Error(`Invalid appointment department: ${department}`);
  return {
    id,
    patientId,
    patientName,
    doctor,
    department,
    date,
    time,
    purpose: purpose || "",
    priority,
    status,
    createdAt,
  };
}

/** Today's date as "YYYY-MM-DD" using the browser's local time. */
function todayISO() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Add N days to today's local date, as "YYYY-MM-DD". */
function daysFromTodayISO(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Sample (fictional) appointments, dated relative to today so the
 *  Today / Upcoming filters always have something to show. */
function sampleAppointments() {
  const stamp = new Date().toISOString();
  return [
    createAppointment({
      id: "APT-0001", patientId: "P-0001", patientName: "Rahim Uddin",
      doctor: "Dr. Tanvir Hasan", department: "Cardiology",
      date: todayISO(), time: "09:30", purpose: "Follow-up",
      priority: "High", status: "Confirmed", createdAt: stamp,
    }),
    createAppointment({
      id: "APT-0002", patientId: "P-0002", patientName: "Fatema Begum",
      doctor: "Dr. Nusrat Jahan", department: "Pediatrics",
      date: todayISO(), time: "11:00", purpose: "General Checkup",
      priority: "Normal", status: "Pending", createdAt: stamp,
    }),
    createAppointment({
      id: "APT-0003", patientId: "P-0003", patientName: "Abdul Karim",
      doctor: "Dr. Sadia Islam", department: "Neurology",
      date: daysFromTodayISO(1), time: "10:15", purpose: "Consultation",
      priority: "Emergency", status: "Pending", createdAt: stamp,
    }),
    createAppointment({
      id: "APT-0004", patientId: "P-0004", patientName: "Nusrat Jahan",
      doctor: "Dr. Rahman Ahmed", department: "Orthopedics",
      date: daysFromTodayISO(2), time: "14:45", purpose: "Follow-up",
      priority: "Medium", status: "Confirmed", createdAt: stamp,
    }),
    createAppointment({
      id: "APT-0005", patientId: "P-0005", patientName: "Hasan Ali",
      doctor: "Dr. Farhan Kabir", department: "Medicine",
      date: daysFromTodayISO(3), time: "16:00", purpose: "General Checkup",
      priority: "Normal", status: "Pending", createdAt: stamp,
    }),
    createAppointment({
      id: "APT-0006", patientId: "P-0006", patientName: "Shirin Akter",
      doctor: "Dr. Fahim Ahmed", department: "Emergency",
      date: daysFromTodayISO(-2), time: "08:30", purpose: "Emergency Visit",
      priority: "Emergency", status: "Completed", createdAt: stamp,
    }),
    createAppointment({
      id: "APT-0007", patientId: "P-0007", patientName: "Jahangir Alam",
      doctor: "Dr. Salma Khatun", department: "Medicine",
      date: daysFromTodayISO(-1), time: "12:30", purpose: "Consultation",
      priority: "Medium", status: "Cancelled", createdAt: stamp,
    }),
    createAppointment({
      id: "APT-0008", patientId: "P-0008", patientName: "Mst. Rokeya Islam",
      doctor: "Dr. Anisur Rahman", department: "Cardiology",
      date: daysFromTodayISO(5), time: "15:30", purpose: "Follow-up",
      priority: "High", status: "Confirmed", createdAt: stamp,
    }),
  ];
}

/* ============================================================
   Application State
   ============================================================ */
const state = {
  patients: [],
  filters: {
    search: "",
    department: "",
    status: "",
    priority: "",
  },
  appointments: [],
  aptFilters: {
    search: "",
    doctor: "",
    department: "",
    status: "",
    priority: "",
    date: "",
    view: "all", // "all" | "today" | "upcoming"
  },
};

/* ============================================================
   localStorage persistence
   ============================================================ */
const STORAGE_KEY = "medicare_patients";
const APPOINTMENT_STORAGE_KEY = "medicare_appointments";

/** A fresh copy of the built-in fictional sample dataset. */
function samplePatients() {
  return SAMPLE_PATIENTS.map((p) => ({ ...p }));
}

/** Persist the full patient dataset to localStorage. */
function savePatients() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.patients));
  } catch (err) {
    // Quota exceeded / storage disabled — keep working in memory only.
    console.warn("Could not save patients to localStorage:", err);
  }
}

/**
 * Validate one stored record. Returns a clean patient object, or null
 * when the record is not a usable patient.
 */
function parseStoredPatient(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;

  const id = typeof raw.id === "string" ? raw.id.trim() : "";
  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const age = Number(raw.age);
  const gender = typeof raw.gender === "string" ? raw.gender : "";
  const doctor = typeof raw.doctor === "string" ? raw.doctor.trim() : "";

  if (!id || !name || !doctor) return null;
  if (!Number.isInteger(age) || age <= 0) return null;
  if (!DEPARTMENTS.includes(raw.department)) return null;
  if (!PRIORITIES.includes(raw.priority)) return null;
  if (!STATUSES.includes(raw.status)) return null;

  return {
    id,
    name,
    age,
    gender,
    phone: typeof raw.phone === "string" ? raw.phone : "",
    department: raw.department,
    doctor,
    priority: raw.priority,
    status: raw.status,
    admissionDate: typeof raw.admissionDate === "string" ? raw.admissionDate : "",
  };
}

/** Keep only valid, uniquely-identified records; null when nothing is usable. */
function parseStoredPatients(parsed) {
  if (!Array.isArray(parsed)) return null;

  const seen = new Set();
  const patients = [];
  parsed.forEach((raw) => {
    const patient = parseStoredPatient(raw);
    if (patient && !seen.has(patient.id)) {
      seen.add(patient.id);
      patients.push(patient);
    }
  });

  return patients.length ? patients : null;
}

/**
 * Load patients on startup.
 *   - valid saved data  -> use it
 *   - nothing saved     -> use the sample dataset
 *   - corrupt/invalid   -> fall back to the sample dataset and repair storage
 */
function initState() {
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Could not read localStorage:", err);
  }

  // No saved data yet: seed with the sample dataset and persist it.
  if (stored === null) {
    state.patients = samplePatients();
    savePatients();
    return;
  }

  // Saved data present: parse it and fall back safely if unusable.
  let patients = null;
  try {
    patients = parseStoredPatients(JSON.parse(stored));
  } catch (err) {
    patients = null;
  }

  if (patients) {
    state.patients = patients;
    return;
  }

  console.warn("Stored patient data was invalid; restoring the sample dataset.");
  state.patients = samplePatients();
  savePatients();
}

/* ============================================================
   Appointment persistence
   ============================================================ */
/** Persist the full appointment dataset to localStorage. */
function saveAppointments() {
  try {
    localStorage.setItem(APPOINTMENT_STORAGE_KEY, JSON.stringify(state.appointments));
  } catch (err) {
    console.warn("Could not save appointments to localStorage:", err);
  }
}

/**
 * Validate one stored appointment. Returns a clean object, or null when
 * the record is not usable. Deliberately tolerant: an appointment whose
 * patient no longer exists is KEPT (the patient is shown as removed).
 */
function parseStoredAppointment(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;

  const id = typeof raw.id === "string" ? raw.id.trim() : "";
  const patientId = typeof raw.patientId === "string" ? raw.patientId.trim() : "";
  const patientName = typeof raw.patientName === "string" ? raw.patientName.trim() : "";
  const doctor = typeof raw.doctor === "string" ? raw.doctor.trim() : "";
  const date = typeof raw.date === "string" ? raw.date.trim() : "";
  const time = typeof raw.time === "string" ? raw.time.trim() : "";

  if (!id || !patientId || !patientName || !doctor) return null;
  if (!date || !time) return null;
  if (!DEPARTMENTS.includes(raw.department)) return null;
  if (!APPOINTMENT_PRIORITIES.includes(raw.priority)) return null;
  if (!APPOINTMENT_STATUSES.includes(raw.status)) return null;

  return {
    id,
    patientId,
    patientName,
    doctor,
    department: raw.department,
    date,
    time,
    purpose: typeof raw.purpose === "string" ? raw.purpose : "",
    priority: raw.priority,
    status: raw.status,
    createdAt: typeof raw.createdAt === "string" && raw.createdAt ? raw.createdAt : new Date().toISOString(),
  };
}

/** Keep only valid, uniquely-identified appointments; null when none usable. */
function parseStoredAppointments(parsed) {
  if (!Array.isArray(parsed)) return null;

  const seen = new Set();
  const appointments = [];
  parsed.forEach((raw) => {
    const apt = parseStoredAppointment(raw);
    if (apt && !seen.has(apt.id)) {
      seen.add(apt.id);
      appointments.push(apt);
    }
  });

  return appointments.length ? appointments : null;
}

/**
 * Load appointments on startup.
 *   - valid saved data -> use it
 *   - nothing saved    -> seed the demo appointments and persist them
 *   - corrupt/invalid  -> fall back to demo data and repair storage
 */
function initAppointments() {
  let stored = null;
  try {
    stored = localStorage.getItem(APPOINTMENT_STORAGE_KEY);
  } catch (err) {
    console.warn("Could not read appointments from localStorage:", err);
  }

  if (stored === null) {
    state.appointments = sampleAppointments();
    saveAppointments();
    return;
  }

  let appointments = null;
  try {
    appointments = parseStoredAppointments(JSON.parse(stored));
  } catch (err) {
    appointments = null;
  }

  if (appointments) {
    state.appointments = appointments;
    return;
  }

  console.warn("Stored appointment data was invalid; restoring demo appointments.");
  state.appointments = sampleAppointments();
  saveAppointments();
}

/* ============================================================
   Language persistence
   ============================================================ */
/** Persist the selected language (separate key from patient data). */
function saveLanguage(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (err) {
    console.warn("Could not save language to localStorage:", err);
  }
}

/** Read the saved language, falling back to English when absent/invalid. */
function loadLanguage() {
  let saved = null;
  try {
    saved = localStorage.getItem(LANG_KEY);
  } catch (err) {
    console.warn("Could not read language from localStorage:", err);
  }
  return SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG;
}

/* ============================================================
   Helpers
   ============================================================ */
/** Build a badge class name from a label, e.g. "Low" -> "badge-low" */
function badgeClass(label) {
  return "badge badge-" + label.toLowerCase();
}

/** Escape text so user input cannot inject HTML. */
function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ============================================================
   Internationalization (English / Bangla)
   ------------------------------------------------------------
   One centralized dictionary. Keys are language-independent;
   only the displayed text changes. The underlying patient data
   (status/priority/department values) is NEVER translated.
   ============================================================ */
const LANG_KEY = "medicare_language";
const DEFAULT_LANG = "en";
const SUPPORTED_LANGS = ["en", "bn"];

const TRANSLATIONS = {
  en: {
    // Navigation
    navDashboard: "Dashboard",
    navPatients: "Patients",
    navAppointments: "Appointments",
    navSettings: "Settings",

    // Header
    hospitalName: "MediCare Hospital",
    hospitalSystem: "Hospital Management System",
    language: "Language",
    resetData: "Reset Data",
    admin: "Admin",

    // Dashboard
    totalPatients: "Total Patients",
    patientManagement: "Patient Management",
    allPatients: "All Patients",
    settingsPlaceholder: "Settings options will be added here.",

    // Table columns
    colPatientId: "Patient ID",
    colName: "Name",
    colAge: "Age",
    colGender: "Gender",
    colDepartment: "Department",
    colDoctor: "Doctor",
    colPriority: "Priority",
    colStatus: "Status",
    colActions: "Actions",

    // Row actions
    view: "View",
    edit: "Edit",
    delete: "Delete",

    // Patient form
    addPatient: "+ Add Patient",
    addNewPatient: "Add New Patient",
    editPatient: "Edit Patient",
    patientName: "Patient Name",
    phone: "Phone",
    optional: "(optional)",
    admissionDate: "Admission Date",
    selectGender: "Select gender",
    selectDepartment: "Select department",
    selectPriority: "Select priority",
    selectStatus: "Select status",
    genderMale: "Male",
    genderFemale: "Female",
    genderOther: "Other",
    savePatient: "Save Patient",
    updatePatient: "Update Patient",
    cancel: "Cancel",
    close: "Close",

    // Search + filters
    searchPlaceholder: "Search by name, ID, phone…",
    allDepartments: "All Departments",
    allStatuses: "All Statuses",
    allPriorities: "All Priorities",
    allDoctors: "All Doctors",
    clearFilters: "Clear Filters",

    // Department values
    deptCardiology: "Cardiology",
    deptMedicine: "Medicine",
    deptNeurology: "Neurology",
    deptOrthopedics: "Orthopedics",
    deptPediatrics: "Pediatrics",
    deptEmergency: "Emergency",

    // Patient details modal
    patientDetails: "Patient Details",

    // Status values
    statusWaiting: "Waiting",
    statusAdmitted: "Admitted",
    statusDischarged: "Discharged",
    statusEmergency: "Emergency",

    // Priority values
    priorityLow: "Low",
    priorityMedium: "Medium",
    priorityHigh: "High",
    priorityCritical: "Critical",

    // Messages
    patientAdded: "Patient added successfully",
    patientUpdated: "Patient updated successfully",
    patientDeleted: "Patient deleted successfully",
    noPatientsFound: "No patients found.",
    noDataAvailable: "No data available.",
    fixHighlightedFields: "Please fill required fields.",
    patientNotFound: "Patient not found.",
    patientNoLongerExists: "Patient no longer exists.",
    dataResetSuccess: "Data reset successfully.",

    // Validation
    errNameRequired: "Patient name is required.",
    errAgeRequired: "Age is required.",
    errAgeInvalid: "Invalid age: must be a positive whole number.",
    errGenderRequired: "Please select a gender.",
    errDepartmentRequired: "Please select a department.",
    errDoctorRequired: "Doctor name is required.",
    errPriorityRequired: "Please select a priority.",
    errStatusRequired: "Please select a status.",
    errAdmissionDateRequired: "Admission date is required.",

    // Confirmations
    deleteConfirmQuestion: "Are you sure you want to delete",
    cannotBeUndone: "This action cannot be undone.",
    resetTitle: "Reset Demo Data",
    resetConfirmQuestion: "Are you sure you want to reset all patient data?",
    resetWarning:
      "All current patient changes will be removed and the original sample dataset will be restored. This action cannot be undone.",

    // ---- Appointments ----
    aptTotal: "Total Appointments",
    aptToday: "Today's Appointments",
    aptPending: "Pending",
    aptConfirmed: "Confirmed",
    aptCompleted: "Completed",
    aptCancelled: "Cancelled",
    aptAdd: "+ Add Appointment",
    aptAddNew: "Add New Appointment",
    aptEdit: "Edit Appointment",
    aptTodayBtn: "Today's Appointments",
    aptUpcomingBtn: "Upcoming Appointments",
    aptShowAll: "Show All",
    aptPatient: "Patient",
    aptDate: "Appointment Date",
    aptTime: "Appointment Time",
    aptPurpose: "Visit Purpose",
    aptPurposePlaceholder: "e.g. General Checkup, Follow-up",
    aptColId: "Appointment ID",
    aptColPatient: "Patient",
    aptColDate: "Date",
    aptColTime: "Time",
    aptDetails: "Appointment Details",
    aptCreatedAt: "Created At",
    aptSave: "Save Appointment",
    aptUpdate: "Update Appointment",
    aptDeleteTitle: "Delete Appointment",
    aptDeleteQuestion: "Are you sure you want to delete this appointment?",
    aptNoFound: "No appointments found.",
    aptAdded: "Appointment added successfully",
    aptUpdated: "Appointment updated successfully",
    aptDeleted: "Appointment deleted successfully",
    aptNoLongerExists: "Appointment no longer exists.",
    aptNotFound: "Appointment not found.",
    aptSelectPatient: "Select patient",
    aptSelectDoctor: "Select doctor",
    aptPatientMissing: "Patient (removed)",
    aptPatientRemoved: "This patient has been removed from the patient list.",

    // Appointment status values
    aptStatusPending: "Pending",
    aptStatusConfirmed: "Confirmed",
    aptStatusCompleted: "Completed",
    aptStatusCancelled: "Cancelled",

    // Appointment priority values
    aptPriorityNormal: "Normal",
    aptPriorityMedium: "Medium",
    aptPriorityHigh: "High",
    aptPriorityEmergency: "Emergency",

    // Appointment validation
    aptErrPatient: "Please select a patient.",
    aptErrDoctor: "Please select a doctor.",
    aptErrDate: "Appointment date is required.",
    aptErrTime: "Appointment time is required.",
    aptErrPriority: "Please select a priority.",
    aptErrStatus: "Please select a status.",
  },

  bn: {
    // Navigation
    navDashboard: "ড্যাশবোর্ড",
    navPatients: "রোগী",
    navAppointments: "অ্যাপয়েন্টমেন্ট",
    navSettings: "সেটিংস",

    // Header
    hospitalName: "মেটিকেয়ার হাসপাতাল",
    hospitalSystem: "হাসপাতাল ব্যবস্থাপনা সিস্টেম",
    language: "ভাষা",
    resetData: "ডেটা রিসেট",
    admin: "অ্যাডমিন",

    // Dashboard
    totalPatients: "মোট রোগী",
    patientManagement: "রোগী ব্যবস্থাপনা",
    allPatients: "সকল রোগী",
    settingsPlaceholder: "সেটিংসের অপশনসমূহ এখানে যোগ করা হবে।",

    // Table columns
    colPatientId: "রোগীর আইডি",
    colName: "নাম",
    colAge: "বয়স",
    colGender: "লিঙ্গ",
    colDepartment: "বিভাগ",
    colDoctor: "ডাক্তার",
    colPriority: "অগ্রাধিকার",
    colStatus: "অবস্থা",
    colActions: "কার্যক্রম",

    // Row actions
    view: "দেখুন",
    edit: "সম্পাদনা",
    delete: "মুছুন",

    // Patient form
    addPatient: "+ রোগী যোগ করুন",
    addNewPatient: "নতুন রোগী যোগ করুন",
    editPatient: "রোগীর তথ্য সম্পাদনা",
    patientName: "রোগীর নাম",
    phone: "ফোন",
    optional: "(ঐচ্ছিক)",
    admissionDate: "ভর্তির তারিখ",
    selectGender: "লিঙ্গ নির্বাচন করুন",
    selectDepartment: "বিভাগ নির্বাচন করুন",
    selectPriority: "অগ্রাধিকার নির্বাচন করুন",
    selectStatus: "অবস্থা নির্বাচন করুন",
    genderMale: "পুরুষ",
    genderFemale: "মহিলা",
    genderOther: "অন্যান্য",
    savePatient: "সংরক্ষণ করুন",
    updatePatient: "আপডেট করুন",
    cancel: "বাতিল",
    close: "বন্ধ করুন",

    // Search + filters
    searchPlaceholder: "নাম, আইডি বা ফোন দিয়ে খুঁজুন…",
    allDepartments: "সকল বিভাগ",
    allStatuses: "সকল অবস্থা",
    allPriorities: "সকল অগ্রাধিকার",
    allDoctors: "সকল ডাক্তার",
    clearFilters: "ফিল্টার মুছুন",

    // Department values
    deptCardiology: "হৃদরোগ",
    deptMedicine: "মেডিসিন",
    deptNeurology: "নিউরোলজি",
    deptOrthopedics: "অর্থোপেডিকস",
    deptPediatrics: "শিশু বিভাগ",
    deptEmergency: "জরুরি বিভাগ",

    // Patient details modal
    patientDetails: "রোগীর বিস্তারিত",

    // Status values
    statusWaiting: "অপেক্ষমাণ",
    statusAdmitted: "ভর্তি",
    statusDischarged: "ছাড়প্রাপ্ত",
    statusEmergency: "জরুরি",

    // Priority values
    priorityLow: "নিম্ন",
    priorityMedium: "মধ্যম",
    priorityHigh: "উচ্চ",
    priorityCritical: "সংকটপূর্ণ",

    // Messages
    patientAdded: "রোগী সফলভাবে যোগ করা হয়েছে",
    patientUpdated: "রোগীর তথ্য সফলভাবে আপডেট হয়েছে",
    patientDeleted: "রোগী সফলভাবে মুছে ফেলা হয়েছে",
    noPatientsFound: "কোনো রোগী পাওয়া যায়নি।",
    noDataAvailable: "কোনো তথ্য পাওয়া যায়নি।",
    fixHighlightedFields: "অনুগ্রহ করে প্রয়োজনীয় ঘরগুলো পূরণ করুন।",
    patientNotFound: "রোগী পাওয়া যায়নি।",
    patientNoLongerExists: "রোগী আর বিদ্যমান নেই।",
    dataResetSuccess: "ডেটা সফলভাবে রিসেট হয়েছে।",

    // Validation
    errNameRequired: "রোগীর নাম আবশ্যক।",
    errAgeRequired: "বয়স আবশ্যক।",
    errAgeInvalid: "বয়স সঠিক নয়: ধনাত্মক পূর্ণসংখ্যা হতে হবে।",
    errGenderRequired: "অনুগ্রহ করে লিঙ্গ নির্বাচন করুন।",
    errDepartmentRequired: "অনুগ্রহ করে বিভাগ নির্বাচন করুন।",
    errDoctorRequired: "ডাক্তারের নাম আবশ্যক।",
    errPriorityRequired: "অনুগ্রহ করে অগ্রাধিকার নির্বাচন করুন।",
    errStatusRequired: "অনুগ্রহ করে অবস্থা নির্বাচন করুন।",
    errAdmissionDateRequired: "ভর্তির তারিখ আবশ্যক।",

    // Confirmations
    deleteConfirmQuestion: "আপনি কি নিশ্চিত যে আপনি মুছতে চান",
    cannotBeUndone: "এই কাজটি ফিরিয়ে আনা যাবে না।",
    resetTitle: "ডেমো ডেটা রিসেট",
    resetConfirmQuestion: "আপনি কি নিশ্চিত যে আপনি সকল রোগীর ডেটা রিসেট করতে চান?",
    resetWarning:
      "বর্তমান সকল রোগীর পরিবর্তন মুছে যাবে এবং মূল নমুনা ডেটা পুনরুদ্ধার করা হবে। এই কাজটি ফিরিয়ে আনা যাবে না।",

    // ---- Appointments ----
    aptTotal: "মোট অ্যাপয়েন্টমেন্ট",
    aptToday: "আজকের অ্যাপয়েন্টমেন্ট",
    aptPending: "অপেক্ষমাণ",
    aptConfirmed: "নিশ্চিত",
    aptCompleted: "সম্পন্ন",
    aptCancelled: "বাতিল",
    aptAdd: "+ অ্যাপয়েন্টমেন্ট যোগ করুন",
    aptAddNew: "নতুন অ্যাপয়েন্টমেন্ট যোগ করুন",
    aptEdit: "অ্যাপয়েন্টমেন্ট সম্পাদনা",
    aptTodayBtn: "আজকের অ্যাপয়েন্টমেন্ট",
    aptUpcomingBtn: "আসন্ন অ্যাপয়েন্টমেন্ট",
    aptShowAll: "সব দেখান",
    aptPatient: "রোগী",
    aptDate: "অ্যাপয়েন্টমেন্টের তারিখ",
    aptTime: "অ্যাপয়েন্টমেন্টের সময়",
    aptPurpose: "পরিদর্শনের উদ্দেশ্য",
    aptPurposePlaceholder: "যেমন: সাধারণ পরীক্ষা, ফলো-আপ",
    aptColId: "অ্যাপয়েন্টমেন্ট আইডি",
    aptColPatient: "রোগী",
    aptColDate: "তারিখ",
    aptColTime: "সময়",
    aptDetails: "অ্যাপয়েন্টমেন্টের বিস্তারিত",
    aptCreatedAt: "তৈরির সময়",
    aptSave: "অ্যাপয়েন্টমেন্ট সংরক্ষণ করুন",
    aptUpdate: "অ্যাপয়েন্টমেন্ট আপডেট করুন",
    aptDeleteTitle: "অ্যাপয়েন্টমেন্ট মুছুন",
    aptDeleteQuestion: "আপনি কি নিশ্চিত যে আপনি এই অ্যাপয়েন্টমেন্টটি মুছতে চান?",
    aptNoFound: "কোনো অ্যাপয়েন্টমেন্ট পাওয়া যায়নি।",
    aptAdded: "অ্যাপয়েন্টমেন্ট সফলভাবে যোগ করা হয়েছে",
    aptUpdated: "অ্যাপয়েন্টমেন্ট সফলভাবে আপডেট হয়েছে",
    aptDeleted: "অ্যাপয়েন্টমেন্ট সফলভাবে মুছে ফেলা হয়েছে",
    aptNoLongerExists: "অ্যাপয়েন্টমেন্ট আর বিদ্যমান নেই।",
    aptNotFound: "অ্যাপয়েন্টমেন্ট পাওয়া যায়নি।",
    aptSelectPatient: "রোগী নির্বাচন করুন",
    aptSelectDoctor: "ডাক্তার নির্বাচন করুন",
    aptPatientMissing: "রোগী (মুছে ফেলা হয়েছে)",
    aptPatientRemoved: "এই রোগীকে রোগীর তালিকা থেকে মুছে ফেলা হয়েছে।",

    // Appointment status values
    aptStatusPending: "অপেক্ষমাণ",
    aptStatusConfirmed: "নিশ্চিত",
    aptStatusCompleted: "সম্পন্ন",
    aptStatusCancelled: "বাতিল",

    // Appointment priority values
    aptPriorityNormal: "স্বাভাবিক",
    aptPriorityMedium: "মধ্যম",
    aptPriorityHigh: "উচ্চ",
    aptPriorityEmergency: "জরুরি",

    // Appointment validation
    aptErrPatient: "অনুগ্রহ করে একজন রোগী নির্বাচন করুন।",
    aptErrDoctor: "অনুগ্রহ করে একজন ডাক্তার নির্বাচন করুন।",
    aptErrDate: "অ্যাপয়েন্টমেন্টের তারিখ আবশ্যক।",
    aptErrTime: "অ্যাপয়েন্টমেন্টের সময় আবশ্যক।",
    aptErrPriority: "অনুগ্রহ করে অগ্রাধিকার নির্বাচন করুন।",
    aptErrStatus: "অনুগ্রহ করে স্ট্যাটাস নির্বাচন করুন।",
  },
};

/* --- Map internal (stable) dataset values to translation keys --- */
const STATUS_LABEL_KEYS = {
  Waiting: "statusWaiting",
  Admitted: "statusAdmitted",
  Discharged: "statusDischarged",
  Emergency: "statusEmergency",
};

const PRIORITY_LABEL_KEYS = {
  Low: "priorityLow",
  Medium: "priorityMedium",
  High: "priorityHigh",
  Critical: "priorityCritical",
};

const DEPARTMENT_LABEL_KEYS = {
  Cardiology: "deptCardiology",
  Medicine: "deptMedicine",
  Neurology: "deptNeurology",
  Orthopedics: "deptOrthopedics",
  Pediatrics: "deptPediatrics",
  Emergency: "deptEmergency",
};

const APT_STATUS_LABEL_KEYS = {
  Pending: "aptStatusPending",
  Confirmed: "aptStatusConfirmed",
  Completed: "aptStatusCompleted",
  Cancelled: "aptStatusCancelled",
};

const APT_PRIORITY_LABEL_KEYS = {
  Normal: "aptPriorityNormal",
  Medium: "aptPriorityMedium",
  High: "aptPriorityHigh",
  Emergency: "aptPriorityEmergency",
};

/** Current language code ("en" | "bn"). */
let currentLang = DEFAULT_LANG;

/** Translate a key, falling back to English and then the key itself. */
function t(key) {
  if (!key) return "";
  const table = TRANSLATIONS[currentLang] || TRANSLATIONS[DEFAULT_LANG];
  const value = table[key];
  if (value !== undefined) return value;
  return TRANSLATIONS[DEFAULT_LANG][key] !== undefined
    ? TRANSLATIONS[DEFAULT_LANG][key]
    : key;
}

/** Translated label for a dataset status value (e.g. "Admitted"). */
function statusLabel(value) {
  return STATUS_LABEL_KEYS[value] ? t(STATUS_LABEL_KEYS[value]) : value;
}

/** Translated label for a dataset priority value (e.g. "High"). */
function priorityLabel(value) {
  return PRIORITY_LABEL_KEYS[value] ? t(PRIORITY_LABEL_KEYS[value]) : value;
}

/** Translated label for a dataset department value. */
function departmentLabel(value) {
  return DEPARTMENT_LABEL_KEYS[value] ? t(DEPARTMENT_LABEL_KEYS[value]) : value;
}

/** Translated label for an appointment status value. */
function aptStatusLabel(value) {
  return APT_STATUS_LABEL_KEYS[value] ? t(APT_STATUS_LABEL_KEYS[value]) : value;
}

/** Translated label for an appointment priority value. */
function aptPriorityLabel(value) {
  return APT_PRIORITY_LABEL_KEYS[value] ? t(APT_PRIORITY_LABEL_KEYS[value]) : value;
}

/** Generate the next unique patient id, e.g. "P-0009". */
function generatePatientId() {
  let max = 0;
  state.patients.forEach((p) => {
    const n = parseInt(String(p.id).replace(/\D/g, ""), 10);
    if (!Number.isNaN(n) && n > max) max = n;
  });
  return "P-" + String(max + 1).padStart(4, "0");
}

/** Generate the next unique appointment id, e.g. "APT-0009". */
function generateAppointmentId() {
  let max = 0;
  state.appointments.forEach((a) => {
    const n = parseInt(String(a.id).replace(/\D/g, ""), 10);
    if (!Number.isNaN(n) && n > max) max = n;
  });
  return "APT-" + String(max + 1).padStart(4, "0");
}

/**
 * Fill the appointment form's Patient select from the live patient list.
 * Keeps the current selection when possible, and preserves a previously
 * chosen patient even if that patient was later deleted.
 */
function renderPatientOptions(selectedId) {
  const select = document.getElementById("aptFieldPatient");
  if (!select) return;

  const previous = selectedId !== undefined ? selectedId : select.value;

  const options = state.patients
    .map((p) => `<option value="${escapeHtml(p.id)}">${escapeHtml(p.id)} — ${escapeHtml(p.name)}</option>`)
    .join("");

  select.innerHTML =
    `<option value="">${escapeHtml(t("aptSelectPatient"))}</option>` + options;

  if (previous) select.value = previous;
}

/* ============================================================
   Statistics (always derived from state.patients)
   ============================================================ */
function computeStats() {
  const stats = { total: state.patients.length, Waiting: 0, Admitted: 0, Emergency: 0, Discharged: 0 };
  state.patients.forEach((p) => {
    if (stats[p.status] !== undefined) stats[p.status] += 1;
  });
  return stats;
}

function renderStats() {
  const stats = computeStats();
  const map = {
    statTotal: stats.total,
    statWaiting: stats.Waiting,
    statAdmitted: stats.Admitted,
    statEmergency: stats.Emergency,
    statDischarged: stats.Discharged,
  };
  Object.entries(map).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
}

/* ============================================================
   Filtering + Table rendering
   ============================================================ */
function getFilteredPatients() {
  const { search, department, status, priority } = state.filters;
  const q = search.trim().toLowerCase();

  return state.patients.filter((p) => {
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      String(p.phone || "").toLowerCase().includes(q);
    const matchesDept = !department || p.department === department;
    const matchesStatus = !status || p.status === status;
    const matchesPriority = !priority || p.priority === priority;
    return matchesSearch && matchesDept && matchesStatus && matchesPriority;
  });
}

/** Build one table row for a patient.
 *  Patient data itself (id, name, age, gender, phone, department, doctor,
 *  admission date) is rendered verbatim; only UI labels are translated. */
function patientRowHtml(p) {
  return `
    <tr>
      <td>${escapeHtml(p.id)}</td>
      <td>${escapeHtml(p.name)}</td>
      <td>${escapeHtml(p.age)}</td>
      <td>${escapeHtml(p.gender)}</td>
      <td>${escapeHtml(departmentLabel(p.department))}</td>
      <td>${escapeHtml(p.doctor)}</td>
      <td><span class="${badgeClass(p.priority)}">${escapeHtml(priorityLabel(p.priority))}</span></td>
      <td><span class="${badgeClass(p.status)}">${escapeHtml(statusLabel(p.status))}</span></td>
      <td>
        <div class="actions-cell">
          <button class="btn btn-sm btn-view" data-action="view" data-id="${escapeHtml(p.id)}">${escapeHtml(t("view"))}</button>
          <button class="btn btn-sm btn-edit" data-action="edit" data-id="${escapeHtml(p.id)}">${escapeHtml(t("edit"))}</button>
          <button class="btn btn-sm btn-delete" data-action="delete" data-id="${escapeHtml(p.id)}">${escapeHtml(t("delete"))}</button>
        </div>
      </td>
    </tr>`;
}

/** Render a table body + its empty-state message. */
function renderTable(tbodyId, emptyId) {
  const tbody = document.getElementById(tbodyId);
  const empty = document.getElementById(emptyId);
  if (!tbody) return;

  const rows = getFilteredPatients();

  tbody.innerHTML = rows.map(patientRowHtml).join("");

  if (empty) empty.classList.toggle("hidden", rows.length > 0);
  const wrap = tbody.closest(".table-wrap");
  if (wrap) wrap.classList.toggle("hidden", rows.length === 0);
}

/** Re-render everything that depends on the patient list. */
function renderAll() {
  renderStats();
  renderTable("dashboardTableBody", "dashboardEmpty");
  renderTable("patientsTableBody", "patientsEmpty");
}

/* ============================================================
   Appointment statistics (always from the FULL dataset)
   ============================================================ */
function computeAppointmentStats() {
  const today = todayISO();
  const stats = {
    total: state.appointments.length,
    today: 0,
    Pending: 0,
    Confirmed: 0,
    Completed: 0,
    Cancelled: 0,
  };
  state.appointments.forEach((a) => {
    if (a.date === today) stats.today += 1;
    if (stats[a.status] !== undefined) stats[a.status] += 1;
  });
  return stats;
}

function renderAppointmentStats() {
  const s = computeAppointmentStats();
  const map = {
    aptStatTotal: s.total,
    aptStatToday: s.today,
    aptStatPending: s.Pending,
    aptStatConfirmed: s.Confirmed,
    aptStatCompleted: s.Completed,
    aptStatCancelled: s.Cancelled,
  };
  Object.entries(map).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
}

/* ============================================================
   Appointment filtering + table rendering
   ============================================================ */
function getFilteredAppointments() {
  const { search, doctor, department, status, priority, date, view } = state.aptFilters;
  const q = search.trim().toLowerCase();
  const today = todayISO();

  let list = state.appointments.filter((a) => {
    const matchesSearch =
      !q ||
      a.id.toLowerCase().includes(q) ||
      a.patientName.toLowerCase().includes(q) ||
      a.patientId.toLowerCase().includes(q) ||
      a.doctor.toLowerCase().includes(q) ||
      String(a.purpose || "").toLowerCase().includes(q);
    const matchesDoctor = !doctor || a.doctor === doctor;
    const matchesDept = !department || a.department === department;
    const matchesStatus = !status || a.status === status;
    const matchesPriority = !priority || a.priority === priority;
    const matchesDate = !date || a.date === date;
    return matchesSearch && matchesDoctor && matchesDept && matchesStatus && matchesPriority && matchesDate;
  });

  // Quick views: today / upcoming (today or future, sorted by date then time).
  if (view === "today") {
    list = list.filter((a) => a.date === today);
  } else if (view === "upcoming") {
    list = list.filter((a) => a.date >= today);
    list.sort((a, b) => (a.date === b.date ? a.time.localeCompare(b.time) : a.date.localeCompare(b.date)));
  }

  return list;
}

/** Build one appointment table row. */
function appointmentRowHtml(a) {
  const isToday = a.date === todayISO();
  return `
    <tr class="${isToday ? "is-today" : ""}">
      <td>${escapeHtml(a.id)}</td>
      <td>${escapeHtml(a.patientName)}<br /><small class="muted">${escapeHtml(a.patientId)}</small></td>
      <td>${escapeHtml(a.doctor)}</td>
      <td>${escapeHtml(departmentLabel(a.department))}</td>
      <td>${escapeHtml(a.date)}</td>
      <td>${escapeHtml(a.time)}</td>
      <td><span class="${badgeClass(a.priority)}">${escapeHtml(aptPriorityLabel(a.priority))}</span></td>
      <td><span class="${badgeClass(a.status)}">${escapeHtml(aptStatusLabel(a.status))}</span></td>
      <td>
        <div class="actions-cell">
          <button class="btn btn-sm btn-view" data-apt-action="view" data-id="${escapeHtml(a.id)}">${escapeHtml(t("view"))}</button>
          <button class="btn btn-sm btn-edit" data-apt-action="edit" data-id="${escapeHtml(a.id)}">${escapeHtml(t("edit"))}</button>
          <button class="btn btn-sm btn-delete" data-apt-action="delete" data-id="${escapeHtml(a.id)}">${escapeHtml(t("delete"))}</button>
        </div>
      </td>
    </tr>`;
}

function renderAppointmentTable() {
  const tbody = document.getElementById("appointmentsTableBody");
  const empty = document.getElementById("appointmentsEmpty");
  if (!tbody) return;

  const rows = getFilteredAppointments();
  tbody.innerHTML = rows.map(appointmentRowHtml).join("");

  if (empty) empty.classList.toggle("hidden", rows.length > 0);
  const wrap = tbody.closest(".table-wrap");
  if (wrap) wrap.classList.toggle("hidden", rows.length === 0);
}

/** Re-render everything appointment-related. */
function renderAppointments() {
  renderAppointmentStats();
  renderAppointmentTable();
}

/* ============================================================
   Language application (static + dynamic UI)
   ============================================================ */
/** Apply translations to every element carrying a data-i18n* attribute. */
function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  // <html lang=".."> and the data-lang hook for styling.
  const html = document.documentElement;
  html.setAttribute("lang", currentLang);
  html.setAttribute("data-lang", currentLang);

  // Highlight the active language button + expose state to assistive tech.
  document.querySelectorAll("[data-lang-set]").forEach((btn) => {
    const active = btn.dataset.langSet === currentLang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", String(active));
  });
}

/** Rebuild filter + form select options with translated labels.
 *  The option `value` stays as the stable dataset value. */
function renderSelectOptions() {
  const fillOptions = (select, values, firstLabelKey, labelFor) => {
    if (!select) return;
    const previous = select.value;
    select.innerHTML =
      `<option value="">${escapeHtml(t(firstLabelKey))}</option>` +
      values
        .map((v) => `<option value="${escapeHtml(v)}">${escapeHtml(labelFor(v))}</option>`)
        .join("");
    // Preserve the current selection so switching language never resets filters.
    select.value = previous;
  };

  fillOptions(document.getElementById("departmentFilter"), DEPARTMENTS, "allDepartments", departmentLabel);
  fillOptions(document.getElementById("statusFilter"), STATUSES, "allStatuses", statusLabel);
  fillOptions(document.getElementById("priorityFilter"), PRIORITIES, "allPriorities", priorityLabel);

  fillOptions(document.getElementById("fieldDepartment"), DEPARTMENTS, "selectDepartment", departmentLabel);
  fillOptions(document.getElementById("fieldStatus"), STATUSES, "selectStatus", statusLabel);
  fillOptions(document.getElementById("fieldPriority"), PRIORITIES, "selectPriority", priorityLabel);

  // --- Appointment filters ---
  fillOptions(document.getElementById("aptDepartmentFilter"), DEPARTMENTS, "allDepartments", departmentLabel);
  fillOptions(document.getElementById("aptStatusFilter"), APPOINTMENT_STATUSES, "allStatuses", aptStatusLabel);
  fillOptions(document.getElementById("aptPriorityFilter"), APPOINTMENT_PRIORITIES, "allPriorities", aptPriorityLabel);

  const aptDoctorFilter = document.getElementById("aptDoctorFilter");
  if (aptDoctorFilter) {
    const previous = aptDoctorFilter.value;
    aptDoctorFilter.innerHTML =
      `<option value="">${escapeHtml(t("allDoctors"))}</option>` +
      DOCTORS.map((d) => `<option value="${escapeHtml(d.name)}">${escapeHtml(d.name)}</option>`).join("");
    aptDoctorFilter.value = previous;
  }

  // --- Appointment form ---
  fillOptions(document.getElementById("aptFieldDepartment"), DEPARTMENTS, "selectDepartment", departmentLabel);
  fillOptions(document.getElementById("aptFieldPriority"), APPOINTMENT_PRIORITIES, "selectPriority", aptPriorityLabel);
  fillOptions(document.getElementById("aptFieldStatus"), APPOINTMENT_STATUSES, "selectStatus", aptStatusLabel);

  const aptDoctorField = document.getElementById("aptFieldDoctor");
  if (aptDoctorField) {
    const previous = aptDoctorField.value;
    aptDoctorField.innerHTML =
      `<option value="">${escapeHtml(t("aptSelectDoctor"))}</option>` +
      DOCTORS.map((d) => `<option value="${escapeHtml(d.name)}">${escapeHtml(d.name)}</option>`).join("");
    aptDoctorField.value = previous;
  }

  renderPatientOptions();
}

/**
 * Switch the UI language. Updates static labels, select options, dynamic
 * table/modals and re-renders. Never touches patient data or reloads.
 */
function applyLanguage(lang) {
  currentLang = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  saveLanguage(currentLang);

  applyStaticTranslations();
  renderSelectOptions();
  renderAll();
  renderAppointments();

  // Re-render any open modal so its content matches the new language.
  if (typeof refreshOpenModals === "function") refreshOpenModals();
}

/* ============================================================
   Toast notification
   ============================================================ */
let toastTimer = null;
function showToast(message, type) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.toggle("toast-error", type === "error");
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const pages = document.querySelectorAll(".page");
  const pageTitle = document.getElementById("pageTitle");
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");

  initState();
  currentLang = loadLanguage();

  /* --- Page navigation --- */
  function showPage(name) {
    navItems.forEach((item) =>
      item.classList.toggle("active", item.dataset.page === name)
    );
    pages.forEach((page) =>
      page.classList.toggle("hidden", page.dataset.pageView !== name)
    );
  }

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(item.dataset.page);
      sidebar.classList.remove("open");
    });
  });

  /* --- Language toggle (no page reload) --- */
  document.querySelectorAll("[data-lang-set]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.langSet === currentLang) return;
      applyLanguage(btn.dataset.langSet);
    });
  });

  /* --- Filters wiring (dashboard page) --- */
  function wireFilters(form) {
    if (!form) return;

    const search = form.querySelector('input[type="search"]');
    const department = form.querySelector("#departmentFilter");
    const status = form.querySelector("#statusFilter");
    const priority = form.querySelector("#priorityFilter");

    if (search) {
      search.addEventListener("input", () => {
        state.filters.search = search.value;
        renderAll();
      });
    }
    if (department) {
      department.addEventListener("change", () => {
        state.filters.department = department.value;
        renderAll();
      });
    }
    if (status) {
      status.addEventListener("change", () => {
        state.filters.status = status.value;
        renderAll();
      });
    }
    if (priority) {
      priority.addEventListener("change", () => {
        state.filters.priority = priority.value;
        renderAll();
      });
    }
  }

  wireFilters(document.getElementById("dashboardFilters"));
  wireFilters(document.querySelector('[data-page-view="patients"] .filters'));

  /* --- Clear Filters: reset search + all selects, show every patient --- */
  function clearFilters() {
    state.filters.search = "";
    state.filters.department = "";
    state.filters.status = "";
    state.filters.priority = "";

    const search = document.getElementById("searchInput");
    if (search) search.value = "";
    document
      .querySelectorAll("#departmentFilter, #statusFilter, #priorityFilter")
      .forEach((select) => (select.value = ""));

    renderAll();
  }

  const clearBtn = document.getElementById("clearFiltersBtn");
  if (clearBtn) clearBtn.addEventListener("click", clearFilters);

  /* ==========================================================
     Patient form modal (shared by Add and Edit)
     ========================================================== */
  const modal = document.getElementById("patientModal");
  const form = document.getElementById("patientForm");
  const formTitle = document.getElementById("modalTitle");
  const formSubmitBtn = document.getElementById("formSubmitBtn");

  // "add" | "edit"; when editing, editId holds the patient being edited.
  let formMode = "add";
  let editId = null;

  /** Keep the modal title + submit button in sync with the current mode. */
  function syncFormModeLabels() {
    const editing = formMode === "edit";
    formTitle.textContent = t(editing ? "editPatient" : "addNewPatient");
    if (formSubmitBtn) {
      formSubmitBtn.textContent = t(editing ? "updatePatient" : "savePatient");
    }
  }

  function openModal(patient) {
    form.reset();
    clearErrors();

    if (patient) {
      formMode = "edit";
      editId = patient.id;
      fillForm(patient);
    } else {
      formMode = "add";
      editId = null;
    }
    syncFormModeLabels();

    modal.classList.remove("hidden");
    document.getElementById("fieldName").focus();
  }

  function fillForm(p) {
    document.getElementById("fieldName").value = p.name;
    document.getElementById("fieldAge").value = p.age;
    document.getElementById("fieldGender").value = p.gender;
    document.getElementById("fieldPhone").value = p.phone || "";
    document.getElementById("fieldDepartment").value = p.department;
    document.getElementById("fieldDoctor").value = p.doctor;
    document.getElementById("fieldPriority").value = p.priority;
    document.getElementById("fieldStatus").value = p.status;
    document.getElementById("fieldAdmissionDate").value = p.admissionDate;
  }

  function closeModal() {
    modal.classList.add("hidden");
    formMode = "add";
    editId = null;
    form.reset();
    clearErrors();
  }

  function clearErrors() {
    form.querySelectorAll(".form-field").forEach((f) =>
      f.classList.remove("invalid")
    );
    form.querySelectorAll(".field-error").forEach((e) => (e.textContent = ""));
  }

  function setError(fieldId, message) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const field = input.closest(".form-field");
    field.classList.add("invalid");
    const err = field.querySelector(".field-error");
    if (err) err.textContent = message;
  }

  /** Validate the form; returns a patient object or null. */
  function validateForm() {
    clearErrors();
    let ok = true;

    const value = (id) => document.getElementById(id).value.trim();

    const name = value("fieldName");
    const ageRaw = value("fieldAge");
    const gender = value("fieldGender");
    const phone = value("fieldPhone");
    const department = value("fieldDepartment");
    const doctor = value("fieldDoctor");
    const priority = value("fieldPriority");
    const status = value("fieldStatus");
    const admissionDate = value("fieldAdmissionDate");

    if (!name) { setError("fieldName", t("errNameRequired")); ok = false; }

    if (!ageRaw) {
      setError("fieldAge", t("errAgeRequired")); ok = false;
    } else {
      const age = Number(ageRaw);
      if (!Number.isFinite(age) || !Number.isInteger(age) || age <= 0) {
        setError("fieldAge", t("errAgeInvalid")); ok = false;
      }
    }

    if (!gender) { setError("fieldGender", t("errGenderRequired")); ok = false; }
    if (!department) { setError("fieldDepartment", t("errDepartmentRequired")); ok = false; }
    if (!doctor) { setError("fieldDoctor", t("errDoctorRequired")); ok = false; }
    if (!priority) { setError("fieldPriority", t("errPriorityRequired")); ok = false; }
    if (!status) { setError("fieldStatus", t("errStatusRequired")); ok = false; }
    if (!admissionDate) { setError("fieldAdmissionDate", t("errAdmissionDateRequired")); ok = false; }

    if (!ok) return null;

    return createPatient({
      id: formMode === "edit" ? editId : generatePatientId(),
      name,
      age: Number(ageRaw),
      gender,
      phone,
      department,
      doctor,
      priority,
      status,
      admissionDate,
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const patient = validateForm();
    if (!patient) {
      showToast(t("fixHighlightedFields"), "error");
      return;
    }

    if (formMode === "edit") {
      const index = state.patients.findIndex((p) => p.id === editId);
      if (index === -1) {
        showToast(t("patientNoLongerExists"), "error");
        closeModal();
        return;
      }
      state.patients[index] = patient; // id is preserved
      savePatients();
      renderAll();
      closeModal();
      showToast(`${t("patientUpdated")} — ${patient.name} (${patient.id}).`);
      return;
    }

    state.patients.push(patient);
    savePatients();
    renderAll();
    closeModal();
    showToast(`${t("patientAdded")} — ${patient.name} (${patient.id}).`);
  });

  form.addEventListener("input", (e) => {
    const field = e.target.closest(".form-field");
    if (field && field.classList.contains("invalid")) {
      field.classList.remove("invalid");
      const err = field.querySelector(".field-error");
      if (err) err.textContent = "";
    }
  });

  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("modalCancel").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  /* --- Add Patient buttons (dashboard + patients page) --- */
  document
    .querySelectorAll("[data-add-patient]")
    .forEach((btn) => btn.addEventListener("click", () => openModal()));

  /* ==========================================================
     View Patient modal (read-only)
     ========================================================== */
  const viewModal = document.getElementById("viewModal");
  const viewDetails = document.getElementById("viewDetails");
  let viewId = null; // currently viewed patient, so language switches can re-render

  function renderViewPatient(p) {
    const fields = [
      [t("colPatientId"), escapeHtml(p.id)],
      [t("colName"), escapeHtml(p.name)],
      [t("colAge"), escapeHtml(p.age)],
      [t("colGender"), escapeHtml(p.gender)],
      [t("phone"), p.phone ? escapeHtml(p.phone) : "—"],
      [t("colDepartment"), escapeHtml(departmentLabel(p.department))],
      [t("colDoctor"), escapeHtml(p.doctor)],
      [t("colPriority"), `<span class="${badgeClass(p.priority)}">${escapeHtml(priorityLabel(p.priority))}</span>`],
      [t("colStatus"), `<span class="${badgeClass(p.status)}">${escapeHtml(statusLabel(p.status))}</span>`],
      [t("admissionDate"), escapeHtml(p.admissionDate)],
    ];

    viewDetails.innerHTML = fields
      .map(
        ([label, value]) =>
          `<div class="detail-item"><dt>${escapeHtml(label)}</dt><dd>${value}</dd></div>`
      )
      .join("");
  }

  function viewPatient(id) {
    const p = state.patients.find((x) => x.id === id);
    if (!p) {
      showToast(t("patientNotFound"), "error");
      return;
    }

    viewId = p.id;
    renderViewPatient(p);
    viewModal.classList.remove("hidden");
  }

  function closeView() {
    viewModal.classList.add("hidden");
    viewId = null;
  }

  document.getElementById("viewClose").addEventListener("click", closeView);
  document.getElementById("viewCloseBtn").addEventListener("click", closeView);
  viewModal.addEventListener("click", (e) => {
    if (e.target === viewModal) closeView();
  });

  /* ==========================================================
     Delete confirmation modal
     ========================================================== */
  const deleteModal = document.getElementById("deleteModal");
  let deleteId = null;

  function askDelete(id) {
    const p = state.patients.find((x) => x.id === id);
    if (!p) {
      showToast(t("patientNotFound"), "error");
      return;
    }
    deleteId = p.id;
    document.getElementById("deletePatientName").textContent = p.name;
    document.getElementById("deletePatientId").textContent = `(${p.id})`;
    deleteModal.classList.remove("hidden");
  }

  function closeDelete() {
    deleteModal.classList.add("hidden");
    deleteId = null;
  }

  function confirmDelete() {
    if (!deleteId) return;
    const index = state.patients.findIndex((p) => p.id === deleteId);
    if (index === -1) {
      closeDelete();
      return;
    }
    const removed = state.patients.splice(index, 1)[0];
    savePatients();
    closeDelete();
    renderAll();
    // Keep the appointment system consistent: existing appointments that
    // reference the removed patient are kept (shown as "removed"), and the
    // appointment form no longer offers the deleted patient.
    renderPatientOptions("");
    renderAppointments();
    showToast(`${t("patientDeleted")} — ${removed.name} (${removed.id}).`);
  }

  document.getElementById("deleteClose").addEventListener("click", closeDelete);
  document.getElementById("deleteCancel").addEventListener("click", closeDelete);
  document.getElementById("deleteConfirm").addEventListener("click", confirmDelete);
  deleteModal.addEventListener("click", (e) => {
    if (e.target === deleteModal) closeDelete();
  });

  /* --- Escape closes whichever modal is open --- */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!modal.classList.contains("hidden")) closeModal();
    if (!viewModal.classList.contains("hidden")) closeView();
    if (!deleteModal.classList.contains("hidden")) closeDelete();
    if (!resetModal.classList.contains("hidden")) closeReset();
    if (!aptModal.classList.contains("hidden")) closeAptModal();
    if (!aptViewModal.classList.contains("hidden")) closeAptView();
    if (!aptDeleteModal.classList.contains("hidden")) closeAptDelete();
  });

  /* --- Table action buttons (View / Edit / Delete) --- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const id = btn.dataset.id;
    const action = btn.dataset.action;

    if (action === "view") viewPatient(id);
    else if (action === "edit") {
      const patient = state.patients.find((p) => p.id === id);
      if (patient) openModal(patient);
    } else if (action === "delete") askDelete(id);
  });

  /* ==========================================================
     Appointments (search, filters, CRUD, today/upcoming)
     ========================================================== */
  const aptModal = document.getElementById("appointmentModal");
  const aptForm = document.getElementById("appointmentForm");
  const aptFormTitle = document.getElementById("aptModalTitle");
  const aptFormSubmitBtn = document.getElementById("aptFormSubmitBtn");
  const aptViewModal = document.getElementById("appointmentViewModal");
  const aptViewDetails = document.getElementById("aptViewDetails");
  const aptDeleteModal = document.getElementById("appointmentDeleteModal");

  let aptFormMode = "add"; // "add" | "edit"
  let aptEditId = null;
  let aptViewId = null;
  let aptDeleteId = null;

  /** Keep the appointment modal title + submit button in sync with the mode. */
  function syncAptFormLabels() {
    const editing = aptFormMode === "edit";
    aptFormTitle.textContent = t(editing ? "aptEdit" : "aptAddNew");
    if (aptFormSubmitBtn) aptFormSubmitBtn.textContent = t(editing ? "aptUpdate" : "aptSave");
  }

  function clearAptErrors() {
    aptForm.querySelectorAll(".form-field").forEach((f) => f.classList.remove("invalid"));
    aptForm.querySelectorAll(".field-error").forEach((e) => (e.textContent = ""));
  }

  function setAptError(fieldId, message) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const field = input.closest(".form-field");
    if (field) field.classList.add("invalid");
    const err = field ? field.querySelector(".field-error") : null;
    if (err) err.textContent = message;
  }

  function openAptModal(appointment) {
    aptForm.reset();
    clearAptErrors();

    if (appointment) {
      aptFormMode = "edit";
      aptEditId = appointment.id;
      renderPatientOptions(appointment.patientId);
      document.getElementById("aptFieldDoctor").value = appointment.doctor;
      document.getElementById("aptFieldDepartment").value = appointment.department;
      document.getElementById("aptFieldDate").value = appointment.date;
      document.getElementById("aptFieldTime").value = appointment.time;
      document.getElementById("aptFieldPurpose").value = appointment.purpose || "";
      document.getElementById("aptFieldPriority").value = appointment.priority;
      document.getElementById("aptFieldStatus").value = appointment.status;
    } else {
      aptFormMode = "add";
      aptEditId = null;
      renderPatientOptions("");
      document.getElementById("aptFieldDate").value = todayISO();
      document.getElementById("aptFieldStatus").value = "Pending"; // sensible default
    }

    syncAptFormLabels();
    aptModal.classList.remove("hidden");
    document.getElementById("aptFieldPatient").focus();
  }

  function closeAptModal() {
    aptModal.classList.add("hidden");
    aptFormMode = "add";
    aptEditId = null;
    aptForm.reset();
    clearAptErrors();
  }

  /** Validate the appointment form; returns an appointment object or null. */
  function validateAptForm() {
    clearAptErrors();
    let ok = true;
    const value = (id) => document.getElementById(id).value.trim();

    const patientId = value("aptFieldPatient");
    const doctor = value("aptFieldDoctor");
    const department = value("aptFieldDepartment");
    const date = value("aptFieldDate");
    const time = value("aptFieldTime");
    const purpose = value("aptFieldPurpose");
    const priority = value("aptFieldPriority");
    const status = value("aptFieldStatus");

    if (!patientId) { setAptError("aptFieldPatient", t("aptErrPatient")); ok = false; }
    if (!doctor) { setAptError("aptFieldDoctor", t("aptErrDoctor")); ok = false; }
    if (!date) { setAptError("aptFieldDate", t("aptErrDate")); ok = false; }
    if (!time) { setAptError("aptFieldTime", t("aptErrTime")); ok = false; }
    if (!priority) { setAptError("aptFieldPriority", t("aptErrPriority")); ok = false; }
    if (!status) { setAptError("aptFieldStatus", t("aptErrStatus")); ok = false; }

    if (!ok) return null;

    // The patient must exist — unless we are editing an appointment whose
    // patient was deleted (in which case keep the stored name/ID as-is).
    const patient = state.patients.find((p) => p.id === patientId);
    let patientName = patient ? patient.name : "";
    if (!patient) {
      const existing = state.appointments.find((a) => a.id === aptEditId);
      if (existing && existing.patientId === patientId) {
        patientName = existing.patientName;
      } else {
        setAptError("aptFieldPatient", t("aptErrPatient"));
        return null;
      }
    }

    // Department: follow the chosen doctor when known, else keep the selection.
    const resolvedDepartment =
      (department && DEPARTMENTS.includes(department) ? department : "") ||
      doctorDepartment(doctor) ||
      (patient ? patient.department : "") ||
      DEPARTMENTS[0];

    const existing = state.appointments.find((a) => a.id === aptEditId);

    return createAppointment({
      id: aptFormMode === "edit" ? aptEditId : generateAppointmentId(),
      patientId,
      patientName,
      doctor,
      department: resolvedDepartment,
      date,
      time,
      purpose,
      priority,
      status,
      createdAt: existing ? existing.createdAt : new Date().toISOString(),
    });
  }

  aptForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const appointment = validateAptForm();
    if (!appointment) {
      showToast(t("fixHighlightedFields"), "error");
      return;
    }

    if (aptFormMode === "edit") {
      const index = state.appointments.findIndex((a) => a.id === aptEditId);
      if (index === -1) {
        showToast(t("aptNoLongerExists"), "error");
        closeAptModal();
        return;
      }
      state.appointments[index] = appointment; // id + createdAt preserved
      saveAppointments();
      renderAppointments();
      closeAptModal();
      showToast(`${t("aptUpdated")} — ${appointment.id}.`);
      return;
    }

    state.appointments.push(appointment);
    saveAppointments();
    renderAppointments();
    closeAptModal();
    showToast(`${t("aptAdded")} — ${appointment.id}.`);
  });

  aptForm.addEventListener("input", (e) => {
    const field = e.target.closest(".form-field");
    if (field && field.classList.contains("invalid")) {
      field.classList.remove("invalid");
      const err = field.querySelector(".field-error");
      if (err) err.textContent = "";
    }
  });

  /* --- Auto-fill department from the chosen doctor --- */
  document.getElementById("aptFieldDoctor").addEventListener("change", (e) => {
    const dept = doctorDepartment(e.target.value);
    if (dept) document.getElementById("aptFieldDepartment").value = dept;
  });

  /* --- Auto-fill doctor + department from the chosen patient --- */
  document.getElementById("aptFieldPatient").addEventListener("change", (e) => {
    const patient = state.patients.find((p) => p.id === e.target.value);
    if (!patient) return;
    const deptSelect = document.getElementById("aptFieldDepartment");
    if (patient.department && DEPARTMENTS.includes(patient.department)) {
      deptSelect.value = patient.department;
    }
  });

  document.getElementById("aptModalClose").addEventListener("click", closeAptModal);
  document.getElementById("aptModalCancel").addEventListener("click", closeAptModal);
  aptModal.addEventListener("click", (e) => {
    if (e.target === aptModal) closeAptModal();
  });

  /* --- Add Appointment buttons --- */
  document
    .querySelectorAll("[data-add-appointment]")
    .forEach((btn) => btn.addEventListener("click", () => openAptModal()));

  /* ---------- View appointment ---------- */
  function renderAptView(a) {
    const fields = [
      [t("aptColId"), escapeHtml(a.id)],
      [t("colPatientId"), escapeHtml(a.patientId)],
      [t("colName"), escapeHtml(a.patientName)],
      [t("colDoctor"), escapeHtml(a.doctor)],
      [t("colDepartment"), escapeHtml(departmentLabel(a.department))],
      [t("aptColDate"), escapeHtml(a.date)],
      [t("aptColTime"), escapeHtml(a.time)],
      [t("aptPurpose"), a.purpose ? escapeHtml(a.purpose) : "—"],
      [t("colPriority"), `<span class="${badgeClass(a.priority)}">${escapeHtml(aptPriorityLabel(a.priority))}</span>`],
      [t("colStatus"), `<span class="${badgeClass(a.status)}">${escapeHtml(aptStatusLabel(a.status))}</span>`],
      [t("aptCreatedAt"), escapeHtml(a.createdAt)],
    ];

    aptViewDetails.innerHTML = fields
      .map(([label, value]) => `<div class="detail-item"><dt>${escapeHtml(label)}</dt><dd>${value}</dd></div>`)
      .join("");
  }

  function viewAppointment(id) {
    const a = state.appointments.find((x) => x.id === id);
    if (!a) {
      showToast(t("aptNotFound"), "error");
      return;
    }
    aptViewId = a.id;
    renderAptView(a);
    aptViewModal.classList.remove("hidden");
  }

  function closeAptView() {
    aptViewModal.classList.add("hidden");
    aptViewId = null;
  }

  document.getElementById("aptViewClose").addEventListener("click", closeAptView);
  document.getElementById("aptViewCloseBtn").addEventListener("click", closeAptView);
  aptViewModal.addEventListener("click", (e) => {
    if (e.target === aptViewModal) closeAptView();
  });

  /* ---------- Delete appointment ---------- */
  function askAptDelete(id) {
    const a = state.appointments.find((x) => x.id === id);
    if (!a) {
      showToast(t("aptNotFound"), "error");
      return;
    }
    aptDeleteId = a.id;
    document.getElementById("aptDeleteRef").textContent = `${a.id} — ${a.patientName}`;
    aptDeleteModal.classList.remove("hidden");
  }

  function closeAptDelete() {
    aptDeleteModal.classList.add("hidden");
    aptDeleteId = null;
  }

  function confirmAptDelete() {
    if (!aptDeleteId) return;
    const index = state.appointments.findIndex((a) => a.id === aptDeleteId);
    if (index === -1) {
      closeAptDelete();
      return;
    }
    const removed = state.appointments.splice(index, 1)[0];
    saveAppointments();
    closeAptDelete();
    renderAppointments();
    showToast(`${t("aptDeleted")} — ${removed.id}.`);
  }

  document.getElementById("aptDeleteClose").addEventListener("click", closeAptDelete);
  document.getElementById("aptDeleteCancel").addEventListener("click", closeAptDelete);
  document.getElementById("aptDeleteConfirm").addEventListener("click", confirmAptDelete);
  aptDeleteModal.addEventListener("click", (e) => {
    if (e.target === aptDeleteModal) closeAptDelete();
  });

  /* ---------- Appointment table actions ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-apt-action]");
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.aptAction;

    if (action === "view") viewAppointment(id);
    else if (action === "edit") {
      const appointment = state.appointments.find((a) => a.id === id);
      if (appointment) openAptModal(appointment);
    } else if (action === "delete") askAptDelete(id);
  });

  /* ---------- Appointment search + filters ---------- */
  function wireAptFilters() {
    const search = document.getElementById("aptSearchInput");
    if (search) {
      search.addEventListener("input", () => {
        state.aptFilters.search = search.value;
        renderAppointmentTable();
      });
    }

    const map = [
      ["aptDoctorFilter", "doctor"],
      ["aptDepartmentFilter", "department"],
      ["aptStatusFilter", "status"],
      ["aptPriorityFilter", "priority"],
      ["aptDateFilter", "date"],
    ];
    map.forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("change", () => {
        state.aptFilters[key] = el.value;
        renderAppointmentTable();
      });
    });
  }

  wireAptFilters();

  function clearAptFilters() {
    state.aptFilters.search = "";
    state.aptFilters.doctor = "";
    state.aptFilters.department = "";
    state.aptFilters.status = "";
    state.aptFilters.priority = "";
    state.aptFilters.date = "";
    state.aptFilters.view = "all";

    const search = document.getElementById("aptSearchInput");
    if (search) search.value = "";
    ["aptDoctorFilter", "aptDepartmentFilter", "aptStatusFilter", "aptPriorityFilter", "aptDateFilter"]
      .forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });

    syncAptViewButtons();
    renderAppointmentTable();
  }

  const aptClearBtn = document.getElementById("aptClearFiltersBtn");
  if (aptClearBtn) aptClearBtn.addEventListener("click", clearAptFilters);

  /* ---------- Quick views: Today / Upcoming / Show All ---------- */
  function setAptView(view) {
    state.aptFilters.view = view;
    syncAptViewButtons();
    renderAppointmentTable();
  }

  function syncAptViewButtons() {
    const today = document.getElementById("aptTodayBtn");
    const upcoming = document.getElementById("aptUpcomingBtn");
    const all = document.getElementById("aptShowAllBtn");
    const view = state.aptFilters.view;
    if (today) today.classList.toggle("btn-primary", view === "today");
    if (upcoming) upcoming.classList.toggle("btn-primary", view === "upcoming");
    if (all) all.classList.toggle("btn-primary", view === "all");
  }

  const aptTodayBtn = document.getElementById("aptTodayBtn");
  if (aptTodayBtn) aptTodayBtn.addEventListener("click", () => setAptView("today"));
  const aptUpcomingBtn = document.getElementById("aptUpcomingBtn");
  if (aptUpcomingBtn) aptUpcomingBtn.addEventListener("click", () => setAptView("upcoming"));
  const aptShowAllBtn = document.getElementById("aptShowAllBtn");
  if (aptShowAllBtn) aptShowAllBtn.addEventListener("click", () => setAptView("all"));

  /* ==========================================================
     Reset Demo Data (confirmation modal)
     ========================================================== */
  const resetModal = document.getElementById("resetModal");

  function openReset() {
    resetModal.classList.remove("hidden");
  }

  function closeReset() {
    resetModal.classList.add("hidden");
  }

  function confirmReset() {
    // Restore the original fictional sample dataset and persist it.
    state.patients = samplePatients();
    savePatients();

    closeReset();
    clearFilters();
    renderAll();

    // Reset also restores the appointment demo dataset and clears its filters.
    state.appointments = sampleAppointments();
    saveAppointments();
    clearAptFilters();
    renderAppointments();

    showToast(t("dataResetSuccess"));
  }

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) resetBtn.addEventListener("click", openReset);
  document.getElementById("resetClose").addEventListener("click", closeReset);
  document.getElementById("resetCancel").addEventListener("click", closeReset);
  document.getElementById("resetConfirm").addEventListener("click", confirmReset);
  resetModal.addEventListener("click", (e) => {
    if (e.target === resetModal) closeReset();
  });

  /* --- Re-render any open modal so it matches the current language --- */
  function refreshOpenModals() {
    if (!modal.classList.contains("hidden")) syncFormModeLabels();
    if (!aptModal.classList.contains("hidden")) syncAptFormLabels();

    if (!viewModal.classList.contains("hidden") && viewId) {
      const p = state.patients.find((x) => x.id === viewId);
      if (p) renderViewPatient(p);
    }

    if (!aptViewModal.classList.contains("hidden") && aptViewId) {
      const a = state.appointments.find((x) => x.id === aptViewId);
      if (a) renderAptView(a);
    }
  }

  /* --- Initial render ---
     Apply the saved language first (fills selects + static labels),
     then render the tables with the correct language. */
  applyStaticTranslations();
  renderSelectOptions();
  renderAll();
  renderAppointments();
  syncAptViewButtons();

  /* --- Mobile sidebar toggle --- */
  menuToggle.addEventListener("click", () =>
    sidebar.classList.toggle("open")
  );

  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 900 &&
      !sidebar.contains(e.target) &&
      e.target !== menuToggle
    ) {
      sidebar.classList.remove("open");
    }
  });
});
