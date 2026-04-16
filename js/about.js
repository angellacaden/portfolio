const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
const logoutBtn = document.getElementById('logoutBtn');

function closeMenu() {
  menuToggle.classList.remove('active');
  navLinks.classList.remove('open');
  navOverlay.classList.remove('show');
}

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  navOverlay.classList.toggle('show');
});

navOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('#navLinks a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

logoutBtn.addEventListener('click', function() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('currentUser');
  window.location.href = 'login.html';
});
