const getBaseUrl = () => {
  const envBase = process.env.REACT_APP_API_BASE;
  if (envBase) return envBase.replace(/\/$/, '');
  return '';
};

const BASE = getBaseUrl();

export async function login({ email, password }) {
  const res = await fetch(`${BASE}/api/users/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.text()) || 'Login failed');
  return res.json();
}

export async function register({ name, email, password }) {
  const res = await fetch(`${BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) throw new Error((await res.text()) || 'Registration failed');
  return res.json();
}

export async function logout() {
  const res = await fetch(`${BASE}/api/users/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error((await res.text()) || 'Logout failed');
  return res.json();
}

export async function getProfile() {
  const res = await fetch(`${BASE}/api/users/profile`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error((await res.text()) || 'Profile fetch failed');
  return res.json();
}

export default { login, register, logout, getProfile };


