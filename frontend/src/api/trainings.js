import axios from "axios";

const API_URL = "http://localhost:5000/api/trainings";

export const getAllTrainings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTrainingById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTraining = async (trainingData) => {
  const response = await axios.post(API_URL, trainingData);
  return response.data;
};

export const updateTraining = async (id, trainingData) => {
  const response = await axios.put(`${API_URL}/${id}`, trainingData);
  return response.data;
};

export const deleteTraining = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const getTrainerTrainings = async (trainerId) => {
  const response = await axios.get(`${API_URL}/trainer/${trainerId}`);
  return response.data;
};

export const markAttendance = async (trainingId, attendanceData) => {
  const response = await axios.post(
    `${API_URL}/${trainingId}/attendance`,
    attendanceData
  );
  return response.data;
};
