# MediCare Hospital

A frontend-only **Hospital Patient Management Dashboard** built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no backend, no API — all data is held in browser-side JavaScript state and persisted to `localStorage`.

## Tech Stack

- HTML5
- CSS3 (responsive, no frameworks)
- Vanilla JavaScript
- Browser `localStorage` (keys: `medicare_patients`, `medicare_language`)

## Project Structure

```
medicare/
├── index.html    # App shell, dashboard, patient tables, Add Patient modal, Reset Data modal
├── style.css     # Styles (responsive)
├── script.js     # Data model, state, localStorage persistence, i18n, rendering, modal logic
├── LICENSE       # MIT License
└── README.md
```

## Getting Started

### Option 1: Open directly

Just double-click `index.html` — it opens in any modern browser.

### Option 2: Simple static server

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

## Features

### Layout & Navigation
- Sidebar navigation (Dashboard, Patients, Settings)
- Sticky header with hospital brand and Reset Data button
- Responsive layout with mobile hamburger menu

### Data Persistence
- Patient data is stored in **browser `localStorage`** under the key `medicare_patients`
- On startup: saved data is loaded when valid; otherwise the built-in sample
  dataset is loaded and saved
- Every **Add**, **Edit**, and **Delete** writes the full dataset back to `localStorage`
- Refreshing the browser preserves all patient changes
- No backend, no API, no IndexedDB — plain `localStorage` only

### Safe Data Handling
- Stored data is validated on load: the value must parse as JSON and be an
  array of well-formed patient records (valid `id`, `name`, `doctor`, positive
  integer `age`, and a `department` / `priority` / `status` from the known lists)
- Invalid records are dropped; duplicate IDs are de-duplicated
- If nothing usable remains (corrupt JSON, wrong shape, or only invalid
  records), the app falls back to the original sample dataset and **repairs
  `localStorage`** — it never crashes

### Reset Demo Data
- The header **Reset Data** button opens a confirmation modal explaining that
  all current patient changes will be removed
- **Cancel** (or the ✕ / Escape) changes nothing
- **Confirm** restores the original fictional sample dataset, saves it to
  `localStorage`, clears the search box, resets the Department / Status /
  Priority filters, re-renders the table, recalculates the statistics, and
  shows a success notification
- Reset restores the sample dataset (not an empty database) and leaves the
  selected language and navigation untouched

### Language (English / বাংলা)
- Header toggle: **English | বাংলা** — switches the interface instantly, with
  no page reload and no duplicated HTML
- Default language is **English**; the choice is saved in `localStorage` under
  `medicare_language` and restored on reload
- A single centralized `TRANSLATIONS` object holds every English and Bangla
  string; elements carry `data-i18n` / `data-i18n-placeholder` / `data-i18n-aria`
  attributes and are updated by one `applyLanguage()` pass
- Covers navigation, header, dashboard stats, table headings, row actions,
  the patient form, search/filter labels, status and priority labels, empty
  states, validation errors, toasts and confirmation modals
- **Dataset values are never translated**: patient names, IDs, doctor names,
  phone numbers, dates and stored `department` / `priority` / `status` values
  stay exactly as they are. Only their *display labels* change, so
  `Admitted` and `ভর্তি` are the same underlying value — switching language
  never rewrites patient data
- Select options keep stable `value` attributes (the dataset value) while the
  visible text is translated, so filters keep working in both languages

### Dashboard
- Live statistics cards: Total Patients, Waiting, Admitted, Emergency, Discharged
- Statistics are **derived from the patient data** — never hard-coded

### Patient Management
- **Dynamic patient table** rendered from the JavaScript data array with columns:
  Patient ID, Name, Age, Gender, Department, Doctor, Priority, Status, Actions
- Status badges (Waiting, Admitted, Emergency, Discharged) and priority badges
  (Low, Medium, High, Critical) with distinct colors
- Row actions: **View**, **Edit**, **Delete**
  - **View** — read-only details modal showing every field, with a Close button
  - **Edit** — reuses the patient form, prefilled, titled "Edit Patient"; the Patient ID is preserved
  - **Delete** — confirmation modal naming the patient, with Cancel / Delete Patient
- Empty state: "No patients found." when no rows match
- Search + Department / Status / Priority filters, with a **Clear Filters** button
- Dashboard statistics always reflect the **complete** dataset, never the filtered rows

### Add / Edit Patient
- Professional modal form opened from the **+ Add Patient** button (add mode)
  or from a row's **Edit** action (edit mode)
- Fields: Patient Name, Age, Gender, Phone (optional), Department, Doctor,
  Priority, Status, Admission Date
- Required-field validation and positive whole-number validation for Age
- Unique Patient ID generated automatically on add (e.g. `P-0009`);
  the existing ID is kept unchanged when editing
- On success: state updates, table re-renders, dashboard stats update,
  modal closes, form resets, and a success toast is shown — all without a page reload

### View & Delete
- **View** opens a read-only details modal (no editing possible there)
- **Delete** opens a confirmation modal showing the patient's name and ID;
  cancelling changes nothing, confirming removes the patient and refreshes the UI

## Data Model

Each patient:

| Field         | Notes                                              |
|---------------|----------------------------------------------------|
| id            | Auto-generated, e.g. `P-0001`                      |
| name          | string                                             |
| age           | positive integer                                   |
| gender        | Male / Female / Other                              |
| phone         | optional string                                    |
| department    | Cardiology, Medicine, Neurology, Orthopedics, Pediatrics, Emergency |
| doctor        | string                                             |
| priority      | Low, Medium, High, Critical                        |
| status        | Waiting, Admitted, Discharged, Emergency           |
| admissionDate | `YYYY-MM-DD`                                       |

Sample (fictional) patient records are included for visual testing.

## localStorage

| Item | Key | Value |
|------|-----|-------|
| Patient data | `medicare_patients` | JSON array of patient objects |
| Language | `medicare_language` | `"en"` or `"bn"` |

To reset from the browser console: `localStorage.removeItem("medicare_patients")`
and reload — the sample dataset will be restored.

## Roadmap

- [x] `localStorage` persistence
- [x] Reset Data confirmation
- [x] Bangla / English language toggle

All planned features are implemented.

## Accessibility

- Every form input has an associated `<label for>`
- Modals use `role="dialog"`, `aria-modal` and `aria-labelledby`
- Icon-only buttons carry `aria-label` (translated)
- The language toggle exposes `aria-pressed` state
- Modals can be closed with the **Escape** key, and the close ✕ is keyboard-focusable

## Known Issues

- **Search matches stored data only.** Searching by name/ID/phone matches the raw
  dataset values, so searching for a translated label (e.g. `ভর্তি`) will not
  match — this is intentional, since patient data is never translated.
- **Gender is a data field.** It stays `Male` / `Female` / `Other` in the table
  and View modal; only the form dropdown labels are translated.
- **The browser tab title** (`<title>`) stays in English.
- **The patient table scrolls horizontally on small screens** (by design — it has
  many columns); the page itself does not overflow.
- `localStorage` is per-browser and per-origin, so data does not sync between
  devices or browsers.

## AI Tools Used

This project was developed with the assistance of an AI coding assistant
(CodeGPT) for implementation, review, and browser-based QA testing.

## License

Released under the [MIT License](LICENSE).
