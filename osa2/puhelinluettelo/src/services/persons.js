import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  return axios.get(baseUrl).then((response) => {
    return response.data;
  });
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => {
    return response.data;
  });
}

const deleteById = (id) => {
  console.log('personID to be deleted:', id);
   return axios.delete(baseUrl + "/" + id)
}

const update = (updatedPerson) => {
  return axios.put(baseUrl + "/" + updatedPerson._id, updatedPerson);

}

export default {
  getAll: getAll,
  create: create,
  deleteById: deleteById,
  update: update
}