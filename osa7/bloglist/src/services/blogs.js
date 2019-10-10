import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.get(baseUrl, config);
  return request.then(response => response.data);
};

const getById = async id => {
  const response = await axios.get(baseUrl + "/" + id);
  return response.data;
};

const create = async blog => {
  const config = {
    headers: { Authorization: token }
  };
  try {
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const update = async blog => {
  const response = await axios.put(baseUrl + "/" + blog.id, blog);
  return response.data;
};

const remove = async id => {
  const config = { headers: { authorization: token } };
  const response = await axios.delete(baseUrl + "/" + id, config);
  return response.data;
};

const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    comment: comment
  });
  return response.data;
};

//const getComments = async (id) => {
//  const response = await axios.get(baseUrl + "/" + id + "/comments");
//  return response.data;
//}

export default { getAll, getById, create, update, remove, setToken, createComment };
