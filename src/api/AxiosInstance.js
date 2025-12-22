import axios from 'axios';

const AxiosInstance =axios.create({
    baseURL: 'http://localhost:8000/api/users/',
    withCredentials:true,
})

AxiosInstance.interceptors.request.use(config=>{
    const token=localStorage.getItem('access_token');
    if (token) config.headers.Authorization=`Bearer ${token}`;
    return config
})

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not retrying yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call your refresh token endpoint
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token");

        const response = await axios.post(
          "http://localhost:8000/api/users/token/refresh/",
          { refresh: refreshToken },
          { withCredentials: true }
        );

        const newAccessToken = response.data.access;
        localStorage.setItem("access_token", newAccessToken);

        // Update the failed request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, log out user
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/"; // redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default AxiosInstance
