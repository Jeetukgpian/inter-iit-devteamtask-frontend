import api from "./api";

export const getLocations = async () => {
  try {
    const response = await api.get("/locations");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createLocation = async (location) => {
  try {
    const response = await api.post("/locations", location);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLocation = async (id) => {
  try {
    await api.delete(`/locations/${id}`);
  } catch (error) {
    throw error;
  }
};
