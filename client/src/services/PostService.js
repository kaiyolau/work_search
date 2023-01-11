import http from "../http-common";

const create = data => {
  const token = localStorage.getItem('token');
    return http.post("/posts", data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  };

const get = id => {
  return http.get(`/posts/${id}`);
};

const getAll = () => {
  return http.get("/posts");
};

const update = (id, data) => {
  console.log('data from the port', data)
  const token = localStorage.getItem('token');
  return http.patch(`/posts/${id}/update`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const remove = id => {
  const token = localStorage.getItem('token');
  return http.delete(`/posts/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

const PostService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default PostService;
