import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useContext } from "react";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";


const MyEnrolledClasses = () => {
    const [loading, setLoading] = useState(true)
    const {user, loader} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const {data: items =[], refetch} = useQuery(['users', user?.email], async ()=>{
        const res = await axiosSecure.get(`/enrolledItem/${user?.email}`)
        if(res.data){
            setLoading(false)
            return res.data;
        }
        
    })
    if(loader){
        return <span className="loading loading-dots loading-lg  md:w-44"></span>
    }
    if(loading){
        return <span className="loading loading-dots loading-lg  md:w-44"></span>
    }
    if(items.length == '0'){
        return <p className="text-center font-sans font-semibold text-4xl">Please Enroll First</p>
    }
    const theme = localStorage.getItem('theme')
    
    return (
        <div className="grid gap-5 mt-16">
            {
                items.map((item) =>(<div key={item._id} className={`flex gap-10 h-24 md:w-[700px] justify-center ${theme === 'dark' ? 'bg-black shadow text-white shadow-white' : 'bg-red-200'} items-center px-5 rounded-lg`}>
                    
                    <img src={item.image} alt="" className="w-16 p-1" />
                    <p><b>Name: </b>{item.name}</p>
                    <p><b>Price: </b>{item.price}</p>
                   
                </div>))
                
            }
            
        </div>
    );
};

export default MyEnrolledClasses;