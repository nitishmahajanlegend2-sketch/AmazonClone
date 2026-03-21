import axios from 'axios';

// 1. Create an instance
const api = axios.create({
    baseURL: 'https://amazonclone-20qm.onrender.com',
    withCredentials:true
     // Crucial for sending the Refresh Token Cookie
});
console.log("Reached before interceptor")

// 2. Request Interceptor: Attach the current Access Token to every request
api.interceptors.request.use(
    (config) => { 
        console.log("this is config",config)
        const token = localStorage.getItem('accessToken');
        console.log(token)
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
            config.withCredentials = true;
            console.log("this is  config.headers.authorization", config.headers.authorization)
            
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. Response Interceptor: Catch the "Expired" error and refresh
api.interceptors.response.use(
    (response) => response, // If the request succeeds, just return the response
    async (error) => {
        const originalRequest = error.config;

        // Check if error is 403 (Expired) and we haven't tried refreshing yet
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark to avoid infinite loops

            try {
                // Call your refresh endpoint
                // Note: Use a standard axios call here, NOT the 'api' instance
                const res = await axios.post('https://amazonclone-20qm.onrender.com/admin/createrefreshtoken',{},{withCredentials:true});

                if (res.status === 200) {
                    const { accessToken } = res.data;
                    
                    // Update LocalStorage with the new token
                    localStorage.setItem('accessToken', accessToken);

                    // Update the header of the original request and retry it
                    originalRequest.headers.authorization = `Bearer ${accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // If refresh token is also expired, log the user out
                console.error("Refresh token expired. Logging out...");
                localStorage.removeItem('accessToken');
                window.location.href = '/adminlogin';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
