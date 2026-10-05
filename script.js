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
    status: "",
    priority: "",
  },
};

/* --- Load patients into state (localStorage integration later) --- */
function initState() {
  state.patients = SAMPLE_PATIENTS.map((p) => ({ ...p }));
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

/** Generate the next unique patient id, e.g. "P-0009". */
function generatePatientId() {
  let max = 0;
  state.patients.forEach((p) => {
    const n = parseInt(String(p.id).replace(/\D/g, ""), 10);
    if (!Number.isNaN(n) && n > max) max = n;
  });
  return "P-" + String(max + 1).padStart(4, "0");
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

/** Build one table row for a patient. */
function patientRowHtml(p) {
  return `
    <tr>
      <td>${escapeHtml(p.id)}</td>
      <td>${escapeHtml(p.name)}</td>
      <td>${escapeHtml(p.age)}</td>
      <td>${escapeHtml(p.gender)}</td>
      <td>${escapeHtml(p.department)}</td>
      <td>${escapeHtml(p.doctor)}</td>
      <td><span class="${badgeClass(p.priority)}">${escapeHtml(p.priority)}</span></td>
      <td><span class="${badgeClass(p.status)}">${escapeHtml(p.status)}</span></td>
      <td>
        <div class="actions-cell">
          <button class="btn btn-sm btn-view" data-action="view" data-id="${escapeHtml(p.id)}">View</button>
          <button class="btn btn-sm btn-edit" data-action="edit" data-id="${escapeHtml(p.id)}">Edit</button>
          <button class="btn btn-sm btn-delete" data-action="delete" data-id="${escapeHtml(p.id)}">Delete</button>
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

  /* --- Populate filter + form select options --- */
  function fillOptions(select, values, firstLabel) {
    if (!select) return;
    select.innerHTML =
      `<option value="">${firstLabel}</option>` +
      values.map((v) => `<option>${v}</option>`).join("");
  }

  const filterSelects = document.querySelectorAll(".filters select");
  // Filter selects: Department, Status, Priority (in DOM order)
  fillOptions(filterSelects[0], DEPARTMENTS, "All Departments");
  fillOptions(filterSelects[1], STATUSES, "All Statuses");
  fillOptions(filterSelects[2], PRIORITIES, "All Priorities");

  fillOptions(document.getElementById("fieldDepartment"), DEPARTMENTS, "Select department");
  fillOptions(document.getElementById("fieldStatus"), STATUSES, "Select status");
  fillOptions(document.getElementById("fieldPriority"), PRIORITIES, "Select priority");

  /* --- Filters wiring (dashboard page) --- */
  function wireFilters(form) {
    if (!form) return;
    const selects = form.querySelectorAll("select");
    const search = form.querySelector('input[type="search"]');

    if (search) {
      search.addEventListener("input", () => {
        state.filters.search = search.value;
        renderAll();
      });
    }
    if (selects[0]) selects[0].addEventListener("change", () => {
      state.filters.department = selects[0].value; renderAll();
    });
    if (selects[1]) selects[1].addEventListener("change", () => {
      state.filters.status = selects[1].value; renderAll();
    });
    if (selects[2]) selects[2].addEventListener("change", () => {
      state.filters.priority = selects[2].value; renderAll();
    });
  }

  wireFilters(document.getElementById("dashboardFilters"));
  wireFilters(document.querySelector('[data-page-view="patients"] .filters'));

  /* ==========================================================
     Add Patient modal
     ========================================================== */
  const modal = document.getElementById("patientModal");
  const form = document.getElementById("patientForm");

  function openModal() {
    form.reset();
    clearErrors();
    modal.classList.remove("hidden");
    document.getElementById("fieldName").focus();
  }

  function closeModal() {
    modal.classList.add("hidden");
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

    if (!name) { setError("fieldName", "Patient name is required."); ok = false; }

    if (!ageRaw) {
      setError("fieldAge", "Age is required."); ok = false;
    } else {
      const age = Number(ageRaw);
      if (!Number.isFinite(age) || !Number.isInteger(age) || age <= 0) {
        setError("fieldAge", "Age must be a positive whole number."); ok = false;
      }
    }

    if (!gender) { setError("fieldGender", "Please select a gender."); ok = false; }
    if (!department) { setError("fieldDepartment", "Please select a department."); ok = false; }
    if (!doctor) { setError("fieldDoctor", "Doctor name is required."); ok = false; }
    if (!priority) { setError("fieldPriority", "Please select a priority."); ok = false; }
    if (!status) { setError("fieldStatus", "Please select a status."); ok = false; }
    if (!admissionDate) { setError("fieldAdmissionDate", "Admission date is required."); ok = false; }

    if (!ok) return null;

    return createPatient({
      id: generatePatientId(),
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
      showToast("Please fix the highlighted fields.", "error");
      return;
    }

    state.patients.push(patient);
    renderAll();
    closeModal();
    form.reset();
    clearErrors();
    showToast(`Patient "${patient.name}" added successfully (${patient.id}).`);
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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });

  /* --- Add Patient buttons (dashboard + patients page) --- */
  document
    .querySelectorAll("[id='addPatientBtn'], [data-page-view='patients'] .panel-head .btn-primary")
    .forEach((btn) => btn.addEventListener("click", openModal));

  /* --- Table action buttons (View / Edit / Delete) --- */
  // View/Edit/Delete functionality is implemented in a later step.
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const id = btn.dataset.id;
    const action = btn.dataset.action;
    showToast(`${action} for ${id} — coming soon.`);
  });

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      // TODO: clear localStorage data (implemented in next step)
      alert("Reset coming soon.");
    });
  }

  /* --- Initial render --- */
  renderAll();

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
