import { api } from "./axios";

export const getMeApi = () => api.get("/users/me");

export const updateMeApi = (data) =>
  api.patch("/users/me", {
    firstName: (data.firstName ?? "").trim(),
    lastName: (data.lastName ?? "").trim(),
    phone: (data.phone ?? "").trim(),
  });

export const adminListUsersApi = (params) => api.get("/users", { params });
export const adminUpdateUserApi = (id, data) => api.patch(`/users/${id}`, data);
export const adminDeleteUserApi = (id) => api.delete(`/users/${id}`);
