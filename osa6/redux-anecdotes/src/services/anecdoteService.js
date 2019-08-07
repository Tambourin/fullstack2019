import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  return axios.get(baseUrl).then(response => response.data);
}

const create = async (content) => {
  const newAnecdote = {
    content: content,
    votes: 0
  }
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
}

const update = async (anecdote) => {
  const response = await axios.put(baseUrl + "/" + anecdote.id, anecdote);
  return response.data;
}

export default { getAll, create, update };