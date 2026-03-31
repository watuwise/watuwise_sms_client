
import router from "@/router";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

// Create instance of axios
const instance = axios.create({
    // baseURL: 'https://sms.api.embracemedia.africa/api/',
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 60000,
});


// Create a request interceptor for my instance and get accessToken on the fly
instance.interceptors.request.use(async (config) => {
    config.headers['Authorization'] = "Bearer " + localStorage.getItem('accessToken');
    config.headers['Content-Type'] = "multipart/form-data";
    config.headers['Accept'] = "application/json";
    return config;  
}, (error) => {
        console.log("axios request error \n");
        console.log(error);
        return Promise.reject(error);
    }   
);


instance.interceptors.response.use( 
    config => config,
    (error) => {
        console.log(error);

        if (error.code === 'ERR_NETWORK') {

            toast.info("Connection Error. Please try again", {
                timeout: 3500,
            });

            router.push('/login')
        }
        else if (error.code === 'ECONNABORTED') {

            toast.info("Connection Timeout", {
                timeout: 3500,
            });
        }
        else if(error.response.status == 401) {
            console.log(`${error.response.data.message} Your session expired`);

            toast.info("Your session expired", {
                timeout: 3500,
            });
            router.push('/login')
        } 
        else if(error.response.status == 404) {

            toast.info("Bad Request - URL Not Found", {
                timeout: 3500,
            });
        } 

        return Promise.reject(error);
    },
);


export default instance;
