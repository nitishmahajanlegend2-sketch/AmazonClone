import axios from 'axios';

// 1. Create the User-specific instance
const userApi = axios.create({
    baseURL: 'http://localhost:8080/sshopping', // Points to your user shopping routes
    withCredentials: true,
});

// 2. Request Interceptor: Attach the user's access token
userApi.interceptors.request.use(
    (config) => {
        // Look for the unique user token name we defined
        console.log('came here in interceptor')
        const token = localStorage.getItem('accessTokenuser');
       
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. Response Interceptor: Handle user token expiration
userApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 403 (Forbidden/Expired) and we haven't retried yet
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Call the USER specific refresh endpoint
                // Note: This hits the /user prefix as defined in your server.js
                const res = await axios.post(
                    'http://localhost:8080/sshopping/getnewtoken', 
                    {}, 
                    { withCredentials: true }
                );

                if (res.status === 200) {
                    const { accessTokenuser } = res.data;

                    // Update localStorage with the fresh user token
                    localStorage.setItem('accessTokenuser', accessTokenuser);
                    console.log("Stored new token")

                    // Update the header and retry the original request
                    originalRequest.headers.authorization = `Bearer ${accessTokenuser}`;
                    return userApi(originalRequest);
                }
            } catch (refreshError) {
                // If the refresh token is also expired, send them to user login
                console.error("User session expired. Please log in again.");
                localStorage.removeItem('accessTokenuser');
                window.location.href = '/login'; 
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default userApi;