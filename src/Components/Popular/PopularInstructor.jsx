import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../API/useAxiosSecure";


const PopularInstructor = () => {
    const [axiosSecure] = useAxiosSecure()
    const {data: instructors =[]} = useQuery(['users'], async ()=>{
        const res = await axiosSecure.get('/popularInstructor')
          return res.data;
    });
    console.log(instructors)
    return (
        <div>
            sadfsd  
        </div>
    );
};

export default PopularInstructor;