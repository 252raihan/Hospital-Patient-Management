# MediCare Hospital

A frontend-only **Hospital Patient Management Dashboard** built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no backend, no API — all data is currently held in browser-side JavaScript state (localStorage persistence is planned).

## Tech Stack

- HTML5
- CSS3 (responsive, no frameworks)
- Vanilla JavaScript
- Browser-side state (`localStorage` integration planned)

## Project Structure

```
medicare/
├── index.html    # App shell, dashboard, patient tables, Add Patient modal
├── style.css     # Styles (responsive)
├── script.js     # Data model, state, rendering, modal logic
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

### Dashboard
- Live statistics cards: Total Patients, Waiting, Admitted, Emergency, Discharged
- Statistics are **derived from the patient data** — never hard-coded

### Patient Management
- **Dynamic patient table** rendered from the JavaScript data array with columns:
  Patient ID, Name, Age, Gender, Department, Doctor, Priority, Status, Actions
- Status badges (Waiting, Admitted, Emergency, Discharged) and priority badges
  (Low, Medium, High, Critical) with distinct colors
- Row actions: **View**, **Edit**, **Delete** (placeholder — logic added in a later step)
- Empty state: "No patients found." when no rows match
- Search + Department / Status / Priority filters

### Add Patient
- Professional modal form opened from the **+ Add Patient** button
- Fields: Patient Name, Age, Gender, Phone (optional), Department, Doctor,
  Priority, Status, Admission Date
- Required-field validation and positive whole-number validation for Age
- Unique Patient ID generated automatically (e.g. `P-0009`)
- On success: patient is added to state, table re-renders, dashboard stats update,
  modal closes, form resets, and a success toast is shown — all without a page reload

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

## Roadmap

- [ ] View / Edit / Delete patient functionality
- [ ] `localStorage` persistence
- [ ] Reset Data confirmation
- [ ] Bangla / English language toggle
