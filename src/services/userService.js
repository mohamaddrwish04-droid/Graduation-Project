import axiosClient from "../api/axiosClient";

export const getUsers = async () => {
    const response = await axiosClient.get(
        "/admin/users"
    );

    return response.data;

};

export const getProviders = async () => {
    const response = await axiosClient.get(
        "/admin/providers"
    );

    return response.data;

};