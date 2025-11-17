import { API_BASE } from "./apiConfig";

export async function login(credentials) {
  const res = await fetch(`${API_BASE}/api/users/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}

export async function register(data) {
  const res = await fetch(`${API_BASE}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Registration failed");
  }

  return res.json();
}

export async function getCurrentUser() {
  const res = await fetch(`${API_BASE}/api/users/profile`, {
    credentials: 'include',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function logout() {
  await fetch(`${API_BASE}/api/users/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export async function updateUserProfile(data) {
  const res = await fetch(`${API_BASE}/api/users/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to update profile');
  }
  return res.json();
}

export async function forgotPassword(email) {
  const res = await fetch(`${API_BASE}/api/users/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to send password reset email');
  }
  return res.json();
}

export async function resetPassword(resetToken, password) {
  const res = await fetch(`${API_BASE}/api/users/reset-password/${resetToken}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to reset password');
  }
  return res.json();
}