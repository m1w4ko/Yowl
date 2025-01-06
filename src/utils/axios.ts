import axios from "axios";

const createAxiosInstance = () => {
    let instance = axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "Content-Type": "application/json"
        } 
    })

    instance.interceptors.request.use(
        async (config) => {
            const token = await localStorage.getItem("Token");
            console.log(token);
            
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
            return config
        },
        (error) => {
            console.error("Explai error here");
            return Promise.reject(error);
        }
    );

    return instance;
}   

const axiosInstance = createAxiosInstance();

export default axiosInstance;