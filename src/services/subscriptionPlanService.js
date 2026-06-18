import axiosClient from "../api/axiosClient";

export const getSubscriptionPlans =
    async () => {
        const response =
            await axiosClient.get(
                "/admin/subscription-plans"
            );

        return response.data;
    };

export const createSubscriptionPlan =
    async (data) => {
        const response =
            await axiosClient.post(
                "/admin/subscription-plans",
                {
                    name: data.name,
                    price: Number(data.price),
                    durationInDays: Number(
                        data.durationInDays
                    ),
                }
            );

        return response.data;
    };

export const updateSubscriptionPlan =
    async (id, data) => {
        const response =
            await axiosClient.put(
                `/admin/subscription-plans/${ id }`,
                {
                    name: data.name,
                    price: Number(data.price),
                    durationInDays: Number(
                        data.durationInDays
                    ),
                }
            );

        return response.data;
    };

export const activateSubscriptionPlan =
    async (id) => {
        await axiosClient.patch(
            `/admin/subscription-plans/${ id }/activate`
        );
    };

export const deactivateSubscriptionPlan =
    async (id) => {
        await axiosClient.patch(
            `/admin/subscription-plans/${ id }/deactivate`
        );
    };