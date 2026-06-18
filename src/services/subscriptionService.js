import axiosClient from "../api/axiosClient";



export const subscriptionPaymentRequests = async () => {
    const response = await axiosClient.get(
        "admin/subscription-payment-requests"
    );

    return response.data;

};
export const subscriptionPaymentRequestsPending = async () => {
    const response = await axiosClient.get(
        "admin/subscription-payment-requests/pending"
    );

    return response.data;

};
export const subscriptionPaymentRequestsApprove = async (id) => {
    const response = await axiosClient.patch(
        `admin/subscription-payment-requests/${id}/approve`
    );

    return response.data;

};
export const subscriptionPaymentRequestsReject = async (id, adminnote) => {
    const response = await axiosClient.patch(
        `admin/subscription-payment-requests/${id}/reject`, {
        adminnote,
    }
    );

    return response.data;

};

