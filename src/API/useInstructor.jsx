import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useInstructor = () => {
    const {user, loader} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const {data: insTructor, isLoading: isAdminLoading} = useQuery({
        queryKey:['Isinstructor', user?.email],
        enabled: !loader,
        queryFn: async () =>{
            const res = await axiosSecure.get(`/user/instructor/${user?.email}`);
            
            if(res.data.role === 'instructor'){
                return res.data.role;
            }
            else{
                return ''
            }
        }
        
    })

    return [insTructor, isAdminLoading];
};

export default useInstructor;