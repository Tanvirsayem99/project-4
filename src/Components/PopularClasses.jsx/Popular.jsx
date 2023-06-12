import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";

import useAxiosSecure from "../../API/useAxiosSecure";


const Popular = ({theme}) => {
    const[item, setItem] = useState('')
    const[axiosSecure] = useAxiosSecure()
    const {data: classes =[], refetch} = useQuery(['class',], async ()=>{
        const res = await axiosSecure.get('/popular')
        return res.data;
    })
    useEffect(()=>{
        const finalTHeme = localStorage.getItem('theme')
        setItem(finalTHeme)
      },[])
      
    return (
        <div className="grid md:grid-cols-3 gap-10 my-10  items-center justify-center">
            {
                classes.map(singleClass =>(<div key={singleClass._id} className={` bg-transparent `}>
                    <div className={`relative w-[320px]  h-[400px] flex-col-reverse flex  gap-3 ${theme == 'dark' && 'shadow-xl shadow-white'}`}>
                        <div className={`relative w-full h-[150px] text-center pt-5 rounded-2xl  rounded-tl-none ${theme == 'dark' ? 'shadow bg-white shadow-white text-black' : 'bg-black text-white'}`} >
                            <p><b>Name: </b>{singleClass.name}</p>
                            <p><b>Seats: </b>{singleClass.seats}</p>
                            <p><b>student: </b>{singleClass.student}</p>
                        </div>
                        <div className="relative w-full h-[240px] bg-red-500 rounded-3xl">
                        <img src={singleClass.image} alt="" className="w-full  h-[240px] rounded-2xl" />
                        </div>
                        <span className="absolute w-2/4 h-[76px] bg-black top-44 border-t-8 border-white border-r-8 rounded-tr-2xl text-black"><p className="bg-white mx-auto mt-4 py-2 rounded-lg w-28 text-center"><b>price: $</b>{singleClass.price}</p></span>
                    </div>
                </div>))
            }
        </div>
    );
};

export default Popular;