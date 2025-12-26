import axios from 'axios';

const api = axios.create({ 
  baseURL: '/api',
  timeout: 10000,
});

// Get token from localStorage
function getToken(): string | null {
  return localStorage.getItem('token');
}

// Set token in axios headers
export function setToken(token: string | null) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
}

// Initialize token on load
const token = getToken();
if (token) {
  setToken(token);
}

// Legacy support - keep for backward compatibility
export function setUserId(_userId?: number) {
  // This is now handled by JWT token
  // Keeping for backward compatibility
}

// Auth endpoints
export async function signup(name: string, email: string, password: string) {
  const response = await api.post('/auth/signup', { name, email, password });
  if (response.data.token) {
    setToken(response.data.token);
  }
  return response.data;
}

export async function login(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    setToken(response.data.token);
  }
  return response.data;
}

export async function logout() {
  setToken(null);
}

export async function getCurrentUser() {
  return api.get('/auth/me').then(r => r.data);
}

export async function getUsers() {
  return api.get('/users').then(r => r.data);
}

export async function getUser(id: number) {
  return api.get(`/users/${id}`).then(r => r.data);
}

export async function getMurmurs() {
  return api.get('/murmurs').then(r => r.data);
}

export async function getMurmur(id: number) {
  return api.get(`/murmurs/${id}`).then(r => r.data);
}

export async function getUserMurmurs(userId: number) {
  return api.get(`/users/${userId}/murmurs`).then(r => r.data);
}

export async function getTimeline() {
  return api.get('/me/timeline').then(r => r.data);
}

export async function createMurmur(content: string) {
  return api.post('/me/murmurs', { content }).then(r => r.data);
}

export async function deleteMurmur(id: number) {
  return api.delete(`/me/murmurs/${id}`).then(r => r.data);
}

export async function checkFollowStatus(id: number) {
  return api.get(`/me/follow/${id}`).then(r => r.data);
}

export async function followUser(id: number) {
  return api.post(`/me/follow/${id}`).then(r => r.data);
}

export async function unfollowUser(id: number) {
  return api.delete(`/me/follow/${id}`).then(r => r.data);
}

export async function likeMurmur(id: number) {
  return api.post(`/murmurs/${id}/like`).then(r => r.data);
}

export async function unlikeMurmur(id: number) {
  return api.delete(`/murmurs/${id}/like`).then(r => r.data);
}

export default api;
