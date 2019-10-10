import axios from "axios";
const baseUrl = "/api/login";

const login = async (username, password) => {
  const response = await axios.post(baseUrl, {
    username: username,
    password: password
  });
  return response.data;
};

const create = async (username, password, name) => {
  await axios.post("/api/users", {
    username: username,
    password: password,
    name: name
  });
};

const getAll = async () => {
  const response = await axios.get("/api/users");
  return response.data;
}

const findOne = async (id) => {
  const response = await axios.get("/api/users" + id);
  console.log('response:', response);
  return response.data;
}

export default { login, create, getAll, findOne };
