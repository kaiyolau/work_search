import http from "../http-common";

const create = data => {
    return http.post("/users", data);
  };

const login = data => {
    return http.post("/users/login", data);

  };

  const get = () => {
    const token = localStorage.getItem('token');
    return http.get('/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };


const logout = () => {
  return http.post('/users/logout');
};

const logoutAll = () => {
  const token = localStorage.getItem('token');
  return http.post(`/users/logoutAll`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const remove = () => {
  const token = localStorage.getItem('token');
  return http.delete(`/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const UserService = {
    create,
    login,
    get,
    logout,
    logoutAll,
    remove
};

export default UserService;
