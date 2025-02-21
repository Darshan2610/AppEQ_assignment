const API_BASE_URL = 'http://localhost:3000/api';

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return response.json();
};

export const fetchMetrics = async () => {
  const response = await fetch(`${API_BASE_URL}/metrics`);
  return response.json();
};

export const fetchInsights = async () => {
  const response = await fetch(`${API_BASE_URL}/insights`);
  return response.json();
}; 