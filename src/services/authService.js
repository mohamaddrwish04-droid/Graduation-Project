import axiosClient from "../api/axiosClient";

export const loginRequest = async (
    email,
    password
) => {
    try {
        const response =
            await axiosClient.post(
                "/Auth/login",
                {
                    email,
                    password,
                }
            );

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data ||
            "فشل تسجيل الدخول"
        );
    }
};

export const forgotPasswordRequest = async (email) => {
    try {

        const response =
            await axiosClient.post(
                "/Auth/forgot-password",
                {
                    email,
                }
            );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data ||
            "فشل إرسال رمز التحقق"
        );
    }
};

export const resetPasswordRequest = async (
    email,
    code,
    newPassword
) => {

    try {

        const response =
            await axiosClient.post(
                "/Auth/reset-password",
                {
                    email,
                    code,
                    newPassword,
                }
            );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data ||
            "فشل إعادة تعيين كلمة المرور"
        );
    }
};

export const changePassword = async (currentPassword,newPassword) => {
    try {
        const response = await axiosClient.post(
            "/Auth/change-password",
            {
                currentPassword,
                newPassword,
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data ||
            "فشل تغيير كلمة المرور"
        );
    }
};