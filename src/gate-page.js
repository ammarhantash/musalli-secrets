import { setAuth, isCorrectPassword } from './lib/auth.js';

const input  = document.getElementById('gate-input');
const btn    = document.getElementById('gate-btn');
const errMsg = document.getElementById('gate-error');

const params = new URLSearchParams(location.search);
// Only allow same-origin paths — anything else (https://…, //evil.com) falls back to '/'
let returnTo = '/';
try {
  const raw = decodeURIComponent(params.get('from') || '/');
  if (raw.startsWith('/') && !raw.startsWith('//')) returnTo = raw;
} catch { /* malformed encoding — keep '/' */ }

function attempt() {
  const val = input.value.trim();
  if (!val) return;

  if (isCorrectPassword(val)) {
    setAuth(val);
    location.replace(returnTo);
  } else {
    errMsg.style.display = 'block';
    input.style.borderColor = '#8B3A3A';
    input.value = '';
    input.focus();
    setTimeout(() => {
      errMsg.style.display = 'none';
      input.style.borderColor = '#222';
    }, 3000);
  }
}

btn.addEventListener('click', attempt);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter') attempt(); });
input.focus();
