import http from "../http-common";

const create = data => {
    return http.post("/posts", data);
  };

const get = id => {
  return http.get(`/posts/${id}`);
};

const getAll = () => {
  return http.get("/posts");
};

const update = (id, data) => {
  return http.put(`/posts/${id}`, data);
};

const remove = id => {
  return http.delete(`/posts/${id}`);
};

const PostService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default PostService;
