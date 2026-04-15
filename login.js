const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg, type='error') {
  toast.textContent = msg;
  toast.className = 'toast ' + type;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove('show'), 3000);
}

const eyeToggle = document.getElementById('eyeToggle');
const pwInput   = document.getElementById('password');
const eyeIcon   = document.getElementById('eyeIcon');
const eyeOpen   = `<path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.2"/>`;
const eyeClose  = `<path d="M1 1l14 14M6.5 6.6A2 2 0 0 0 8 10a2 2 0 0 0 1.5-.6M4 4.3C2.3 5.5 1 8 1 8s2.5 5 7 5a7 7 0 0 0 3-.7M8 3c4.5 0 7 5 7 5a12 12 0 0 1-1.8 2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>`;
eyeToggle.addEventListener('click',()=>{
  const shown = pwInput.type === 'text';
  pwInput.type = shown ? 'password' : 'text';
  eyeIcon.innerHTML = shown ? eyeOpen : eyeClose;
});

document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const terms    = document.getElementById('terms').checked;
  const btn      = document.querySelector('.btn-login');

  if (!terms) { showToast('Please accept Terms and Privacy Policy'); return; }
  if (!email || !password) { showToast('Please fill in all fields'); return; }

  btn.classList.add('loading');

  setTimeout(()=>{
    btn.classList.remove('loading');
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user  = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("currentUser", email);
      showToast('Login successful! Redirecting…', 'success');
      setTimeout(()=> window.location.href = "index.html", 1200);
    } else {
      showToast('Invalid email or password');
    }
  }, 800);
});

document.getElementById('googleBtn').addEventListener('click', function(){
  localStorage.setItem("loggedIn", true);
  showToast('Logged in with Google! Redirecting…', 'success');
  setTimeout(()=> window.location.href = "index.html", 1200);
});

const googleIcon = document.querySelector('.google-icon');
if (googleIcon) {
  googleIcon.addEventListener('error', function() {
    this.style.display='none';
    this.nextElementSibling.style.display='flex';
  });
}
