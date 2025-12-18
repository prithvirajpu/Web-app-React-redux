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
export default AxiosInstance
