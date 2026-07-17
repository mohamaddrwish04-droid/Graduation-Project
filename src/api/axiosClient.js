import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://localhost:7064/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = ` Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)

);

axiosClient.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken =
                    localStorage.getItem("refreshToken");

                const response = await axios.post(
                    "https://localhost:7064/api/Auth/refresh",
                    {
                        refreshToken,
                    }
                );

                const {
                    accessToken,
                    refreshToken: newRefreshToken,
                } = response.data;

                localStorage.setItem(
                    "accessToken",
                    accessToken
                );

                localStorage.setItem(
                    "refreshToken",
                    newRefreshToken
                );

                const user = JSON.parse(
                    localStorage.getItem("user")
                );

                if (user) {
                    user.accessToken = accessToken;
                    user.refreshToken = newRefreshToken;

                    localStorage.setItem(
                        "user",
                        JSON.stringify(user)
                    );
                }

                originalRequest.headers.Authorization =
                    `Bearer ${accessToken}`;

                return axiosClient(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }

);

export default axiosClient;