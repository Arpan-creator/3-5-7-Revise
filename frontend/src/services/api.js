import axios from "axios";

const API_URL = "https://three-5-7-revise.onrender.com/tasks";

export const getTasks = () => axios.get(API_URL);
export const addTask = (task) => axios.post(API_URL, task);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
export const updateTask = (id, updates) => axios.patch(`${API_URL}/${id}`, updates);
