import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";


const MyEnrolledClasses = () => {
    const {user} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const {data: items =[], refetch} = useQuery(['users', user?.email], async ()=>{
        const res = await axiosSecure.get(`/enrolledItem/${user?.email}`)
        return res.data;
    })
    console.log(items)
    return (
        <div className="grid gap-5">
            {
                items.map(item =>(<div key={item._id} className="flex gap-10 bg-red-200 items-center px-5 rounded-lg">
                    <img src={item.image} alt="" className="w-16 p-1" />
                    <p><b>Name: </b>{item.name}</p>
                    <p><b>Price: </b>{item.price}</p>
                   
                </div>))
                
            }
            
        </div>
    );
};

export default MyEnrolledClasses;