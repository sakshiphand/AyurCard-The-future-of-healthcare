export const authHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export const getUserRole = (): string | null => {
  return localStorage.getItem('userRole');
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userId');
  window.location.href = '/';
};
export const getUserName = () => localStorage.getItem('userName') || '';