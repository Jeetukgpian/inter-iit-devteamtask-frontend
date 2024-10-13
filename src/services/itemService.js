import api from "./api";

export const getItemById = async (id) => {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createItem = async (item) => {
  try {
    const response = await api.post("/items", item);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getItems = async (filters = {}) => {
  try {
    const response = await api.get("/items", { params: filters });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    await api.delete(`/items/${id}`);
  } catch (error) {
    throw error;
  }
};
