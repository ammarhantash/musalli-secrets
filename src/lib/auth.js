const KEY = 'ms_draft_auth';
// __DRAFT_PASSWORD__ is injected by vite.config.js define from VITE_DRAFT_PASSWORD in .env.local
const PASSWORD = typeof __DRAFT_PASSWORD__ !== 'undefined' ? __DRAFT_PASSWORD__ : '';

// If no password is configured, auth is bypassed (local dev without .env.local)
export function checkAuth() {
  if (!PASSWORD) return;
  if (sessionStorage.getItem(KEY) !== PASSWORD) {
    const returnTo = encodeURIComponent(location.pathname + location.search);
    location.replace(`/gate.html?from=${returnTo}`);
  }
}

export function setAuth(password) {
  sessionStorage.setItem(KEY, password);
}

export function isCorrectPassword(input) {
  return input === PASSWORD;
}

export function clearAuth() {
  sessionStorage.removeItem(KEY);
}
