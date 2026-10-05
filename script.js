/* ============ MediCare Hospital — App Shell ============ */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const pages = document.querySelectorAll(".page");
  const pageTitle = document.getElementById("pageTitle");
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");

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
