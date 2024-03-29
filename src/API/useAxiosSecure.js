import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://assignment-12-server-tanvirsayem99.vercel.app',
})

const useAxiosSecure = () =>{
    const navigate = useNavigate()
const {logOut} = useContext(AuthContext)
    useEffect(()=>{
        axiosSecure.interceptors.request.use(config =>{
            const token = `Bearer ${localStorage.getItem('access-token')}`
            if(token){
                config.headers.Authorization = token;
            }
            return config
        })
        axiosSecure.interceptors.response.use(response =>response, async(error)=>{
            if((error.response && error.response.status === '401') || (error.response.status === '403')){
                await logOut()
                navigate('/login')
            }
            return Promise.reject(error)
        })
    },[logOut, navigate])

    return [axiosSecure]
}

export default useAxiosSecure;