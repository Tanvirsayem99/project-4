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
                sayem?.map(singleInstructor =>(<div key={singleInstructor._id} className="p-3">
                    
                    <img src={singleInstructor.image} alt="" className="w-full" />
                    <p><b>Instructor Name: </b>{singleInstructor.instructorName}</p>
                    <p><b>Instructor Email: </b>{singleInstructor.email}</p>
                </div>))
            } 
        </div>
    );
};

export default PopularInstructor;