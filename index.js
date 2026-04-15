const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navOverlay = document.getElementById("navOverlay");
const logoutBtn = document.getElementById("logoutBtn");

function closeMenu() {
  menuToggle.classList.remove("active");
  navLinks.classList.remove("open");
  navOverlay.classList.remove("show");
}

function openMenu() {
  menuToggle.classList.add("active");
  navLinks.classList.add("open");
  navOverlay.classList.add("show");
}

menuToggle.addEventListener("click", function () {
  if (navLinks.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

navOverlay.addEventListener("click", closeMenu);

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

logoutBtn.addEventListener("click", function() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});
