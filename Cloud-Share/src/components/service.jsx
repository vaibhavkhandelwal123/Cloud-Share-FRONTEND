import axios from "axios";
const createFile = async (form) => {
  try {
    return await axios.post("http://localhost:8080/file/create", form);
  } catch (error) {
    console.log(error);
  }
};

const getFile = async (id) => {
  try {
    return await axios.get(`http://localhost:8080/file/get/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export { createFile, getFile };
