import axiosClient from "../api/axiosClient";

export const loginRequest = async (email,password) => {
    try {
        const response = await axiosClient.post("/Auth/login",{email,password,}
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data ||"فشل تسجيل الدخول"
        );
    }
};