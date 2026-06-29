import axiosClient from "../api/axiosClient";

export const getOrders = async () => {
    const response = await axiosClient.get(
        "/admin/orders"
    );

    return response.data;
};