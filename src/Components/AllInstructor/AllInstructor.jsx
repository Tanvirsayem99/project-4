import { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "../../API/useAxiosSecure";


const AllInstructor = () => {
    const [instructors, setInstructors] = useState([])
    const [loading, setLoading] = useState(false)
    const [axiosSecure] = useAxiosSecure();
    useEffect(()=>{
        setLoading(true)
        axiosSecure.get('/Allinstructors')
        .then(res =>{
            if(res.data){
                setLoading(false)
                setInstructors(res.data)
            }
        })
    },[])
    if(loading){
        return <div className="w-1/12 mx-auto pt-60"><span className="loading loading-dots loading-lg  md:w-44"></span></div>
    }
    if(instructors.length === '0'){
        return <p className="text-center font-sans font-semibold text-4xl">No classes available</p>
    }
    const theme = localStorage.getItem('theme');
    return (
        <div className="grid gap-5 pt-20 ">
            {
                instructors?.map(singleClass =>(<div key={singleClass._id} className={`md:flex gap-10 text-center md:text-left w-11/12 mx-auto h-32  shadow items-center md:h-20 px-5 rounded-lg ${theme ==='dark'? 'bg-slate-500 shadow-white' : ' bg-slate-50'}`}>
                    <img src={singleClass.image} alt="" className="w-16 h-16 md:mx-0 mx-auto rounded-full p-1" />
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