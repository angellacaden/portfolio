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
const eyeOpen  = `<path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.2"/>`;
const eyeClose = `<path d="M1 1l14 14M6.5 6.6A2 2 0 0 0 8 10a2 2 0 0 0 1.5-.6M4 4.3C2.3 5.5 1 8 1 8s2.5 5 7 5a7 7 0 0 0 3-.7M8 3c4.5 0 7 5 7 5a12 12 0 0 1-1.8 2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>`;
eyeToggle.addEventListener('click', ()=>{
  const shown = pwInput.type === 'text';
  pwInput.type = shown ? 'password' : 'text';
  eyeIcon.innerHTML = shown ? eyeOpen : eyeClose;
});

const segs  = [document.getElementById('seg1'),document.getElementById('seg2'),document.getElementById('seg3'),document.getElementById('seg4')];
const label = document.getElementById('strengthLabel');
pwInput.addEventListener('input', ()=>{
  const val = pwInput.value;
  let score = 0;
  if (val.length >= 8)  score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const cls = score <= 1 ? 'active-weak' : score <= 2 ? 'active-fair' : 'active-strong';
  const lbl = score === 0 ? '' : score <= 1 ? 'Weak' : score <= 2 ? 'Fair' : score === 3 ? 'Good' : 'Strong';
  const col = score <= 1 ? '#b85c2c' : score <= 2 ? '#c9a84c' : '#7aad74';

  segs.forEach((s,i)=>{
    s.className = 'strength-seg';
    if (i < score) s.classList.add(cls);
  });
  label.textContent = lbl;
  label.style.color = col;
});

document.getElementById('registerForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name     = document.getElementById('name').value.trim();
  const email    = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const terms    = document.getElementById('terms').checked;
  const btn      = document.querySelector('.btn-register');

  if (!terms)    { showToast('Please accept Terms and Privacy Policy'); return; }
  if (!name || !email || !password) { showToast('Please fill in all fields'); return; }
  if (password.length < 6) { showToast('Password must be at least 6 characters'); return; }

  btn.classList.add('loading');

  setTimeout(()=>{
    btn.classList.remove('loading');
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
      showToast('Email is already registered!');
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    showToast('Account created! Redirecting to login…', 'success');
    setTimeout(()=> window.location.href = "login.html", 1400);
  }, 800);
});
