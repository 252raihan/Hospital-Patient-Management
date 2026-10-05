# MediCare Hospital

A frontend-only **Hospital Patient Management Dashboard** built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no backend, no API — all data persistence will be handled via `localStorage`.

## Tech Stack

- HTML5
- CSS3 (responsive, no frameworks)
- Vanilla JavaScript
- `localStorage` for browser-side persistence

## Project Structure

```
medicare/
├── index.html    # App shell & layout
├── style.css     # Styles (responsive)
├── script.js     # Navigation & shell logic
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

## Features (Shell Only)

- Sidebar navigation (Dashboard, Patients, Appointments, Doctors, Settings)
- Responsive layout with mobile hamburger menu
- Sticky topbar with page title and user avatar
- Patient functionality coming next
"# Hospital-Patient-Management" 
