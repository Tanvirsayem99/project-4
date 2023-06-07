import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useAdminSecure = () => {
    const {user, loader} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const {data: Admin, isLoading: isAdminLoading} = useQuery({
        queryKey:['IsAdmin', user?.email],
        enabled: !loader,
        queryFn: async () =>{
            const res = await axiosSecure.get(`/user/admin/${user?.email}`);
            if(res.data.role === 'admin'){
                return res.data.role;
            }
            else{
                return ''
            }
            
        }
        
    })

    return [Admin, isAdminLoading];
};

export default useAdminSecure;