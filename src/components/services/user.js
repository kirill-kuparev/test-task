import http from './http'

const user = {
  token: null,
  public_routes: ['/login', '/register', '/forgot-password'],
  get_info: () => {
    const info = localStorage.getItem('user');
    try {
      return JSON.parse(info);
    } catch (e) {
      return {};
    }
  },
  get_public_name() {
    let id = (user.get_info() || {}).id;
    return id === 1 ? 'Moderator' : 'Super Admin'
  },
  set_info: info => {
    localStorage.setItem('user', JSON.stringify(info));
  },
  get_token: () => {
    user.token = user.token || localStorage.getItem('token');
    return user.token
  },
  set_token: token => {
    user.token = token;
    localStorage.setItem('token', token);
  },
  logout: () => {
    let token = user.get_token();
    if (token) {
      http.post('/sign_out');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      user.token = null;
    }
    if (user.public_routes.indexOf(window.location.pathname) < 0) {
      window.hist.push('/login');
    }

  },
};

export default user;
