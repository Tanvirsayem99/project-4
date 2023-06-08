import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllUsersRole = () => {
    const [axiosSecure] = useAxiosSecure()
    const {data: users =[], refetch} = useQuery(['users'], async ()=>{
        const res = await axiosSecure.get('/allUsers')
        return res.data;
    })
    return [users, refetch]
};

export default useAllUsersRole;