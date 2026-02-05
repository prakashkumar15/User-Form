// user.api.ts

import axios from "axios";
import { UserFormValues } from "@/lib/user.schema";

const BASE_URL = "/api/users";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userApi = {
  getAll: async () => {
    const { data } = await axiosInstance.get("/");
    return data;
  },

  create: async (data: UserFormValues) => {
    const response = await axiosInstance.post("/", data);
    return response.data;
  },

  update: async (id: number, data: UserFormValues) => {
    const response = await axiosInstance.put(`/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  },
};
