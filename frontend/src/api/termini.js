import axios from "./axios";

export const createTermin = async (data) => {
  const response = await axios.post("/termini", data);
  return response.data;
};
