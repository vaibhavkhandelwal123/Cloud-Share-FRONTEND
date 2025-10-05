import axios from "axios";
const BASE_URL = "https://cloudshare-backend-nyem.onrender.com";
const createFile = async (form) => {
  try {
    return await axios.post(`${BASE_URL}/file/create`, form);
  } catch (error) {
    console.log(error);
  }
};

const getFile = async (id) => {
  try {
    return await axios.get(`${BASE_URL}/file/get/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export { createFile, getFile };
