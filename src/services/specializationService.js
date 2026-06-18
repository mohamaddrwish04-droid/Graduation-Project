import axiosClient from "../api/axiosClient";

export const getSpecializations = async () => {
    const response = await axiosClient.get(
        "/admin/specializations"
    );

    return response.data;
};

export const createSpecialization = async (data) => {
    const response = await axiosClient.post(
        "/admin/specializations",
        {
            name: data.name,
            description: data.description,
        }
    );

    return response.data;
};

export const updateSpecialization = async (
    id,
    data
) => {
    const response = await axiosClient.put(
        `/admin/specializations/ ${id}`,
        {
            name: data.name,
            description: data.description,
        }
    );

    return response.data;
};

export const activateSpecialization =
    async (id) => {
        await axiosClient.patch(
            `/admin/specializations/${id}/activate`
        );
    };

export const deactivateSpecialization =
    async (id) => {
        await axiosClient.patch(
            `/admin/specializations/${id}/deactivate`
        );
    };