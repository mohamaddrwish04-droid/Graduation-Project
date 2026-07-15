import axiosClient from "../api/axiosClient";

export const getCurrentUser = async () => {

    const response =
        await axiosClient.get(
            "/Auth/me"
        );

    return response.data;
};


export const uploadProfileImage = async (
    selectedFile
) => {

    const formData =
        new FormData();

    formData.append(
        "file",
        selectedFile
    );

    const response =
        await axiosClient.post(
            "/users/me/profile-image",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

    return response.data;
};