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

export default { login, create };
