import api from "../api/api";

export async function assessBusiness(data) {
    const response = await api.post("/predict", data);
    return response.data;
}