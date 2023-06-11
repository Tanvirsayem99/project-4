import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../API/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";


const PaymentHistory = () => {
    const {user, loader} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [axiosSecure] = useAxiosSecure();
    const {data: classes =[], refetch} = useQuery(['classes', user?.email], async ()=>{
        const res = await axiosSecure.get(`/history/${user?.email}`)
        if(res.data){
            setLoading(false)
            return res.data;
        }
    })
    if(loading){
        return <span className="loading loading-dots loading-lg  md:w-44"></span>
    }
    if(loader){
        return <span className="loading loading-dots loading-lg  md:w-44"></span>
    }
    if(classes.length == '0'){
        return <p className="text-center font-sans font-semibold text-4xl">Please payment first</p>
    }
    return (
        <div className="grid gap-5 mt-16">
            {
                classes.map(singleClass =>(<div key={singleClass._id} className="bg-slate-200 flex p-5 rounded-md  shadow-lg gap-10">
                    <p><b>Name: </b>{singleClass.name}</p>
                    <p><b>Price: </b>{singleClass.price}</p>
                    <p><b>date: </b>{new Date(singleClass.date).getDate()}/{new Date(singleClass.date).getMonth()+1}/{new Date(singleClass.date).getFullYear()}</p>
                    <p><b>Time: </b>{new Date(singleClass.date).getHours() >12 && new Date(singleClass.date).getHours()-12 }:{new Date(singleClass.date).getMinutes()}{new Date(singleClass.date).getHours() >=12 ? '  PM': 'AM'}</p>
                    
                </div>))
            }
        </div>
    );
};

export default PaymentHistory;