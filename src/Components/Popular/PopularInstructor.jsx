import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../API/useAxiosSecure";


const PopularInstructor = () => {
    const [axiosSecure] = useAxiosSecure()
    const [sayem, setSayem] = useState([])
    const {data: Allinstructors =[]} = useQuery(['users'], async ()=>{
        const res = await axiosSecure.get('/popularInstructor')
        setSayem(res.data)
          return res.data;
    });
    return (
        <div className="grid md:grid-cols-3 gap-5">
            {
                sayem?.map(singleInstructor =>(<div key={singleInstructor._id} className="relative grid gap-5 p-3 bg-transparent">
                    
                    <div className="border-8 w-48 left-24 border-white top-12 shadow-2xl  shadow-white rounded-full absolute">
                    <img src={singleInstructor.image} alt="" className="w-48 h-44 rounded-full" />
                    </div>
                    <div className="mt-40 text-center shadow-2xl shadow-white bg-black text-white  px-5 pb-10 pt-20 rounded-2xl">
                    <p><b> Name: </b>{singleInstructor.instructorName}</p>
                    <p><b>Email: </b>{singleInstructor.email}</p>
                    <p><b>Classes: </b>{singleInstructor.class}</p>
                    <p><b>students: </b>{singleInstructor.student ? singleInstructor.student : '0' }</p>
                    </div>
                    
                </div>))
            } 
        </div>
    );
};

export default PopularInstructor;