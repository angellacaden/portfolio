const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function closeMenu() {
  burger.classList.remove('active');
  navLinks.classList.remove('active');
  navOverlay.classList.remove('show');
}

function openMenu() {
  burger.classList.add('active');
  navLinks.classList.add('active');
  navOverlay.classList.add('show');
}

burger.addEventListener('click', () => {
  if (navLinks.classList.contains('active')) {
    closeMenu();
  } else {
    openMenu();
  }
});

navOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('#navLinks a, #navLinks button').forEach(link => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

document.getElementById("logoutBtn").addEventListener("click", function() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});
