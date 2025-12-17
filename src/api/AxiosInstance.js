import axios from 'axios';

const AxiosInstance =axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials:true,
})

AxiosInstance.interceptors.request.use(config=>{
    const token=localStorage.getItem('accessToken');
    if (token) config.headers.Autherization=`Bearer ${token}`;
    return config
})
export default AxiosInstance