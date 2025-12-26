import axios from 'axios';

const api = axios.create({ 
  baseURL: '/api',
  timeout: 10000,
});

export function setUserId(userId?: number) {
  if (userId) api.defaults.headers.common['x-user-id'] = String(userId);
  else delete api.defaults.headers.common['x-user-id'];
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
