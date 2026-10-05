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
   Application State
   ============================================================ */
const state = {
  patients: [],
  filters: {
    search: "",
    department: "",
    priority: "",
  },
};

/* --- Load patients into state (localStorage integration later) --- */
function initState() {
  state.patients = SAMPLE_PATIENTS.slice(); // shallow copy for now
}

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const pages = document.querySelectorAll(".page");
  const pageTitle = document.getElementById("pageTitle");
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");

  initState();

  /* --- Page navigation --- */
  function showPage(name) {
    navItems.forEach((item) =>
      item.classList.toggle("active", item.dataset.page === name)
    );
    pages.forEach((page) =>
      page.classList.toggle("hidden", page.dataset.pageView !== name)
    );
    pageTitle.textContent =
      name.charAt(0).toUpperCase() + name.slice(1);
  }

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(item.dataset.page);
      sidebar.classList.remove("open");
    });
  });

  /* --- Placeholder buttons (logic added later) --- */
  const addBtn = document.getElementById("addPatientBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      // TODO: open add-patient modal (implemented in next step)
      alert("Add patient form coming soon.");
    });
  }

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      // TODO: clear localStorage data (implemented in next step)
      alert("Reset coming soon.");
    });
  }

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
