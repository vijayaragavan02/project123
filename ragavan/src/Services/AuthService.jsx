
const AuthService = {
  login: (username, password) => {
    const validUser = {
      username: 'admin',
      password: 'admin123',
    };

    if (username === validUser.username && password === validUser.password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  },

  isAuthenticated: () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  },

  getUsername: () => {
    return localStorage.getItem('username');
  },
};

export default AuthService;

