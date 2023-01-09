import http from "../http-common";

const create = (postingId, data) => {
  const token = localStorage.getItem('token');
  return http.post(`/posts/${postingId}/apps`, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  };

const remove = () => {
  const token = localStorage.getItem('token');
  return http.delete(`/apps`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

const AppService = {
    create,
    remove
};

export default AppService;
