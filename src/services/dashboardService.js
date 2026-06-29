import axiosClient from "../api/axiosClient";

export const getDashboardSummary = async () => {
    const response = await axiosClient.get(
        "/admin/dashboard/summary"
    );

    return response.data;
};