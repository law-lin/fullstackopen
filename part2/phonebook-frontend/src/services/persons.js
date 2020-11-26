import axios from 'axios';
const baseUrl = '/api/people';

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const updateNumber = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  updateNumber: updateNumber,
  deletePerson: deletePerson,
};
