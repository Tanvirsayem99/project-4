import { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "../../API/useAxiosSecure";


const AllInstructor = () => {
    const [classes, setClasses] = useState([])
    const [axiosSecure] = useAxiosSecure();
    useEffect(()=>{
        axiosSecure.get('/Allinstructors')
        .then(res =>{
            setClasses(res.data)
        })
    },[])
    return (
        <div className="grid gap-5">
            {
                classes?.map(singleClass =>(<div key={singleClass._id} className="flex gap-10 bg-red-200 items-center px-5 rounded-lg">
                    <img src={singleClass.image} alt="" className="w-16 p-1" />
                    <p><b>Name: </b>{singleClass.name}</p>
                    <p><b>Email: </b>{singleClass.email}</p>
                    <div>
            </div>
                </div>))
            }
        </div>
    );
};

export default AllInstructor;