export const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  };
  
  export const logout = () => {
    localStorage.removeItem('auth');
  };
  
  export const isAuthenticated = () => {
    return localStorage.getItem('auth') === 'true';
  };