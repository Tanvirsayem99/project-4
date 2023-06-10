import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useInstructor = () => {
    const {user, loader} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()

    const {data: insTructor, isLoading: isInstructorLoading} = useQuery({
        queryKey:['Instructor', user?.email],
        enabled: !loader,
        queryFn: async () =>{
            const res = await axiosSecure.get(`/user/instructor/${user?.email}`);
                return res.data.instructor;
            
            
        }
        
    })

    return [insTructor, isInstructorLoading];
};

export default useInstructor;